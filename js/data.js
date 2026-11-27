/* =====================================================================
 * data.js — 行程資料（原網站的底層資料，原封不動搬過來）
 *
 * 來源：原 Google 協作平台網頁內嵌程式碼的資料區段，內容未修改。
 * 新版前端會讀取這些資料來產生畫面；要改行程、預算、店家，改這個檔案就好。
 *
 * 備註：裡面有些欄位是舊版畫面專用的樣式設定（Tailwind class、icon 名稱、
 * 顏色色碼，例如 badgeClass / bannerGradient / tipClass / colors / icon），
 * 新版前端不會用到，保留只是為了跟原版一致，刪掉也不影響。
 * ===================================================================== */

// 1. 雙團設定資料 (冬日首選團 vs 夏日備案團)
const seasonConfig = {
    winter: {
        id: 'winter',
        name: '冬日首選團',
        dates: ['2/15 (週一)', '2/16 (週二)', '2/17 (週三)', '2/18 (週四)', '2/19 (週五)'],
        fullDateLabel: '2027/2/15 – 2/19',
        badgeHtml: '<i class="fa-solid fa-snowflake text-sky-600"></i> <span>冬日首選團 (2027/2/15–2/19)</span>',
        badgeClass: 'bg-sky-100 text-sky-900 border-sky-200',
        bannerGradient: 'from-sky-900 via-slate-900 to-indigo-950',
        bannerTitle: '2027 大阪冬日潮玩畢旅｜2/15 (週一) – 2/19 (週五)',
        bannerDesc: '避開台灣農曆春節連假與開學收假尖峰！白天均溫約 9°C 乾冷晴朗，最適合南堀江、中崎町街頭潮牌多層次街拍。',
        itineraryTip: '冬日團提醒：日落約 17:40，河畔與街拍建議把握 16:30 回飯店卸貨前完成；早晚低溫 1°C–3°C 請備好防風外套！',
        tipClass: 'bg-sky-50 border-sky-200 text-sky-900',
        clothing: {
            title: '冬日乾冷洋蔥式穿搭策略 (1°C – 9°C)',
            subtitle: '室內暖氣強 × 戶外乾冷晴朗 × 街拍層次感',
            badge: '2月乾燥少雨・日照約8小時',
            badgeColor: 'bg-sky-100 text-sky-800',
            layers: [
                {
                    step: '內層 (Inner)',
                    icon: 'fa-shirt',
                    color: 'text-sky-600 bg-sky-50',
                    title: '發熱衣 ＋ 重磅純棉長袖 T 恤 / 衛衣',
                    desc: '大阪百貨、地鐵與燒肉店內暖氣極強，內層建議穿脫方便且單穿有型的寬版衛衣或大學 T，進室內脫外套依然帥氣。'
                },
                {
                    step: '外層 (Outer)',
                    icon: 'fa-vest',
                    color: 'text-indigo-600 bg-indigo-50',
                    title: '防風機能衝鋒衣 (ARC\'TERYX) 或羽絨/羊毛大衣',
                    desc: '白天均溫約 9°C、深夜酒吧散場降至 1°C–3°C，外搭防風外套或羽絨夾克即可應對河畔微風與夜間步行。'
                },
                {
                    step: '配件與鞋款 (Gear)',
                    icon: 'fa-shoe-prints',
                    color: 'text-orange-600 bg-orange-50',
                    title: '好走復古球鞋 ＋ 毛帽 / 太陽眼鏡',
                    desc: '冬季晴天率高達七成以上，白天陽光刺眼適合戴墨鏡街拍；每日步行約 1.2–1.5 萬步，務必穿著支撐力佳的球鞋。'
                }
            ]
        }
    },
    summer: {
        id: 'summer',
        name: '夏日梅雨備案團',
        dates: ['6/28 (週一)', '6/29 (週二)', '6/30 (週三)', '7/1 (週四)', '7/2 (週五)'],
        fullDateLabel: '2027/6/28 – 7/2',
        badgeHtml: '<i class="fa-solid fa-sun text-teal-600"></i> <span>夏日梅雨備案團 (2027/6/28–7/2)</span>',
        badgeClass: 'bg-teal-100 text-teal-900 border-teal-200',
        bannerGradient: 'from-teal-900 via-slate-900 to-emerald-950',
        bannerTitle: '2027 大阪夏日潮玩畢旅｜6/28 (週一) – 7/2 (週五)',
        bannerDesc: '跨越梅雨季末至暑假初期（20°C–32°C），全團善用「Crysta 長堀地下街直結飯店」與心齋橋頂棚商店街，雨天照樣輕鬆掃貨！',
        itineraryTip: '夏日團提醒：遇雨機率約 45% 且體感悶熱，請隨身攜帶摺疊晴雨傘；若遇午後陣雨可優先利用地下街連通動線或搭乘 4 人共乘計程車！',
        tipClass: 'bg-teal-50 border-teal-200 text-teal-900',
        clothing: {
            title: '夏日梅雨季透氣洋蔥穿搭 (20°C – 32°C)',
            subtitle: '戶外濕熱多雨 (濕度75%) × 室內冷氣房溫差',
            badge: '6月底至7月初・降雨機率約45%',
            badgeColor: 'bg-teal-100 text-teal-800',
            layers: [
                {
                    step: '內層 (Inner)',
                    icon: 'fa-shirt',
                    color: 'text-teal-600 bg-teal-50',
                    title: '涼感排汗短袖 / 寬版印花潮 T (心齋橋限定款)',
                    desc: '6月底高溫達 28°C–32°C 且濕度高達 75%，內層務必選擇透氣排汗材質，流汗不黏膩且方便隨時進店試穿。'
                },
                {
                    step: '外層 (Outer)',
                    icon: 'fa-umbrella',
                    color: 'text-emerald-600 bg-emerald-50',
                    title: '超輕量防潑水風衣 / 透氣機能襯衫',
                    desc: '因應梅雨陣雨及咖啡廳、百貨公司較強的冷氣，隨身攜帶一件防潑水薄風衣或寬版短袖襯衫外罩，兼顧造型與防風。'
                },
                {
                    step: '配件與鞋款 (Gear)',
                    icon: 'fa-shoe-prints',
                    color: 'text-amber-600 bg-amber-50',
                    title: '耐濕防滑鞋款 ＋ 輕量晴雨折疊傘',
                    desc: '梅雨季遇雨機率近半，建議穿著防水噴霧處理過的球鞋或機能涼鞋，並善用飯店直結的 Crysta 長堀地下街移動。'
                }
            ]
        }
    }
};

// 2. 五天四夜完整行程資料庫 (嚴格依文件所有細節編製)
const itineraryData = [
    {
        day: 1,
        weekday: '週一',
        area: '關西機場・梅田梅北新地標・梅田夜景',
        summary: '11:10 抵達關西機場，45 人座大巴直奔心齋橋飯店寄放行李。下午朝聖梅田老字號大阪燒與最新地標 KITH OSAKA 旗艦店，晚上享用 17 樓高空國產牛燒肉吃到飽！',
        hotelDropoff: {
            time: '16:30 – 17:45 戰利品控管與回飯店整裝提醒',
            note: '首日剛抵大阪且尚未辦理入住（15:00 後可 Check-in），建議在 KITH OSAKA 採購完戰利品後，先回心齋橋飯店領取房卡、安置行李，再輕裝前往梅田高空燒肉晚餐！'
        },
        periods: [
            {
                period: '上午啟動',
                icon: 'fa-plane-arrival',
                color: 'sky',
                items: [
                    {
                        time: '11:10 – 13:00',
                        title: '關西機場入境・45 人座大型遊覽車直達飯店寄放行李',
                        category: '團體包車接駁',
                        desc: '搭配早去航班（約 11:10 抵關西機場），40 人在入境大廳統一清點人數後，搭乘預訂之 45 人座大型遊覽車直奔下榻飯店寄放行李，免去全團拖大行李擠電車轉乘混亂。',
                        hours: '預留航班落地後 60–90 分鐘通關領行李緩衝時間',
                        address: '關西國際機場 → 大阪府大阪市中央区東心斎橋 1-12-23（相鐵 FRESA INN 大阪心齋橋）',
                        cost: '包車單程 ¥80,000–130,000（40人均攤每人約 ¥2,200–2,800）',
                        mapQuery: '相鐵 FRESA INN 大阪心齋橋',
                        backup: '若實際開票改搭午班機抵達，取消下午梅田行程，抵飯店寄放行李後直接於 18:00 切入梅田燒肉晚餐，Kith Osaka 改併入 Day 4 上午動線。'
                    }
                ]
            },
            {
                period: '下午重點',
                icon: 'fa-sun',
                color: 'orange',
                items: [
                    {
                        time: '13:45 – 15:00',
                        title: '午餐：お好み焼 ゆかり（Yukari）曾根崎本店',
                        category: '70年老字號大阪燒',
                        desc: '創立於 1950 年的大阪燒代表名店，距東梅田站步行僅約 1 分鐘。多層樓空間與快速出餐節奏能順利容納大學生分桌聚餐；招牌「香濃起司大阪燒」焦香濃郁、拍照效果極佳。',
                        hours: '11:00 – 23:00（L.O. 22:00），不定期公休',
                        address: '大阪府大阪市北区曾根崎 2-14-13',
                        cost: '餐費每人約 ¥1,500–2,200 ｜ 地鐵心齋橋→梅田 ¥240',
                        mapQuery: 'お好み焼 ゆかり 曾根崎本店',
                        backup: 'ねぎ焼やまもと（蔥燒山本）梅田 EST 店（牛筋蔥燒，約 ¥1,500）；或至 Umekita Green Place 3F 米其林必比登拉麵「なにわ麺次郎 雅」及 2F 美食街分流。'
                    },
                    {
                        time: '15:10 – 17:45',
                        title: 'KITH OSAKA 旗艦店 & Kith Treats Osaka（潮流甜品系）',
                        category: '梅北新地標・風格咖啡茶飲 #1',
                        desc: '2025 年 3 月開幕的日本第二家 Kith 旗艦店，坐落於 JR 大阪站旁最新地標 Umekita Green Place。石灰華建築搭配玫瑰木天花板，並有日本文化限定系列。1 樓 108 號鋪 Kith Treats 必點致敬大阪混合果汁的獨家「Naniwa」香草玉米片特調冰淇淋！',
                        hours: '每日 11:00 – 21:00',
                        address: '大阪府大阪市北区大深町 5-1 Umekita Green Place 1F（101／108 鋪）',
                        cost: '冰品點心約 ¥1,000–1,400（從曾根崎步行 12 分鐘免費）',
                        mapQuery: 'KITH OSAKA Umekita Green Place',
                        backup: '若 Kith 需分批進店，團員可先逛對面 LUCUA 7F「URBAN RESEARCH」，或至 Grand Front Osaka 北館 1F 咖啡早午餐店、Umekita Green Place 2F R Baker 休息。'
                    }
                ]
            },
            {
                period: '晚上夜生活',
                icon: 'fa-moon',
                color: 'indigo',
                items: [
                    {
                        time: '18:00 – 20:00',
                        title: '晚餐：國產牛燒肉食べ放題 あぶりや 阪急梅田店',
                        category: '17樓高空夜景燒肉吃到飽・需提前訂位',
                        desc: '大阪極具口碑的國產牛燒肉吃到飽專門店，位於 17 樓高空樓層可俯瞰梅田夜景。嚴選國產牛肉搭配華麗拼盤，適合 40 人大群體分訂相鄰大桌（須提前 1–2 個月網路預約）。',
                        hours: '週一至週四 17:00–22:00（L.O. 21:00）；週五至週日營業至 23:00',
                        address: '大阪府大阪市北区芝田 阪急ターミナルビル 17F',
                        cost: '餐費每人約 ¥5,500–7,000（步行 9 分鐘可達）',
                        mapQuery: 'あぶりや 阪急梅田店',
                        backup: '燒肉 Eight 梅田店（100 分鐘百種菜色吃到飽，厚切牛舌與和牛羽釜飯）；或 KOHOKU 餐酒館（附暢飲派對套餐 ¥3,300 起，預算控首選）。'
                    },
                    {
                        time: '20:30 – 22:45',
                        title: '夜生活分流：Craftroom（當代調酒） ／ 鳥貴族 齋橋店（平價串燒）',
                        category: '雙軌分流夜生活',
                        desc: '【微醺組 4–8人】前往大阪頂尖調酒吧 Craftroom，必點招牌「Oriental Farm」（茉莉花茶＋芹菜苦精）。【熱鬧組】搭地鐵回心齋橋進駐平價均價制「鳥貴族 齋橋店」分桌歡唱宵夜！',
                        hours: 'Craftroom 16:00–00:00（週一有開）；鳥貴族 齋橋店營業至 02:00',
                        address: 'Craftroom：北区梅田 1-3-1 大阪駅前第1ビル B2F ／ 鳥貴族：中央区心斎橋筋 1-4-29 4F',
                        cost: '酒水約 ¥2,000–3,500 ｜ 深夜4人共乘計程車回飯店每人約 ¥625–825',
                        mapQuery: 'Craftroom 大阪駅前第1ビル',
                        backup: 'Bar K（大阪市北区曾根崎新地 1-3-3 好陽ビル B1F，老派職人調酒空間）。'
                    }
                ]
            }
        ]
    },
    {
        day: 2,
        weekday: '週二',
        area: '南堀江 Orange Street・美國村・心齋橋 PARCO',
        summary: '避開中崎町週二公休日，專攻不受公休影響的南堀江街頭潮牌一條街！一次收齊 Supreme、HOODS、BAPE、Human Made，17:30 準時回飯店卸貨再戰炭火燒肉！',
        hotelDropoff: {
            time: '17:30 – 18:45 每日固定「飯店卸重休息」黃金時段',
            note: '步行約 450 公尺（6 分鐘）從心齋橋 PARCO 返回飯店，卸下白天在南堀江與美國村掃貨的沉重戰利品並稍作休息，19:00 輕鬆步行前往燒肉店！'
        },
        periods: [
            {
                period: '上午啟動',
                icon: 'fa-shirt',
                color: 'sky',
                items: [
                    {
                        time: '11:00 – 13:00',
                        title: '南堀江潮牌巡禮：Supreme・HOODS・BAPE・Carhartt WIP・Urban Research',
                        category: '立花通 Orange Street 街拍聖地',
                        desc: '南堀江街道寬敞時髦、沒有心齋橋主道的人擠人，聚集美日核心街頭品牌旗艦店：Supreme Osaka、匯集 WTAPS 與 NEIGHBORHOOD 的 HOODS Osaka、BAPE STORE OSAKA、Carhartt WIP 與 URBAN RESEARCH 堀江店。',
                        hours: '多數 11:00–20:00（HOODS Osaka 12:00 開門）',
                        address: '大阪府大阪市西区南堀江 1-9-8 至 1-20-9 沿線（立花通 Orange Street）',
                        cost: '從東心齋橋飯店步行 13–15 分鐘（雨天4人共乘計程車每人 ¥150）',
                        mapQuery: 'Supreme Osaka 南堀江',
                        backup: '同區精選設計師與二手珍稀單品名店：PLUG 大阪堀江 或 RINKAN MINAMIHORIE。'
                    }
                ]
            },
            {
                period: '下午重點',
                icon: 'fa-sun',
                color: 'orange',
                items: [
                    {
                        time: '13:00 – 14:30',
                        title: '午餐：WEST WOOD BAKERS（美式玻璃屋早午餐）',
                        category: '雙組接力分流用餐',
                        desc: 'CRITTERS BURGER 姊妹店，落地玻璃窗搭配美式復古裝潢超好拍！主打現烤麵包、多汁厚漢堡與鬆餅（無固定公休）。因不開放訂位，建議前 20 人 12:45 入座、後 20 人逛完 12:00 開門的 HOODS 後 13:45 接力。',
                        hours: '每日 09:00 – 16:00（無公休）',
                        address: '大阪府大阪市西区南堀江 1-16-9',
                        cost: '餐費每人約 ¥1,500–2,200（步行 3 分鐘即達）',
                        mapQuery: 'WEST WOOD BAKERS 南堀江',
                        backup: '心齋橋 PARCO B2「心齋橋霓虹燈食堂街」（11:00–23:00，多家個性食店免排隊）；或「大阪燒 初瀨」（難波千日前，有獨立包廂適合團體）。'
                    },
                    {
                        time: '14:30 – 17:30',
                        title: 'Stüssy・HUMAN MADE・STARBUCKS RESERVE Cafe（百貨臻選系）',
                        category: '心齋橋 PARCO・風格咖啡茶飲 #2',
                        desc: '先至美國村造訪 Stüssy Osaka，隨後進入心齋橋 PARCO 朝聖 HUMAN MADE（可順逛 5–6F 動漫周邊與大丸百貨 9F 寶可夢中心 DX）。下午茶安排「百貨質感臻選咖啡系」STARBUCKS RESERVE Cafe（PARCO B1），座席寬敞不怕日曬雨淋！',
                        hours: 'Stüssy 11:00–19:00 ／ HUMAN MADE 10:00–20:00 ／ 星巴克臻選 08:00–22:30',
                        address: '大阪府大阪市中央区心斎橋筋 1-8-3（心齋橋 PARCO）',
                        cost: '下午茶每人約 ¥800–1,400（17:30 步行 6 分鐘回飯店卸貨）',
                        mapQuery: '心齋橋 PARCO',
                        backup: '北堀江 1-23-4 咖啡廳（西区北堀江 1-23-4 長野大樓 1F，平日 09:00–18:00）。'
                    }
                ]
            },
            {
                period: '晚上夜生活',
                icon: 'fa-moon',
                color: 'indigo',
                items: [
                    {
                        time: '19:00 – 21:00',
                        title: '晚餐：炭火燒肉食べ放題 力丸（心齋橋店）',
                        category: '高CP值炭火燒肉放題・需提前訂位',
                        desc: '鄰近固力果招牌的人氣平價燒肉放題，提供 90 分鐘與 120 分鐘三種價位方案，厚實牛肉與國產牛品質口碑極佳，支持線上預約，是 40 人大學畢旅肉食聚餐首選！',
                        hours: '16:00 – 00:00（L.O. 23:30）',
                        address: '大阪府大阪市中央区心斎橋筋 2-1-32 IS ビル 4F',
                        cost: '餐費每人約 ¥4,000–6,000（依方案及暢飲而異）',
                        mapQuery: '炭火燒肉 力丸 心齋橋店',
                        backup: '大眾燒肉 BIRICHAN 難波心齋橋店（日式燈籠祭典氛圍吃國產和牛）；或大阪燒肉雙子 Futago 心齋橋店（均價約 ¥5,000）。'
                    },
                    {
                        time: '21:15 – 23:30',
                        title: '夜生活分流：Akashic Records 書庫調酒吧 ／ 鳥貴族 頓堀店',
                        category: '晚餐正樓下零距離轉場',
                        desc: '【微醺組】直接從燒肉店下樓（0 分鐘）進駐以圖書館書庫為概念的「Osaka Cocktail Library Akashic Records」拍絕美酒牆！\n【歡樂組】步行 4 分鐘至營業至清晨 5 點的「鳥貴族 頓堀店」大口吃串燒喝 Highball。',
                        hours: 'Akashic Records 依官網預約時段；鳥貴族 頓堀店 17:00–05:00',
                        address: 'Akashic Records：心斎橋筋 2-1-32 IS ビル 3F ／ 鳥貴族：道頓堀 1-6-15 3F',
                        cost: '酒水約 ¥2,000–3,500 ｜ 散步回飯店 7 分鐘（或共乘計程車每人 ¥180）',
                        mapQuery: 'Osaka Cocktail Library Akashic Records',
                        backup: '鳥貴族 頓堀中座店（道頓堀 1-7-21 中座食倒大樓 2F，同樣營業至清晨 05:00）。'
                    }
                ]
            }
        ]
    },
    {
        day: 3,
        weekday: '週三',
        area: '南船場設計建築・天滿庶民美食・北濱河畔・藥妝掃貨',
        summary: '上午打卡安藤忠雄監修純黑建築 W Osaka 與始祖鳥旗艦店，中午深入天滿在地大阪燒雙店分流，下午在土佐堀川河畔喝工業風咖啡，傍晚回心齋橋掃貨 UNIQLO 與大國藥妝！',
        hotelDropoff: {
            time: '18:15 – 19:00 藥妝與 UNIQLO 戰利品卸貨時段',
            note: '在 6 層樓高心齋橋 UNIQLO 與大國藥妝 NEW 心齋橋店大採購後，18:15 步行僅 300–500 公尺（5 分鐘）即可將沉重藥妝與服飾放回飯店房間，再輕鬆赴道頓堀晚餐！'
        },
        periods: [
            {
                period: '上午啟動',
                icon: 'fa-building',
                color: 'sky',
                items: [
                    {
                        time: '11:00 – 13:00',
                        title: '南船場質感名店：ARC\'TERYX 始祖鳥・ISSEY MIYAKE・W Osaka 建築打卡',
                        category: '安藤忠雄監修純黑地標街拍',
                        desc: '南船場是大阪設計師與機能品牌聚集的質感街區。必逛 ARC\'TERYX 始祖鳥大阪心齋橋店與囊括 HOMME PLISSÉ 皺褶男裝的 ISSEY MIYAKE SEMBA；途經安藤忠雄監修的純黑時尚酒店 W Osaka，整棟建築外觀是全團穿搭合照絕佳背景！',
                        hours: 'ARC\'TERYX & ISSEY MIYAKE 11:00–20:00 ／ W Osaka 外觀全天可拍',
                        address: '大阪府大阪市中央区南船場 3-5-15（ARC\'TERYX）至 南船場 4-11-28',
                        cost: '從飯店向北步行 8 分鐘（免費）',
                        mapQuery: 'W Osaka 南船場',
                        backup: '大丸心齋橋店南館 6F「mont-bell」（心斎橋筋 1-7-1，11:00–20:00，選購高 CP 值日系戶外機能服飾）。'
                    }
                ]
            },
            {
                period: '下午重點',
                icon: 'fa-sun',
                color: 'orange',
                items: [
                    {
                        time: '13:15 – 14:35',
                        title: '午餐：大阪燒 千草（天滿在地名店） ／ 鶴家（隔壁雙店分流）',
                        category: '深入天神橋筋庶民美食激戰區',
                        desc: '避開觀光團深入天滿！招牌「獨創千草燒」鬆厚多汁深受在地人喜愛；同門牌隔壁即為另一家老字號「大阪燒 鶴家」（週三兩家均有營業），40 人可輕鬆拆成兩店分流用餐免苦等！',
                        hours: '千草 11:00–21:30（週二休）；鶴家 11:30–20:00（週四休）',
                        address: '大阪府大阪市北区天神橋 4-11-18',
                        cost: '餐費每人約 ¥1,200–1,800 ｜ 堺筋線長堀橋→扇町站 ¥240',
                        mapQuery: 'お好み焼 千草 天神橋',
                        backup: '若 6 月降雨不想多移動，可直接於北濱河畔早午餐咖啡廳用餐後接續下午茶。'
                    },
                    {
                        time: '14:45 – 16:00',
                        title: '下午茶：Brooklyn Roasting Company Kitahama（河畔工業風系）',
                        category: '土佐堀川河畔露台・風格咖啡茶飲 #3',
                        desc: '磚牆與木質工業空間正對土佐堀川與中之島綠意，室內採光通透、戶外木棧露台更是絕美拍照機位，咖啡與烘焙口碑極佳（刻意避開週三公休的 Takamura，週三排北濱最順暢）。',
                        hours: '週一至週五 08:00–20:00、週末 08:00–19:00',
                        address: '大阪府大阪市中央区北浜 1-1-9',
                        cost: '下午茶每人約 ¥800–1,500 ｜ 堺筋線扇町→北濱站 ¥190',
                        mapQuery: 'Brooklyn Roasting Company Kitahama',
                        backup: '北濱 1-1-28 河畔咖啡早午餐店（ビルマビル 1F，08:00–18:00，設 2 樓外帶區可快速取餐）。'
                    },
                    {
                        time: '16:15 – 18:45',
                        title: '心齋橋集中掃貨：UNIQLO 6層旗艦店・GU・大國藥妝 NEW 心齋橋店',
                        category: '心齋橋限定印花T × 藥妝一次買齊',
                        desc: '逛 6 層樓約 720 坪的 UNIQLO SHINSAIBASHI（販售大阪藝術家聯名「心齋橋店限定印花 T 恤」）、UNIQLO/GU 一體化門市與 SENCE OF PLACE，再到公認價格極具競爭力的大國藥妝買齊常備藥與美妝，18:15 回飯店卸貨！',
                        hours: 'UNIQLO/GU 11:00–21:00 ／ 大國藥妝週一至週六 08:00–23:00',
                        address: 'UNIQLO：心斎橋筋 1-2-14 ／ 大國藥妝：南船場 3-5-17',
                        cost: '北濱→長堀橋站 ¥190（購物依個人預算，18:15 步行 5 分鐘回飯店）',
                        mapQuery: 'UNIQLO SHINSAIBASHI',
                        backup: 'Sundrug 心齋橋店（營業至 23:00）或 24 小時營業的唐吉訶德道頓堀御堂筋店。'
                    }
                ]
            },
            {
                period: '晚上夜生活',
                icon: 'fa-moon',
                color: 'indigo',
                items: [
                    {
                        time: '19:00 – 21:00',
                        title: '晚餐：千房 大阪燒（道頓堀大樓整棟店）',
                        category: '1至4樓及6樓超大座席・需提前訂位',
                        desc: '擁有整棟超大座席容量的大阪燒老牌名店，桌邊師傅豪邁淋上美乃滋拉花的視覺秀超好拍照，且較街邊小店更適合 40 人團體分桌入座（建議提前預訂）。',
                        hours: '週一至週六 11:00–01:00（L.O. 00:00）',
                        address: '大阪府大阪市中央区道頓堀 1-5-5 1～4、6F',
                        cost: '餐費每人約 ¥1,600–2,500（從飯店步行 9 分鐘）',
                        mapQuery: '千房 道頓堀ビル店',
                        backup: '國產牛燒肉 あぶりや 道頓堀御堂筋店（西心斎橋 2-5-9 10F，17:00–23:00）。'
                    },
                    {
                        time: '21:15 – 23:30',
                        title: '夜生活分流：Bar Nayuta（無酒單DJ酒吧） ／ PARCO 霓虹燈食堂街',
                        category: '神祕符號入口隱藏版 vs 賽博龐克宵夜街',
                        desc: '【微醺組 4–8人分批】美國村三角公園旁神祕符號入口的 Bar Nayuta，主打「無酒單」客製調酒與現場 DJ 放歌（營業至凌晨 3 點）。\n【打卡宵夜組】就近至賽博龐克風格十足的 PARCO B2「心齋橋霓虹燈食堂街」喝酒吃宵夜！',
                        hours: 'Bar Nayuta 15:00–03:00 ／ 霓虹燈食堂街 11:00–23:00',
                        address: 'Bar Nayuta：西心斎橋 1-6-17 マリオビル 5F ／ 霓虹食堂街：心齋橋 PARCO B2',
                        cost: 'Bar Nayuta 每杯約 ¥1,800–2,200 ／ 食堂街每人約 ¥2,000–3,000',
                        mapQuery: 'Bar Nayuta 大阪',
                        backup: '23:00 後想續攤可至鳥貴族 頓堀中座店（道頓堀 1-7-21 2F，營業至 05:00）。'
                    }
                ]
            }
        ]
    },
    {
        day: 4,
        weekday: '週四',
        area: '梅田茶屋町黑膠聖地・中崎町昭和古著・長堀橋和牛夜',
        summary: '週四中崎町全區正常營業！上午朝聖關西指標 426 坪 Tower Records 黑膠館，中午雙店分流享用 1,000 日圓高 CP 值漢堡與地中海自助吧，下午漫步昭和木造長屋與機場主題布丁咖啡！',
        hotelDropoff: {
            time: '17:30 – 18:45 戰利品卸貨與最終夜前整裝',
            note: '從中崎町搭地鐵或 4 人共乘計程車（均攤每人約 ¥625）返回心齋橋飯店，卸下黑膠唱片與中崎町古著雜貨戰利品，19:00 步行 4 分鐘赴最後一晚黑毛和牛慶功宴！'
        },
        periods: [
            {
                period: '上午啟動',
                icon: 'fa-record-vinyl',
                color: 'sky',
                items: [
                    {
                        time: '11:00 – 13:10',
                        title: 'TOWER RECORDS 梅田 NU 茶屋町店 & TOWER VINYL 梅田店',
                        category: '426坪關西實體唱片與黑膠聖地',
                        desc: '庫存量約 20 萬張的關西指標唱片聖地！6 樓為 J-Pop、獨立音樂與動漫聯名主館，4 樓則是黑膠迷必訪的 TOWER VINYL 梅田店。經典黃紅「NO MUSIC, NO LIFE.」看板與整排試聽機必拍團體合照！',
                        hours: '11:00 – 22:00（部分導覽列至 21:00，上午前往最穩妥）',
                        address: '大阪府大阪市北区茶屋町 10-12 NU chayamachi 6F／4F',
                        cost: '御堂筋線心齋橋→梅田站 ¥240（或4人共乘計程車每人 ¥550）',
                        mapQuery: 'TOWER RECORDS 梅田NU茶屋町店',
                        backup: '步行數分鐘可順逛同在茶屋町商圈、號稱關西最大級的跑鞋專賣店 STEP SPORTS 大阪店。'
                    }
                ]
            },
            {
                period: '下午重點',
                icon: 'fa-sun',
                color: 'orange',
                items: [
                    {
                        time: '13:15 – 14:30',
                        title: '午餐雙店分流：RICH GARDEN 漢堡 ／ J\'adore Chayamachi 地中海義式',
                        category: '各約20人分流・午餐均價僅約 ¥1,000',
                        desc: '【A組 20人】RICH GARDEN 梅田中崎町店：主打 100% 純牛肉粗絞漢堡與厚培根起司漢堡，午餐均價約 ¥1,000。\n【B組 20人】J\'adore Chayamachi：地中海風義式餐廳，午餐附 8–10 種麵包與沙拉飲料自助吧，同樣約 ¥1,000！',
                        hours: 'RICH GARDEN 11:00–23:00 ／ J\'adore 午餐 11:00–15:00',
                        address: 'RICH GARDEN：北区中崎西 2-3-14 ／ J\'adore：北区鶴野町 4-11 1F',
                        cost: '餐費每人約 ¥1,000–1,500（從 NU chayamachi 步行僅 6 分鐘）',
                        mapQuery: 'RICH GARDEN 梅田中崎町店',
                        backup: 'Olivier Le Francois（中崎西 1-8-24 1F，正統法式小酒館，12:00 起供應 ¥1,400 未稅套餐，亦可接包場）。'
                    },
                    {
                        time: '14:30 – 17:30',
                        title: '中崎町昭和長屋漫步 & OSA COFFEE（昭和甜點喫茶系）',
                        category: '機場登機主題焦糖布丁・風格咖啡茶飲 #4',
                        desc: '週四中崎町全區正常營業！先探訪 Elemeka Laboratory 復古遊戲機台店與昭和木造長屋雜貨。下午茶前往以機場登機為設計元素的「OSA COFFEE」，招牌超巨大冰淇淋焦糖布丁必拍！（注意 OSA COFFEE 平日 15:00–18:00 休息，請 14:30 優先前往或分流至全時段開放備選店）',
                        hours: 'Elemeka 12:00–17:00 ／ OSA COFFEE 平日 11:00–15:00、18:00–20:00',
                        address: 'OSA COFFEE：北区中崎西 4-1-7 ／ Elemeka：中崎西 4-3-38',
                        cost: '下午茶每人約 ¥1,000–1,500（17:30 返飯店卸貨）',
                        mapQuery: 'OSA COFFEE 中崎西',
                        backup: '下午茶分流必收：中崎西 3-2-18 達克瓦茲與蛋糕捲咖啡廳（11:00–19:00 全時段有開）、PATHFINDER XNOBU 或 HAIKU&PAUHANA（11:00–18:00）。'
                    }
                ]
            },
            {
                period: '晚上夜生活',
                icon: 'fa-moon',
                color: 'indigo',
                items: [
                    {
                        time: '19:00 – 21:00',
                        title: '晚餐：長堀橋站旁國產黑毛和牛炭火燒肉（可包場專案）',
                        category: '飯店步行4分鐘・40人畢旅慶功晚宴',
                        desc: '最後一晚豐盛晚餐鎖定飯店步行圈！透過預訂平台安排長堀橋站旁主打國產黑毛和牛炭火燒肉且「可包場」的專門店（營業至清晨 7 點，適合 40 人包區慶祝畢旅，須提前預訂）。',
                        hours: '可配合夜間包場至清晨（須出發前預訂確認座席）',
                        address: '大阪府大阪市中央区東心斎橋商圈（大阪 Metro 長堀橋站旁）',
                        cost: '餐費每人約 ¥4,500–6,000（從飯店步行僅 4–6 分鐘）',
                        mapQuery: '長堀橋駅 焼肉 黒毛和牛',
                        backup: '大眾燒肉 BIRICHAN 難波心齋橋店；或「298 燒肉 心齋橋店」（超平價燒肉吃到飽含稅 ¥1,100 起，預算省到底首選）。'
                    },
                    {
                        time: '21:15 – 23:30',
                        title: '夜生活分流：Sake Republic（清酒品飲） ／ Brewpub Center Point（自釀精釀）',
                        category: '最終夜清酒文化體驗 vs 中崎町精釀啤酒',
                        desc: '【清酒組】Sake Republic 距心齋橋站步行僅 1 分鐘，體驗多樣日本清酒與拍照，散場步行即可回飯店。\n【精釀組】搭車前往北區浮田「Brewpub Center Point」，自附小型釀酒廠隨時供應 4 種自釀啤酒配慢烤牛胸肉！',
                        hours: 'Sake Republic 依官網時段 ／ Brewpub Center Point 15:00–23:00',
                        address: 'Sake Republic：西心斎橋 1-13-1 5F ／ Brewpub：北区浮田 2-5-8',
                        cost: '酒水約 ¥2,000–3,000（精釀組深夜4人計程車回心齋橋每人約 ¥750–875）',
                        mapQuery: 'Sake Republic 心齋橋',
                        backup: '空龜餐廳（北区鶴野町 4 1F，營業至 25:00，自家煙燻培根佐葡萄酒與燒酒，均價 ¥1,001–1,500）。'
                    }
                ]
            }
        ]
    },
    {
        day: 5,
        weekday: '週五',
        area: '難波 Parks 選物・道頓堀百年烏龍麵・職人手沖・包車赴機場',
        summary: '11:00 前完成退房並將大件行李集中寄放飯店大廳。搭車一站南下逛 Namba Parks 與 BEAMS，午餐享用道頓堀百年町家高湯烏龍麵，最後以職人手沖咖啡與咖啡師名片畫下完美句點！',
        hotelDropoff: {
            time: '15:30 – 15:45 飯店大廳領取寄放行李・確認 45 人座大巴上車點',
            note: '飲用完 LiLo Coffee 職人手沖咖啡後，步行僅 5 分鐘返回飯店大廳領取早上寄放的行李箱，領隊清點 40 人全員後於 15:45 準時搭乘 45 人座大型遊覽車直奔關西機場！'
        },
        periods: [
            {
                period: '上午啟動',
                icon: 'fa-suitcase-rolling',
                color: 'sky',
                items: [
                    {
                        time: '11:00 – 13:00',
                        title: '退房寄放行李 → BEAMS Namba・Bshop・TOWER RECORDS なんばパークス店',
                        category: 'Namba Parks 綠意階梯建築最後衝刺',
                        desc: '11:00 前退房並集中寄放行李於飯店大廳。搭車一站南下逛集結 BEAMS PLUS、Ray BEAMS 等多支線的 BEAMS Namba，再走進綠意階梯建築超好拍的 Namba Parks 逛日法極簡選物 Bshop 與 TOWER RECORDS！',
                        hours: 'BEAMS / Bshop / TOWER RECORDS 均為 11:00 – 21:00',
                        address: 'BEAMS：中央区難波 5-1-60 なんばCITY B1F ／ Bshop：浪速区難波中 2-10-70 3F',
                        cost: '御堂筋線心齋橋→難波站 ¥190（或沿御堂筋步行 15 分鐘免費）',
                        mapQuery: 'Namba Parks 難波',
                        backup: '同在なんば CITY 內亦可順逛 URBAN RESEARCH NAMBA CITY 店（難波 5-1-60）。'
                    }
                ]
            },
            {
                period: '下午重點',
                icon: 'fa-sun',
                color: 'orange',
                items: [
                    {
                        time: '13:00 – 14:15',
                        title: '午餐：道頓堀 今井 本店（百年木造町家高湯烏龍麵）',
                        category: '1946年創立・招牌狐狸烏龍麵僅 ¥930',
                        desc: '創立於 1946 年、深受大阪在地人推薦的老舖烏龍麵店，保留木造町家外觀極具文化韻味。招牌「狐狸烏龍麵（きつねうどん）」使用北海道昆布與柴魚熬煮微甜清湯，官方含稅定價僅 ¥930，清爽暖胃 CP 值極高！',
                        hours: '依門市現場公告為準（週五午餐時段營業）',
                        address: '大阪府大阪市中央区道頓堀 1-7-22',
                        cost: '餐費每人約 ¥930–1,600（從 Namba Parks 步行經戎橋筋 9 分鐘）',
                        mapQuery: '道頓堀 今井 本店',
                        backup: '若 40 人想更快速分流用餐，可轉往一蘭拉麵 道頓堀本館（24 小時營業）或心齋橋 PARCO B2 霓虹燈食堂街。'
                    },
                    {
                        time: '14:15 – 15:30',
                        title: '下午茶：LiLo Coffee Roasters ／ LiLo Coffee KISSA（精品手沖系）',
                        category: '專屬咖啡師名片儀式感・風格咖啡茶飲 #5',
                        desc: '選擇 2014 年開業至今的大阪精品自烘名店！點單時咖啡師會附上專屬「咖啡師名片」，儀式感滿分。本店（Roasters）適合外帶街拍，想入座慢慢喝的同學可步行 3 分鐘到姊妹店 LiLo Coffee KISSA 內用！',
                        hours: 'Roasters 11:00–23:00 ／ KISSA 週一至週五 13:00–22:00',
                        address: 'Roasters：西心斎橋 1-10-28 1F ／ KISSA：心斎橋筋 2-7-25 2F',
                        cost: '咖啡每人約 ¥650–1,200（15:30 步行 5 分鐘回飯店領行李）',
                        mapQuery: 'LiLo Coffee Roasters 大阪',
                        backup: '丸福珈琲店 千日前本店（體驗昭和老字號深焙喫茶）或 Brooklyn Roasting Company 難波 EKIKAN 店。'
                    },
                    {
                        time: '15:45 – 17:15',
                        title: '45 人座大型遊覽車前往關西國際機場 (KIX)',
                        category: '戰利品滿載輕鬆直達航廈',
                        desc: '全團 40 人於心齋橋飯店（或大馬路指定接駁點）確認行李箱全數上車後直奔機場，不必推著暴增的戰利品行李箱在難波站上下電梯。',
                        hours: '預留至少航班起飛前 2 小時抵達機場（車程約 70 分鐘）',
                        address: '心齋橋下榻飯店 → 關西國際機場第一／第二航廈',
                        cost: '包車單程 ¥80,000–130,000（40人均攤每人約 ¥2,200–2,800）',
                        mapQuery: '關西國際機場',
                        backup: '若最終訂購為午班機返台，於 10:00 退房直接包車前往機場，並將 BEAMS、Bshop 與 LiLo Coffee 移至 Day 3 下午空檔。'
                    }
                ]
            },
            {
                period: '晚上返台',
                icon: 'fa-plane-departure',
                color: 'indigo',
                items: [
                    {
                        time: '17:15 – 21:30',
                        title: '關西機場團體報到、免稅伴手禮採買與搭機返抵桃園機場',
                        category: '2027 大學畢旅圓滿賦歸',
                        desc: '預留充裕時間辦理 40 人團體行李託運與安檢出境，於關西機場免稅店購買最後關西伴手禮後搭機返抵桃園機場，圓滿結束五天四夜大阪大學畢旅！',
                        hours: '配合傍晚約 19:00–19:30 起飛之返台航班作業',
                        address: '關西國際機場 (KIX) → 台灣桃園國際機場 (TPE)',
                        cost: '已涵蓋於團體機票與機場包車預算內',
                        mapQuery: 'Kansai International Airport',
                        backup: '若改搭深夜班機離開大阪，Day 5 晚餐可安排難波鳥貴族或 24 小時一蘭拉麵，21:30 再搭包車前往機場。'
                    }
                ]
            }
        ]
    }
];

// 3. 品牌與地點極速檢索目錄資料 (涵蓋全報告重點店家)
const directoryItems = [
    // 街頭潮牌 & 選物
    { name: 'KITH OSAKA 旗艦店', category: 'streetwear', day: 'Day 1', area: '梅田 Umekita Green Place 1F', hours: '11:00–21:00', desc: '2025年3月開幕日本第二家旗艦店，石灰華建築美學與日本限定系列。', map: 'KITH OSAKA Umekita Green Place' },
    { name: 'Supreme Osaka', category: 'streetwear', day: 'Day 2', area: '南堀江 1-9-8 (Orange Street)', hours: '11:00–20:00', desc: '美式街頭王者大阪旗艦店，南堀江立花通核心必逛指標。', map: 'Supreme Osaka 南堀江' },
    { name: 'HOODS Osaka (WTAPS / NEIGHBORHOOD)', category: 'streetwear', day: 'Day 2', area: '南堀江 1-19-22 (Orange Street)', hours: '12:00–20:00', desc: '匯集日系工裝軍風龍頭 WTAPS 與 NEIGHBORHOOD 的官方旗艦店。', map: 'HOODS Osaka 南堀江' },
    { name: 'BAPE STORE OSAKA', category: 'streetwear', day: 'Day 2', area: '南堀江 1-19-2 (Orange Street)', hours: '11:00–20:00', desc: '經典猿人頭與迷彩單品旗艦店，街拍打卡醒目地標。', map: 'BAPE STORE OSAKA 南堀江' },
    { name: 'Carhartt WIP Store Osaka', category: 'streetwear', day: 'Day 2', area: '南堀江 Orange Street', hours: '11:00–20:00', desc: '歐美工裝潮流支線專門店，版型俐落適合大學生日常穿搭。', map: 'Carhartt WIP Store Osaka' },
    { name: 'URBAN RESEARCH 堀江店', category: 'streetwear', day: 'Day 2', area: '南堀江 1-20-9', hours: '11:00–19:30', desc: '日系都會質感選物代表，堀江店空間寬敞單品齊全。', map: 'URBAN RESEARCH 堀江店' },
    { name: 'Stüssy Osaka', category: 'streetwear', day: 'Day 2', area: '西心齋橋 1-7-9 (美國村)', hours: '11:00–19:00', desc: '美國村潮流核心據點，經典巡迴印花 Tee 與帽款齊全。', map: 'Stussy Osaka 西心斎橋' },
    { name: 'HUMAN MADE SHINSAIBASHI PARCO', category: 'streetwear', day: 'Day 2', area: '心齋橋 PARCO 1F', hours: '10:00–20:00', desc: 'NIGO 主理愛心潮牌專門店，與星巴克臻選同棟超好逛。', map: 'HUMAN MADE SHINSAIBASHI PARCO' },
    { name: 'ARC\'TERYX 始祖鳥大阪心齋橋店', category: 'streetwear', day: 'Day 3', area: '南船場 3-5-15', hours: '11:00–20:00', desc: '台日年輕世代最愛高端戶外機能品牌，風衣與背包熱銷。', map: 'ARC TERYX 大阪心斎橋店' },
    { name: 'ISSEY MIYAKE SEMBA', category: 'streetwear', day: 'Day 3', area: '南船場 4-11-28', hours: '11:00–20:00', desc: '囊括三宅一生男裝皺褶 HOMME PLISSÉ 等多支線設計名店。', map: 'ISSEY MIYAKE SEMBA' },
    { name: 'W Osaka (安藤忠雄監修外觀)', category: 'streetwear', day: 'Day 3', area: '南船場 4-1-3', hours: '全天外觀拍照', desc: '建築大師安藤忠雄監修純黑極簡地標，全團街頭穿搭合照聖地。', map: 'W Osaka' },
    { name: 'BEAMS Namba', category: 'streetwear', day: 'Day 5', area: 'なんば CITY 本館 B1F', hours: '11:00–21:00', desc: '集結 BEAMS PLUS、Ray BEAMS、BEAMS BOY 等多條日本國民選物支線。', map: 'BEAMS Namba' },
    { name: 'Bshop Namba Parks', category: 'streetwear', day: 'Day 5', area: 'Namba Parks 3F', hours: '11:00–21:00', desc: '主打日法極簡經典日常服飾與 Danton、Orcival 等高質感單品。', map: 'Bshop Namba Parks' },

    // 五日不重複風格咖啡廳
    { name: 'Kith Treats Osaka (風格#1 潮流甜品系)', category: 'cafe', day: 'Day 1', area: '梅田 Umekita Green Place 1F', hours: '11:00–21:00', desc: '必點致敬大阪混合果汁的獨家「Naniwa」香草玉米片特調冰淇淋。', map: 'Kith Treats Osaka' },
    { name: 'STARBUCKS RESERVE Cafe (風格#2 百貨臻選系)', category: 'cafe', day: 'Day 2', area: '心齋橋 PARCO B1', hours: '08:00–22:30', desc: '百貨質感臻選咖啡，座席寬敞緊鄰購物點，40人分批小憩免日曬雨淋。', map: 'STARBUCKS RESERVE 心齋橋 PARCO' },
    { name: 'Brooklyn Roasting Company Kitahama (風格#3 河畔工業風系)', category: 'cafe', day: 'Day 3', area: '北濱 1-1-9', hours: '08:00–20:00', desc: '磚牆木質空間正對土佐堀川與中之島綠意，戶外木棧露台絕美拍照機位。', map: 'Brooklyn Roasting Company Kitahama' },
    { name: 'OSA COFFEE (風格#4 昭和甜點喫茶系)', category: 'cafe', day: 'Day 4', area: '中崎西 4-1-7', hours: '平日 11:00–15:00 / 18:00–20:00', desc: '機場登機主題網美咖啡，招牌超巨大冰淇淋焦糖布丁必拍（週三休）。', map: 'OSA COFFEE 中崎西' },
    { name: 'LiLo Coffee Roasters / KISSA (風格#5 精品手沖系)', category: 'cafe', day: 'Day 5', area: '西心齋橋 1-10-28 / 心齋橋筋 2-7-25', hours: '11:00–23:00 (KISSA 13:00起)', desc: '2014年創立大阪自烘名店，點單附專屬「咖啡師名片」儀式感滿分。', map: 'LiLo Coffee Roasters 大阪' },

    // 燒肉 & 大阪燒美食
    { name: 'お好み焼 ゆかり (Yukari) 曾根崎本店', category: 'food', day: 'Day 1', area: '梅田曾根崎 2-14-13', hours: '11:00–23:00', desc: '1950年創立大阪燒代表名店，多層樓空間與招牌「香濃起司大阪燒」。', map: 'お好み焼 ゆかり 曾根崎本店' },
    { name: '國產牛燒肉食べ放題 あぶりや 阪急梅田店', category: 'food', day: 'Day 1', area: '阪急ターミナルビル 17F', hours: '17:00–22:00 (五六日23:00)', desc: '17樓高空俯瞰梅田夜景的國產牛燒肉吃到飽，適合40人分訂相鄰大桌。', map: 'あぶりや 阪急梅田店' },
    { name: 'WEST WOOD BAKERS', category: 'food', day: 'Day 2', area: '南堀江 1-16-9', hours: '09:00–16:00 (無公休)', desc: '美式落地玻璃屋早午餐，主打現烤麵包、厚漢堡與鬆餅，採兩組接力入座。', map: 'WEST WOOD BAKERS 南堀江' },
    { name: '炭火燒肉食べ放題 力丸 (心齋橋店)', category: 'food', day: 'Day 2', area: '心齋橋筋 2-1-32 ISビル 4F', hours: '16:00–00:00', desc: '近固力果招牌的人氣平價燒肉放題，厚切牛肉口碑佳且支援線上預約。', map: '炭火燒肉 力丸 心齋橋店' },
    { name: '大阪燒 千草 & 鶴家 (天滿雙店分流)', category: 'food', day: 'Day 3', area: '北區天神橋 4-11-18', hours: '11:00–21:30', desc: '天滿庶民名店「獨創千草燒」與隔壁老字號「鶴家」，40人拆兩店免久候。', map: 'お好み焼 千草 天神橋' },
    { name: '千房 大阪燒 (道頓堀大樓店)', category: 'food', day: 'Day 3', area: '道頓堀 1-5-5 1～4、6F', hours: '11:00–01:00', desc: '整棟超大座席容量適合40人分桌，桌邊師傅豪邁美乃滋拉花視覺秀超好拍。', map: '千房 道頓堀ビル店' },
    { name: 'RICH GARDEN & J\'adore Chayamachi', category: 'food', day: 'Day 4', area: '中崎西 2-3-14 / 鶴野町 4-11', hours: '11:00–23:00 / 11:00–15:00', desc: '中崎町高CP值雙店分流（各20人）：純牛粗絞漢堡 vs 地中海麵包沙拉吧，均價約¥1,000。', map: 'RICH GARDEN 梅田中崎町店' },
    { name: '長堀橋站旁國產黑毛和牛炭火燒肉 (可包場)', category: 'food', day: 'Day 4', area: '長堀橋站旁東心齋橋商圈', hours: '可包場至清晨', desc: '距離飯店步行4分鐘，可安排40人包區舉辦最後一晚黑毛和牛慶功宴。', map: '長堀橋駅 焼肉 黒毛和牛' },
    { name: '道頓堀 今井 本店', category: 'food', day: 'Day 5', area: '道頓堀 1-7-22', hours: '週五午餐營業', desc: '1946年創立百年木造町家，招牌「狐狸烏龍麵」北海道昆布柴魚湯頭僅 ¥930。', map: '道頓堀 今井 本店' },

    // 酒吧 & 深夜續攤
    { name: 'Craftroom (當代工藝調酒)', category: 'nightlife', day: 'Day 1', area: '大阪駅前第1ビル B2F', hours: '16:00–00:00 (週日休)', desc: '大阪頂尖話題調酒吧，招牌「Oriental Farm」融合茉莉花茶與芹菜苦精。', map: 'Craftroom 大阪駅前第1ビル' },
    { name: '鳥貴族 (齋橋店 / 頓堀店)', category: 'nightlife', day: 'Day 1', area: '心齋橋筋 / 道頓堀', hours: '營業至 02:00 / 05:00', desc: '平價均價制串燒居酒屋，最適合大團體分桌熱鬧舉杯續攤宵夜。', map: '鳥貴族 頓堀店' },
    { name: 'Osaka Cocktail Library Akashic Records', category: 'nightlife', day: 'Day 2', area: '心齋橋筋 2-1-32 ISビル 3F', hours: '夜間依官網預約', desc: '位於燒肉力丸正樓下（0分鐘），以圖書館書庫與絕美酒牆為主題的微醺酒吧。', map: 'Osaka Cocktail Library Akashic Records' },
    { name: 'Bar Nayuta (無酒單隱藏 DJ 酒吧)', category: 'nightlife', day: 'Day 3', area: '西心齋橋 1-6-17 マリオビル 5F', hours: '15:00–03:00', desc: '美國村三角公園旁神祕符號入口，主打無酒單客製調酒與現場 DJ 放歌。', map: 'Bar Nayuta 大阪' },
    { name: 'Sake Republic (日本清酒品飲)', category: 'nightlife', day: 'Day 4', area: '西心齋橋 1-13-1 5F', hours: '夜間營業', desc: '距心齋橋站步行1分鐘，適合大學生體驗多樣日本清酒風味與拍照。', map: 'Sake Republic 心齋橋' },
    { name: 'Brewpub Center Point (自釀精釀啤酒)', category: 'nightlife', day: 'Day 4', area: '北區浮田 2-5-8 (中崎町)', hours: '15:00–23:00', desc: '自附小型釀酒廠，隨時提供4種自釀精釀啤酒搭配慢烤牛胸肉。', map: 'Brewpub Center Point 大阪' },

    // 藥妝 & 黑膠唱片
    { name: 'UNIQLO SHINSAIBASHI & GU 心齋橋', category: 'shopping', day: 'Day 3', area: '心齋橋筋 1-2-14 / 2-1-17', hours: '11:00–21:00', desc: '6層樓720坪旗艦店，必買大阪藝術家聯名「心齋橋店限定印花 T 恤」。', map: 'UNIQLO SHINSAIBASHI' },
    { name: '大國藥妝 NEW 心齋橋店', category: 'shopping', day: 'Day 3', area: '南船場 3-5-17', hours: '週一至六 08:00–23:00', desc: '網友公認價格極具競爭力、貨色齊全的藥妝補貨首選，買完步行5分回飯店卸貨。', map: '大國藥妝 NEW 心齋橋店' },
    { name: 'TOWER RECORDS 梅田 NU 茶屋町店 & VINYL', category: 'shopping', day: 'Day 4', area: '茶屋町 10-12 NU chayamachi 6F/4F', hours: '11:00–22:00', desc: '426坪關西唱片殿堂與4樓黑膠專賣館，黃紅看板必拍團體合照。', map: 'TOWER RECORDS 梅田NU茶屋町店' }
];

// 4. 預算資料 (廉航超值 vs 傳航寬裕)
const budgetDatasets = {
    lcc: {
        totalJpy: 126500,
        labels: [
            '桃園－關西來回機票 (廉航含行李)',
            '四晚心齋橋住宿 (含早餐)',
            '晚餐 (4餐含燒肉放題)',
            '夜生活 / 酒吧居酒屋 (4晚)',
            '午餐 (5餐高CP美食)',
            '咖啡廳下午茶 (5間風格店)',
            '市區地鐵 ＋ 卸重/深夜計程車',
            '機場來回 45人座大巴包車',
            '網卡、旅平險與雜支'
        ],
        values: [48000, 28000, 16500, 9000, 6500, 5500, 5000, 4500, 3500],
        colors: ['#0F172A', '#3B82F6', '#F97316', '#8B5CF6', '#F59E0B', '#D97706', '#10B981', '#06B6D4', '#94A3B8']
    },
    fsc: {
        totalJpy: 180000,
        labels: [
            '桃園－關西來回機票 (傳統航空)',
            '四晚心齋橋住宿 (含早餐升級)',
            '晚餐 (4餐含燒肉放題)',
            '夜生活 / 酒吧居酒屋 (4晚)',
            '午餐 (5餐高CP美食)',
            '咖啡廳下午茶 (5間風格店)',
            '市區地鐵 ＋ 卸重/深夜計程車',
            '機場來回 45人座大巴包車',
            '網卡、旅平險與雜支'
        ],
        values: [70000, 38000, 22000, 14000, 10000, 8500, 7000, 5500, 5000],
        colors: ['#0F172A', '#3B82F6', '#F97316', '#8B5CF6', '#F59E0B', '#D97706', '#10B981', '#06B6D4', '#94A3B8']
    }
};

// 5. 計程車路線資料
const taxiRoutes = {
    day_short: { total: '¥600 – ¥700', perPerson: '¥150 – ¥175' },
    day_mid: { total: '¥2,100 – ¥2,200', perPerson: '¥525 – ¥550' },
    night_short: { total: '¥720 – ¥900 (含20%夜間加成)', perPerson: '¥180 – ¥225' },
    night_umeda: { total: '¥2,500 – ¥2,800 (GO叫車+¥500)', perPerson: '¥625 – ¥825' },
    night_nakazaki: { total: '¥3,000 – ¥3,500 (含夜間與叫車)', perPerson: '¥750 – ¥875' }
};
