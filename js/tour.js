/* =====================================================================
 * tour.js — 新版網頁的設定檔（品牌、照片、首頁文案）
 *
 * data.js 放的是原網站的行程資料；這個檔案放的是「新版商品頁」才需要的東西。
 * 文字內容大多直接取自原網站畫面上的文字，只是從 HTML 搬到這裡集中管理。
 * 留空（''）的欄位，網頁會自動顯示「待放入」的框。
 * ===================================================================== */

/* ---------- 品牌（品牌組員定案後填入） ---------- */
const BRAND = {
  agencyName: '',          // 旅行社名稱，例如 'OO 旅行社'
  logo: '',                // logo 圖檔路徑，例如 'images/logo.png'
  slogan: '',              // 品牌標語（頁尾顯示）
  courseLabel: '《遊程設計》期末報告',
  groupLabel: '第＿組',      // 組別
};

/* ---------- 行程基本資料 ---------- */
const TOUR = {
  title: '2027 大阪潮玩畢旅五天四夜',
  breadcrumb: ['日本旅遊', '關西', '大學生畢業旅行'],
  tagline: '避開觀光人潮・日系街頭潮牌・五天不重複風格咖啡・高 CP 燒肉夜生活',
  lead: '住心齋橋、每天 11:00 出發，逛潮牌、喝咖啡、吃燒肉。',
  groupSize: 40,
  budgetCapJpy: 200000,     // 原網站的預算上限
  jpyPerTwd: 4.8,           // 原網站的匯率：1 台幣 = 4.8 日圓
  sellingPriceTwd: null,    // 確定售價後填數字，例如 26900；留 null 會顯示預算試算金額
  signup: {
    title: '喜歡這個行程？',
    text: '報告結束後，到我們這組簽名支持！',
  },
};

/* ---------- 頁面（網址 #/id；nav 是選單文字，title / lead 是每頁上方的標題與說明） ---------- */
const PAGES = [
  { id: 'home',      nav: '首頁' },
  { id: 'itinerary', nav: '每日行程',       title: '每日行程',       en: 'Itinerary', lead: '點開每一天，看當天去哪裡。' },
  { id: 'price',     nav: '出團日期與價格', title: '出團日期與價格', en: 'Departures & Price', lead: '2 月主力團，6 月底備案團。' },
  { id: 'stay',      nav: '住宿交通',       title: '住宿與交通',     en: 'Hotel & Transport', lead: '四晚都住心齋橋，不用換飯店。' },
  { id: 'spots',     nav: '店家一覽',       title: '行程店家一覽',   en: 'Shops & Cafés', lead: '五天會去的潮牌、咖啡廳、餐廳和酒吧。' },
  { id: 'notes',     nav: '參團說明',       title: '參團說明',       en: 'Travel Notes', lead: '出發前要知道的事。' },
];

/* ---------- 服務亮點橫幅 ---------- */
const SERVICE_STRIP = {
  title: '團體安排',
  subtitle: 'Group Service',
  items: [
    '45 人座大巴機場來回接送',
    '心齋橋連住 4 晚含早餐',
    '每天 11:00 從容出發',
    '五天五間不重複風格咖啡',
  ],
};

/* ---------- 照片 ----------
 * src 填照片路徑（例如 'images/hero.jpg'），留空就顯示提示框。
 * hint 是建議放什麼照片，file 是建議的檔名。 */
const PHOTOS = {
  hero: { src: '', hint: '主視覺：道頓堀或心齋橋街景（橫式大圖）', file: 'images/hero.jpg' },
  features: [
    { src: '', hint: '南堀江 Orange Street 街景', file: 'images/feature-1.jpg' },
    { src: '', hint: '風格咖啡廳（例如北濱河畔咖啡）', file: 'images/feature-2.jpg' },
    { src: '', hint: '燒肉或大阪燒', file: 'images/feature-3.jpg' },
    { src: '', hint: '中崎町老街或黑膠唱片行', file: 'images/feature-4.jpg' },
  ],
  days: [
    [ { src: '', hint: '梅田 Umekita／KITH OSAKA', file: 'images/day1-1.jpg' },
      { src: '', hint: '梅田高空夜景燒肉', file: 'images/day1-2.jpg' } ],
    [ { src: '', hint: '南堀江潮牌街', file: 'images/day2-1.jpg' },
      { src: '', hint: '美國村／心齋橋 PARCO', file: 'images/day2-2.jpg' } ],
    [ { src: '', hint: 'W Osaka 黑色建築外觀', file: 'images/day3-1.jpg' },
      { src: '', hint: '北濱土佐堀川河畔咖啡', file: 'images/day3-2.jpg' } ],
    [ { src: '', hint: 'TOWER RECORDS 黑膠館', file: 'images/day4-1.jpg' },
      { src: '', hint: '中崎町昭和長屋', file: 'images/day4-2.jpg' } ],
    [ { src: '', hint: '道頓堀／難波 Namba Parks', file: 'images/day5-1.jpg' },
      { src: '', hint: '手沖咖啡或關西機場', file: 'images/day5-2.jpg' } ],
  ],
  hotel: { src: '', hint: '飯店外觀或房間', file: 'images/hotel.jpg' },
};

/* ---------- 行程特色（內容整理自 data.js 的行程） ---------- */
const FEATURES = [
  { day: 'Day 2', title: '南堀江潮牌一條街', text: 'Supreme、BAPE、HOODS 一條街逛完。' },
  { day: 'Day 1–5', title: '五天五間風格咖啡', text: '每天一間，從潮牌甜品到職人手沖。' },
  { day: 'Day 1–4', title: '燒肉放題與大阪燒', text: '17 樓夜景燒肉、炭火燒肉吃到飽。' },
  { day: 'Day 4', title: '黑膠唱片與昭和老街', text: 'TOWER RECORDS 黑膠館＋中崎町古著。' },
];

/* ---------- 出團梯次（季節設定在 data.js 的 seasonConfig） ---------- */
const DEPARTURES = {
  winter: {
    kind: '首選主力團',
    status: '報名中',
    statusType: 'open',
    returnDate: '2027/02/19（五）',
    departDate: '2027/02/15（一）',
    note: '春節後平日離峰，機票房價最好談。',
  },
  summer: {
    kind: '梅雨備案團',
    status: '備案',
    statusType: 'backup',
    returnDate: '2027/07/02（五）',
    departDate: '2027/06/28（一）',
    note: '檔期需要調整時的備選梯次。',
  },
};

/* ---------- 氣候（原網站「氣象與穿搭」的文字；歷年平均，不是天氣預報） ---------- */
const CLIMATE = {
  winter: '白天均溫約 9°C、早晚低溫 1°C–3°C；2 月全月平均約 8 個雨日（日照約 8 小時），乾冷晴朗，適合拍照。',
  summer: '6 月約 20°C–28°C、7 月初升至 25°C–32°C；跨梅雨季末到暑假初，濕度約 75%、降雨機率約 45%。',
  source: '依大阪歷年 2 月與 6 月底至 7 月初的月平均氣候推估，不是天氣預報。',
};

/* ---------- 住宿與交通（原網站「統一住宿基地」「機場接駁」「計程車」區塊） ---------- */
const STAY = {
  hotel: {
    name: '相鐵 FRESA INN 大阪心齋橋',
    sub: '連住 4 晚含早餐',
    text: '位在心齋橋・長堀橋商圈，Crysta 長堀地下街南 5 出口步行 1 分鐘，下雨天也能走地下街移動。',
    alt: '備選：HOTEL THE FLAG 心齋橋／日航酒店',
    mapQuery: '相鐵 FRESA INN 大阪心齋橋',
  },
  transport: [
    { title: '機場接送', short: '45 人座專車直達飯店，約 65 分鐘。', text: '45 人座大型遊覽車專車，關西機場 ⇄ 心齋橋約 65 分鐘。單程報價 ¥80,000–130,000，40 人分攤來回每人約 ¥4,500–5,500。' },
    { title: '市區地鐵', short: '手機刷 ICOCA／Suica，單程 ¥190 起。', text: '大阪 Metro 單程 3km 內 ¥190、3–7km ¥240、7–13km ¥290，手機 Suica／ICOCA 或感應式信用卡可直接刷。' },
    { title: '計程車', short: '4 人一車，深夜回飯店最方便。', text: '起跳 1.2 公里內最高 ¥600，之後每 231 公尺加 ¥100；22:00–05:00 加收 20%；GO App 叫車另加約 ¥500。每車限乘 4 人。' },
  ],
  taxiLabels: {
    day_short: '白天卸重｜南堀江／美國村 → 心齋橋飯店（約 1.2km）',
    day_mid: '白天移動｜心齋橋 ⇄ 梅田／天滿（約 4.5km）',
    night_short: '深夜微醺｜道頓堀／美國村酒吧 → 心齋橋飯店（22:00 後）',
    night_umeda: '深夜續攤｜梅田 Craftroom → 心齋橋飯店（約 4.5km，22:00 後）',
    night_nakazaki: '深夜精釀｜中崎町浮田 → 心齋橋飯店（約 5.5km，22:00 後）',
  },
  taxiNote: '計程車費率依 2025 年 11 月調整後的大阪市區基準；40 人分 10 車、每車 4 人。',
};

/* ---------- 費用包含／不包含 ---------- */
const INCLUDES = {
  note: '以 40 人團體分攤計算，包含早中晚餐、5 間咖啡廳、酒吧夜生活、地鐵、計程車與機場包車。',
  excludes: ['個人購物', '行程表以外的個人消費'],
};

/* ---------- 店家分類名稱（原網站的分類） ---------- */
const SPOT_CATEGORIES = {
  streetwear: '街頭潮牌 & 選物',
  cafe: '五日風格咖啡廳',
  food: '燒肉 & 大阪燒',
  nightlife: '酒吧 & 深夜續攤',
  shopping: '藥妝 & 黑膠唱片',
};

/* ---------- 出發前準備（原網站「40 人出發前執行檢查清單」） ---------- */
const CHECKLIST = [
  { when: '出發前 4–6 個月', title: '鎖定團體機票與 15–20 間含早客房', text: '拍板冬日團（2027/2/15–2/19）或夏日備案團（2027/6/28–7/2），委託旅行社鎖定機位，以及相鐵 FRESA INN 大阪心齋橋或 HOTEL THE FLAG 心齋橋含早專案。' },
  { when: '出發前 1–2 個月', title: '預約四家團體餐廳與 45 人座大巴', text: '優先預約あぶりや 阪急梅田店、燒肉力丸 心齋橋店、千房 道頓堀大樓店、長堀橋黑毛和牛燒肉；同時把航班號、航廈、28 吋行李箱總數交給包車公司。' },
  { when: '出發前 1 週', title: '手機綁定交通卡與叫車 App', text: '40 位團員在手機錢包綁定 ICOCA／Suica（或帶感應式信用卡），並下載 GO 叫車 App 綁好信用卡，夜生活結束後 10 車分流回飯店。' },
];

const DATA_SOURCE = '依據日本食評平台口碑、大阪 Metro 與 2025 年 11 月計程車費率基準編製。';
