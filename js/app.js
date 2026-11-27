/* =====================================================================
 * app.js — 畫面渲染＋分頁切換
 *
 * 讀取 data.js（原網站資料）與 tour.js（新版設定），產生每一頁的內容。
 *
 * 分頁：同一個 index.html，網址後面的 #/itinerary、#/price… 決定顯示哪一頁
 *       （頁面清單在 tour.js 的 PAGES）。上一頁／下一頁、分享網址都可以用。
 *
 * 保留原網站的互動邏輯：
 *   - 冬日團／夏日團切換（原 switchSeason）→ 出團日期頁選梯次，
 *     或每日行程頁、參團說明頁上方的梯次切換；三處同步
 *   - 每日行程 Day 1–5（原 selectDay 分頁）→ 可展開的 Day 列
 *   - 預算方案切換 廉航／傳統航空（原 setBudgetPlan）
 *   - 店家目錄：分類、天數、關鍵字篩選（原 filterDirectory）
 *   - 計程車路段費用（原 updateTaxiCalc 下拉選單）→ 一次列出的表格
 * ===================================================================== */

(function () {
  'use strict';

  const state = {
    season: 'winter',
    plan: 'lcc',
    spotCat: 'all',
    spotDay: 'all',
    spotQuery: '',
    page: 'home',
  };

  /* ---------- 小工具 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const yen = (n) => '¥' + Math.round(n).toLocaleString('en-US');
  const twd = (n) => 'NT$' + Math.round(n).toLocaleString('en-US');
  const toTwd = (jpy) => jpy / TOUR.jpyPerTwd;
  const mapUrl = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const pageById = Object.fromEntries(PAGES.map((p) => [p.id, p]));
  const pageHref = (id, sub) => (id === 'home' ? '#/' : `#/${id}${sub ? '/' + sub : ''}`);
  const pad2 = (n) => String(n).padStart(2, '0');

  const ICON = {
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8h3l1.6-2.2A1.5 1.5 0 0 1 9.8 5h4.4a1.5 1.5 0 0 1 1.2.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  };

  /** 照片：有 src 顯示照片，沒有就顯示提示框 */
  function photo(slot, extraClass = '') {
    if (slot && slot.src) {
      return `<figure class="photo ${extraClass}"><img src="${esc(slot.src)}" alt="${esc(slot.hint)}" loading="lazy"></figure>`;
    }
    return `<figure class="photo photo--empty ${extraClass}" role="img" aria-label="照片位置：${esc(slot?.hint)}">
      <span class="photo__hint">${ICON.camera}<strong>${esc(slot?.hint || '照片')}</strong><code>${esc(slot?.file || '')}</code></span>
    </figure>`;
  }

  function startingPriceTwd() {
    if (TOUR.sellingPriceTwd) return { value: TOUR.sellingPriceTwd, isEstimate: false };
    return { value: toTwd(budgetDatasets.lcc.totalJpy), isEstimate: true };
  }

  /* ================= 共用區塊 ================= */

  function renderBrand() {
    $$('[data-brand-logo]').forEach((el) => {
      if (BRAND.logo) {
        el.classList.add('brand__logo--filled');
        el.innerHTML = `<img src="${esc(BRAND.logo)}" alt="${esc(BRAND.agencyName || 'logo')}">`;
      } else {
        el.textContent = 'LOGO';
      }
    });
    $$('[data-brand-name]').forEach((el) => {
      el.textContent = BRAND.agencyName || '旅行社名稱';
      el.classList.toggle('is-empty', !BRAND.agencyName);
    });
    $('#footer-slogan').textContent = BRAND.slogan || '品牌標語（待定）';
    $('#footer-course').textContent = `${BRAND.courseLabel}・${BRAND.groupLabel}`;
    $('#footer-source').textContent = DATA_SOURCE;
  }

  function renderNav() {
    const link = (p) => `<a href="${pageHref(p.id)}" data-nav="${p.id}">${esc(p.nav)}</a>`;
    // 頁首：首頁靠 logo，出團日期與價格是右邊的綠色按鈕
    $('#site-nav').innerHTML = PAGES.filter((p) => p.id !== 'home' && p.id !== 'price').map(link).join('');
    $('#mobile-menu').innerHTML = PAGES.map(link).join('');
    $('#footer-nav').innerHTML = `<h3>網站導覽</h3>` + PAGES.map(link).join('');
    $('#tour-bar-title').textContent = TOUR.title;
  }

  function renderPageHeads() {
    $$('[data-page-head]').forEach((el) => {
      const p = pageById[el.dataset.pageHead];
      el.innerHTML = `
        <div class="wrap">
          <p class="crumb"><a href="#/">首頁</a><span aria-hidden="true">/</span>${esc(TOUR.title)}</p>
          <p class="page-head__en">${esc(p.en || '')}</p>
          <h1 class="page-head__title">${esc(p.title)}</h1>
          <p class="page-head__lead">${esc(p.lead || '')}</p>
        </div>`;
    });
  }

  function renderSignups() {
    $$('[data-signup]').forEach((el) => {
      const onPrice = el.closest('[data-page="price"]');
      el.innerHTML = `
        <div class="wrap signup__inner">
          <div>
            <p class="signup__en">Vote for us</p>
            <h2 class="signup__title">${esc(TOUR.signup.title)}</h2>
            <p class="signup__text">${esc(TOUR.signup.text)}</p>
          </div>
          <span class="signup__group">${esc(BRAND.groupLabel)}</span>
          <a class="btn-solid" href="${onPrice ? '#/itinerary' : '#/price'}">${onPrice ? '看每日行程' : '出團日期與價格'}</a>
        </div>`;
    });
  }

  function renderSeasonSwitches() {
    $$('[data-season-switch]').forEach((el) => {
      el.innerHTML = `<span class="season-switch__label">選擇梯次</span>` + Object.keys(seasonConfig).map((key) => `
        <button type="button" data-season="${key}" aria-pressed="${state.season === key}">
          <b>${esc(seasonConfig[key].name)}</b><span>${esc(seasonConfig[key].fullDateLabel)}</span>
        </button>`).join('');
    });
    $$('[data-season-switch] [data-season]').forEach((b) => b.addEventListener('click', () => setSeason(b.dataset.season)));
  }

  function setSeason(season) {
    if (!seasonConfig[season] || season === state.season) return;
    state.season = season;
    $$('[data-season]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.season === season)));
    renderDepartures();
    renderSeasonLabels();
    renderItineraryDates();
    renderSeasonNotes();
  }

  function renderSeasonLabels() {
    const label = seasonConfig[state.season].fullDateLabel;
    $('#hero-dates').textContent = `${seasonConfig[state.season].name}｜${label}｜${TOUR.groupSize} 人團`;
    $('#tour-bar-date').textContent = `${seasonConfig[state.season].name}｜${label}`;
  }

  /* ================= 首頁 ================= */

  function renderHero() {
    const hero = $('#hero');
    if (PHOTOS.hero.src) {
      hero.classList.add('hero--photo');
      $('#hero-media').innerHTML = `<img src="${esc(PHOTOS.hero.src)}" alt="${esc(PHOTOS.hero.hint)}">`;
      $('#hero-photo-note').hidden = true;
    } else {
      $('#hero-photo-note').innerHTML = `${ICON.camera}<span>主視覺照片位置</span><code>${esc(PHOTOS.hero.file)}</code>`;
    }
    $('#hero-crumb').textContent = TOUR.breadcrumb.join(' / ');
    // 標題只在空白或「五天四夜」前換行，避免手機上斷在奇怪的地方
    $('#hero-title').innerHTML = esc(TOUR.title).replace(/(五天四夜|[0-9]+天[0-9]+夜)$/, '<wbr>$1');
    $('#hero-tagline').textContent = TOUR.tagline;
    $('#hero-actions').innerHTML = PAGES.filter((p) => p.id !== 'home')
      .map((p) => `<a class="btn-ghost" href="${pageHref(p.id)}">${esc(p.nav)}</a>`).join('');
  }

  function renderService() {
    $('#service').innerHTML = `
      <div class="wrap service__inner">
        <div class="service__title"><b>${esc(SERVICE_STRIP.title)}</b><span>${esc(SERVICE_STRIP.subtitle)}</span></div>
        <ul class="service__list">${SERVICE_STRIP.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>`;
  }

  function renderFeatures() {
    $('#features-lead').textContent = TOUR.lead;
    $('#features-grid').innerHTML = FEATURES.map((f, i) => `
      <article class="feature">
        ${photo(PHOTOS.features[i])}
        <p class="feature__day">${esc(f.day)}</p>
        <h3 class="feature__title">${esc(f.title)}</h3>
        <p>${esc(f.text)}</p>
      </article>`).join('');

    const counts = {};
    directoryItems.forEach((d) => { counts[d.category] = (counts[d.category] || 0) + 1; });
    $('#stats').innerHTML = Object.keys(SPOT_CATEGORIES).map((k) => `
      <a class="stat" href="#/spots"><b>${counts[k] || 0}</b><span>${esc(SPOT_CATEGORIES[k])}</span></a>`).join('');
  }

  function renderDayLinks() {
    $('#day-links').innerHTML = itineraryData.map((d, i) => `
      <a class="day-link" href="${pageHref('itinerary', d.day)}">
        <span class="day-no">Day ${pad2(d.day)}</span>
        <span class="day-link__title">${esc(d.area)}</span>
        <span class="day-link__date" data-day-date="${i}"></span>
        <span class="chev" aria-hidden="true">${ICON.chevron}</span>
      </a>`).join('');
  }

  /* ================= 每日行程 ================= */

  function renderStop(item) {
    return `
      <article class="stop">
        <p class="stop__time">${esc(item.time)}</p>
        <div class="stop__body">
          <p class="stop__cat">${esc(item.category)}</p>
          <h4 class="stop__title">${esc(item.title)}</h4>
          <p class="stop__desc">${esc(item.desc)}</p>
          <dl class="meta">
            ${item.hours ? `<dt>營業時間</dt><dd>${esc(item.hours)}</dd>` : ''}
            ${item.address ? `<dt>地址</dt><dd>${esc(item.address)}</dd>` : ''}
            ${item.cost ? `<dt>費用</dt><dd>${esc(item.cost)}</dd>` : ''}
          </dl>
          <div class="stop__links">
            ${item.mapQuery ? `<a class="map-link" href="${mapUrl(item.mapQuery)}" target="_blank" rel="noopener">${ICON.pin}Google 地圖</a>` : ''}
            ${item.backup ? `<details class="backup"><summary>備案</summary><p>${esc(item.backup)}</p></details>` : ''}
          </div>
        </div>
      </article>`;
  }

  function renderItinerary() {
    const lastIndex = itineraryData.length - 1;
    $('#days').innerHTML = itineraryData.map((d, i) => `
      <details class="day" id="day-${d.day}" ${i === 0 ? 'open' : ''}>
        <summary>
          <span class="day-no">Day ${pad2(d.day)}</span>
          <span class="day__title">${esc(d.area)}<small data-day-date="${i}"></small></span>
          <span class="chev" aria-hidden="true">${ICON.chevron}</span>
        </summary>
        <div class="day__body">
          <p class="day__summary">${esc(d.summary)}</p>

          <div class="glance">
            ${d.periods.map((p) => `
              <div class="glance__col">
                <h4 class="glance__label">${esc(p.period)}</h4>
                <ul>${p.items.map((it) => `<li>${esc(it.title)}</li>`).join('')}</ul>
              </div>`).join('')}
            <div class="glance__col glance__col--wide">
              <h4 class="glance__label">住宿</h4>
              <p>${i < lastIndex ? `${esc(STAY.hotel.name)}（${esc(STAY.hotel.sub)}）` : '搭機返回台灣'}</p>
            </div>
          </div>

          <div class="day__photos">${(PHOTOS.days[i] || []).map((p) => photo(p)).join('')}</div>

          <!-- 詳細時間表（營業時間、地址、費用、備案）預設收起來，先看重點 -->
          <details class="more">
            <summary><span class="more__open">查看詳細時間表</span><span class="more__close">收起詳細時間表</span></summary>
            <div class="timeline">
              ${d.periods.map((p) => `
                <section class="period">
                  <h4 class="period__name">${esc(p.period)}</h4>
                  ${p.items.map(renderStop).join('')}
                </section>`).join('')}
            </div>
            ${d.hotelDropoff ? `
              <aside class="rest">
                <b>回飯店休息｜${esc(d.hotelDropoff.time)}</b>
                <p>${esc(d.hotelDropoff.note)}</p>
              </aside>` : ''}
          </details>
        </div>
      </details>`).join('');

    $('#toggle-days').addEventListener('click', () => {
      const days = $$('.day');
      const openAll = days.some((d) => !d.open);
      days.forEach((d) => { d.open = openAll; });
      updateToggleLabel();
    });
    $$('.day').forEach((d) => d.addEventListener('toggle', updateToggleLabel));
    renderItineraryDates();
  }

  function updateToggleLabel() {
    const allOpen = $$('.day').every((d) => d.open);
    $('#toggle-days').textContent = allOpen ? '全部收合' : '全部展開';
  }

  function renderItineraryDates() {
    const dates = seasonConfig[state.season].dates;
    $$('[data-day-date]').forEach((el) => { el.textContent = dates[Number(el.dataset.dayDate)] || ''; });
  }

  /* ================= 出團日期與價格 ================= */

  function renderDepartures() {
    const price = startingPriceTwd();
    $('#departures').innerHTML = Object.keys(DEPARTURES).map((key) => {
      const d = DEPARTURES[key];
      const selected = state.season === key;
      return `
        <div class="departure ${selected ? 'is-selected' : ''}" role="listitem">
          <div class="departure__kind">
            <span class="tag tag--${esc(d.statusType)}">${esc(d.status)}</span>
            <b>${esc(d.kind)}</b>
            <small>${esc(seasonConfig[key].name)}</small>
          </div>
          <dl class="departure__facts">
            <div><dt>出發</dt><dd>${esc(d.departDate)}</dd></div>
            <div><dt>回程</dt><dd>${esc(d.returnDate)}</dd></div>
            <div><dt>天數</dt><dd>5 天 4 夜</dd></div>
            <div class="departure__price"><dt>每人團費</dt><dd><b>${twd(price.value)}</b> 起</dd></div>
          </dl>
          <button type="button" class="btn-outline btn-outline--sm" data-season="${key}" aria-pressed="${selected}">${selected ? '已選擇' : '選這個梯次'}</button>
          <p class="departure__note">${esc(d.note)}</p>
        </div>`;
    }).join('');
    $$('#departures [data-season]').forEach((b) => b.addEventListener('click', () => setSeason(b.dataset.season)));
    $('#departures-note').textContent = price.isEstimate ? '＊團費尚未定案，目前為廉航方案的預算試算。' : '';
  }

  function renderCost() {
    const ds = budgetDatasets[state.plan];
    const max = Math.max(...ds.values);
    $('#breakdown').innerHTML = ds.labels.map((label, i) => `
      <tr>
        <td>${esc(label)}<span class="bar" aria-hidden="true"><i style="width:${(ds.values[i] / max) * 100}%"></i></span></td>
        <td class="num">${yen(ds.values[i])}<small>約 ${twd(toTwd(ds.values[i]))}</small></td>
      </tr>`).join('');

    $('#total-twd').textContent = twd(toTwd(ds.totalJpy));
    $('#total-jpy').textContent = yen(ds.totalJpy);
    $('#total-buffer').textContent = '+' + yen(TOUR.budgetCapJpy - ds.totalJpy);
    $('#cap-label').textContent = `距預算上限 ${yen(TOUR.budgetCapJpy)}`;
    $('#rate-label').textContent = `匯率以 1 台幣 = ${TOUR.jpyPerTwd} 日圓計算`;
    $$('[data-plan]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.plan === state.plan)));
  }

  function renderIncludes() {
    $('#includes').innerHTML = `
      <div class="includes__col">
        <h3>費用包含</h3>
        <ul>${budgetDatasets.lcc.labels.map((l) => `<li>${esc(l.replace(/\s*\(.*\)$/, ''))}</li>`).join('')}</ul>
      </div>
      <div class="includes__col includes__col--no">
        <h3>費用不包含</h3>
        <ul>${INCLUDES.excludes.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>`;
    $$('[data-plan]').forEach((b) => b.addEventListener('click', () => { state.plan = b.dataset.plan; renderCost(); }));
  }

  /* ================= 住宿交通 ================= */

  function renderStay() {
    const h = STAY.hotel;
    $('#hotel').innerHTML = `
      ${photo(PHOTOS.hotel, 'photo--wide')}
      <div class="hotel__info">
        <p class="eyebrow">Hotel</p>
        <h3 class="hotel__name">${esc(h.name)}</h3>
        <span class="tag tag--open">${esc(h.sub)}</span>
        <p>${esc(h.text)}</p>
        <p class="muted">${esc(h.alt)}</p>
        <a class="map-link" href="${mapUrl(h.mapQuery)}" target="_blank" rel="noopener">${ICON.pin}Google 地圖</a>
      </div>`;

    $('#transport').innerHTML = STAY.transport.map((t) => `
      <article class="transport__item">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.short || t.text)}</p>
        ${t.short ? `<details class="backup"><summary>詳細說明</summary><p>${esc(t.text)}</p></details>` : ''}
      </article>`).join('');

    $('#taxi').innerHTML = `
      <details class="more more--left">
      <summary><span class="more__open">查看計程車參考車資</span><span class="more__close">收起計程車參考車資</span></summary>
      <div class="table-scroll">
      <table class="data-table">
        <caption>計程車參考車資（4 人一車）</caption>
        <thead><tr><th>路段</th><th class="num">一車總車資</th><th class="num">每人分攤</th></tr></thead>
        <tbody>
          ${Object.keys(taxiRoutes).map((k) => `
            <tr><td>${esc(STAY.taxiLabels[k] || k)}</td><td class="num">${esc(taxiRoutes[k].total)}</td><td class="num">${esc(taxiRoutes[k].perPerson)}</td></tr>`).join('')}
        </tbody>
      </table>
      </div>
      <p class="note">${esc(STAY.taxiNote)}</p>
      </details>`;
  }

  /* ================= 店家一覽 ================= */

  function renderSpotFilters() {
    const counts = { all: directoryItems.length };
    directoryItems.forEach((d) => { counts[d.category] = (counts[d.category] || 0) + 1; });
    const cats = [['all', '全部'], ...Object.entries(SPOT_CATEGORIES)];
    $('#spot-cats').innerHTML = cats.map(([k, label]) => `
      <button type="button" class="chip" data-cat="${k}" aria-pressed="${state.spotCat === k}">${esc(label)}<b>${counts[k] || 0}</b></button>`).join('');
    $$('#spot-cats .chip').forEach((b) => {
      b.addEventListener('click', () => {
        state.spotCat = b.dataset.cat;
        $$('#spot-cats .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        renderSpots();
      });
    });

    const days = [...new Set(directoryItems.map((d) => d.day))];
    $('#spot-day').innerHTML = `<option value="all">全部天數</option>` + days.map((d) => `<option value="${esc(d)}">${esc(d)}</option>`).join('');
    $('#spot-day').addEventListener('change', (e) => { state.spotDay = e.target.value; renderSpots(); });
    $('#spot-search').addEventListener('input', (e) => { state.spotQuery = e.target.value.trim().toLowerCase(); renderSpots(); });
  }

  function renderSpots() {
    const q = state.spotQuery;
    const list = directoryItems.filter((item) => {
      const matchCat = state.spotCat === 'all' || item.category === state.spotCat;
      const matchDay = state.spotDay === 'all' || item.day === state.spotDay;
      const matchQ = !q || [item.name, item.area, item.desc, item.day].some((s) => s.toLowerCase().includes(q));
      return matchCat && matchDay && matchQ;
    });
    $('#spot-count').textContent = `共 ${list.length} 家`;
    $('#spots').innerHTML = list.length ? list.map((item) => `
      <article class="spot">
        <p class="spot__top"><span>${esc(SPOT_CATEGORIES[item.category] || '')}</span><span class="day-no day-no--sm">${esc(item.day)}</span></p>
        <h3 class="spot__name">${esc(item.name)}</h3>
        <p>${esc(item.desc)}</p>
        <p class="spot__meta">${esc(item.area)}・${esc(item.hours)}</p>
        <a class="map-link" href="${mapUrl(item.map)}" target="_blank" rel="noopener">${ICON.pin}Google 地圖</a>
      </article>`).join('') : `<p class="empty">沒有符合條件的店家，換個關鍵字或分類試試。</p>`;
  }

  /* ================= 參團說明 ================= */

  function renderNotes() {
    const acc = (id, title, body, open) => `
      <details class="acc" ${open ? 'open' : ''}>
        <summary><span class="acc__title">${esc(title)}</span><span class="chev" aria-hidden="true">${ICON.chevron}</span></summary>
        <div class="acc__body" id="${id}">${body}</div>
      </details>`;

    const steps = `<ol class="steps">${CHECKLIST.map((s) => `
      <li><p class="steps__when">${esc(s.when)}</p><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></li>`).join('')}</ol>`;

    const about = `<ul class="dots">
        <li>${esc(INCLUDES.note)}</li>
        <li>費用為預算試算，實際以訂位報價為準；匯率以 1 台幣 = ${esc(TOUR.jpyPerTwd)} 日圓計算。</li>
        <li>${esc(CLIMATE.source)}</li>
        <li>${esc(DATA_SOURCE)}</li>
      </ul>`;

    $('#notes').innerHTML =
      acc('notes-climate', '氣候與穿搭', '', false) +
      acc('notes-tip', '行程小提醒', '', false) +
      acc('notes-steps', '出發前準備', steps, false) +
      acc('notes-about', '費用與資料說明', about, false);
    renderSeasonNotes();
  }

  function renderSeasonNotes() {
    const s = seasonConfig[state.season];
    const c = s.clothing;
    $('#notes-climate').innerHTML = `
      <p class="notes__season"><span class="tag tag--open">${esc(s.name)}・${esc(s.fullDateLabel)}</span><span class="tag">${esc(c.badge)}</span></p>
      <h4 class="notes__h">${esc(c.title)}</h4>
      <p>${esc(CLIMATE[state.season])}</p>
      <div class="layers">
        ${c.layers.map((l) => `
          <article class="layer">
            <p class="layer__step">${esc(l.step)}</p>
            <h5>${esc(l.title)}</h5>
            <p>${esc(l.desc)}</p>
          </article>`).join('')}
      </div>
      <p class="note">${esc(CLIMATE.source)}</p>`;
    $('#notes-tip').innerHTML = `<p>${esc(s.itineraryTip)}</p>`;
  }

  /* ================= 分頁切換 ================= */

  // 目前的頁面路徑。平常跟網址的 #/… 一樣；在不能改網址的環境（例如嵌在別的網頁裡）也照樣能換頁。
  let currentHash = location.hash;

  /** 換頁：網站內的 #/… 連結都走這裡 */
  function go(hash) {
    currentHash = hash;
    try {
      if (location.hash !== hash) history.pushState(null, '', hash);
    } catch (e) {
      /* 不能改網址時只換畫面 */
    }
    route();
  }

  function parseHash() {
    const m = currentHash.match(/^#\/([\w-]+)?(?:\/([\w-]+))?/);
    const id = m && m[1] && pageById[m[1]] ? m[1] : 'home';
    return { id, sub: m ? m[2] : undefined };
  }

  function route() {
    const { id, sub } = parseHash();
    state.page = id;
    $$('.page').forEach((p) => { p.hidden = p.dataset.page !== id; });
    $$('[data-nav]').forEach((a) => {
      if (a.dataset.nav === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    $('.header-cta').classList.toggle('is-current', id === 'price');
    document.title = id === 'home' ? TOUR.title : `${pageById[id].title}｜${TOUR.title}`;

    const cta = $('#tour-bar-cta');
    cta.textContent = id === 'price' ? '看每日行程' : '出團日期與價格';
    cta.setAttribute('href', id === 'price' ? '#/itinerary' : '#/price');

    setMenu(false);
    window.scrollTo(0, 0);

    if (id === 'itinerary' && sub) {
      const day = document.getElementById('day-' + sub);
      if (day) {
        day.open = true;
        requestAnimationFrame(() => day.scrollIntoView({ block: 'start' }));
      }
    }
    onScroll();
  }

  /* ---------- 捲動：頁首陰影、行程列、回到頂端 ---------- */
  function onScroll() {
    const header = $('#site-header');
    header.classList.toggle('is-scrolled', window.scrollY > 4);

    const page = $(`.page[data-page="${state.page}"]`);
    const trigger = page && (page.querySelector('.hero') || page.querySelector('.page-head'));
    const show = trigger ? trigger.getBoundingClientRect().bottom < header.offsetHeight + 8 : false;
    const bar = $('#tour-bar');
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', String(!show));
    $('#tour-bar-cta').tabIndex = show ? 0 : -1;

    $('#to-top').classList.toggle('is-visible', window.scrollY > 500);
  }

  function setMenu(open) {
    $('#menu-btn').setAttribute('aria-expanded', String(open));
    $('#mobile-menu').hidden = !open;
  }

  /* ================= 啟動 ================= */
  function init() {
    renderBrand();
    renderNav();
    renderPageHeads();
    renderSignups();
    renderSeasonSwitches();

    renderHero();
    renderService();
    renderFeatures();
    renderDayLinks();

    renderItinerary();
    renderDepartures();
    renderIncludes();
    renderCost();
    renderStay();
    renderSpotFilters();
    renderSpots();
    renderNotes();
    renderSeasonLabels();

    $('#to-top').innerHTML = ICON.up;
    $('#to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    $('#menu-btn').addEventListener('click', () => setMenu($('#mobile-menu').hidden));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    // 網站內連結（href="#/…"）由程式換頁，不靠瀏覽器預設的錨點跳轉
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#/"]');
      if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      go(a.getAttribute('href'));
    }, true);
    const syncFromUrl = () => { currentHash = location.hash; route(); };
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
