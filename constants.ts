
import { FlightData, ItineraryDay, PackingCategory, PowerBankRule, Accommodation, SouvenirDay } from './types';

export const PACKING_LIST_COLLECTION = 'packing_list';
export const FIREBASE_LIST_DOC_ID = 'userList';

export const initialPackingList: PackingCategory[] = [
    { category: "重要文件(Documents)", icon: "🔖", items: [
        { name: "護照、電子簽證(ETA)", packed: false },
        { name: "機票 (電子登機證)", packed: false },
        { name: "旅遊保險資料", packed: false },
        { name: "國際駕照、台灣駕照", packed: false },
        { name: "訂房/訂車單", packed: false },
    ]},
    { category: "隨身行李 (Carry-on)", icon: "👜", items: [
        { name: "現金 (台幣、日幣)", packed: false },
        { name: "信用卡、提款卡", packed: false },
        { name: "行動電源", packed: false },
        { name: "充電線、頭", packed: false },
        { name: "個人藥品", packed: false },
        { name: "耳機、頸枕、眼罩", packed: false },
        { name: "水壺、輕便雨傘", packed: false },
        { name: "手錶、太陽眼鏡", packed: false },
    ]},
    { category: "衣物類 (Clothing)", icon: "👕", items: [
        { name: "上衣 (長袖/短袖)", packed: false },
        { name: "外套 (防風/保暖)", packed: false },
        { name: "下著", packed: false },
        { name: "襪子、內衣褲 (9天份)", packed: false },
        { name: "睡衣、拖鞋", packed: false },
        { name: "備用鞋 (運動鞋)", packed: false },
    ]},
    { category: "盥洗/彩妝/保養 (Toiletries/Skincare)", icon: "🧴", items: [
        { name: "牙刷、牙膏、漱口水", packed: false },
        { name: "洗髮精、沐浴乳 (旅行組)", packed: false },
        { name: "毛巾、浴巾", packed: false },
        { name: "洗面乳、化妝水、乳液", packed: false },
        { name: "化妝品、卸妝品", packed: false },
        { name: "防曬乳、護唇膏", packed: false },
        { name: "衛生用品 (女性)", packed: false },
    ]},
    { category: "其他用品 (Others)", icon: "🧐", items: [
        { name: "環保袋、購物袋", packed: false },
        { name: "洗衣袋、夾鏈袋", packed: false },
        { name: "個人習慣用品", packed: false },
        { name: "口罩", packed: false },
    ]},
];

export const importantNotes: string[] = [
    "💧 液體限制：所有液體、噴霧、凝膠容器不得超過 100ml，且需放入 1 公升透明夾鏈袋內 (隨身行李)。",
    "✂️ 刀具/尖銳物：修眉刀、指甲剪等需託運。",
    "🛂 護照有效期：確認護照有效期需超過六個月。",
    "🚫 飛行全程禁止在機上使用或充電行動電源。",
];

export const powerBankRules: PowerBankRule[] = [
    { rule: "攜帶位置", detail: "只能放在手提行李中，禁止託運。" },
    { rule: "容量限制 (100Wh 以下)", detail: "可自由攜帶上機，数量上限依各航空公司規定 (常見最多20個)。" },
    { rule: "容量限制 (100Wh 至 160Wh)", detail: "需事先向航空公司報備許可，每人最多可攜帶兩個。" },
    { rule: "容量限制 (超過 160Wh)", detail: "禁止攜帶。" },
    { rule: "標示要求", detail: "行動電源上必須清楚標示容量 (Wh 或 mAh) 和功率。" },
];

export const flightData: FlightData = {
    outbound: {
        type: "去程 (Outbound)",
        date: "2026/03/28 (六)",
        departure: { time: "07:30", city: "TPE/桃園", airport: "臺灣桃園國際機場", terminal: "T1" },
        arrival: { time: "11:00", city: "OSA/大阪", airport: "關西國際機場", terminal: "T1" },
        airline: "泰國越捷航空",
        flightNumber: "VZ566",
        duration: "2小時30分",
        color: "text-[#d15b47]", // Theme Red
        baggage: {
            carryOn: "每人 1 件 (≤7kg)",
            checked: "每人 1 件 (≤15kg)", 
        },
    },
    inbound: {
        type: "回程 (Inbound)",
        date: "2026/04/05 (日)",
        departure: { time: "14:00", city: "OSA/大阪", airport: "關西國際機場", terminal: "T1" },
        arrival: { time: "16:00", city: "TPE/桃園", airport: "臺灣桃園國際機場", terminal: "T2" },
        airline: "中華航空",
        flightNumber: "CI153",
        duration: "2小時55分",
        color: "text-[#2b6e90]", // Theme Blue
        baggage: {
            carryOn: "每人 1 件 (≤7kg)",
            checked: "每人 2 件 (≤23kg)",
        },
    }
};

export const accommodationData: Accommodation[] = [
    {
        name: "JOJO CChouse",
        dates: "2026/3/28 — 2026/3/29",
        address: "クリオコート梅田イースト クリオコ－ト梅田イ－スト, Osaka, Japan, 530-0021",
        notes: "",
        mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9"
    },
    {
        name: "Happy House- TAKAMATSU",
        dates: "2026/3/29 — 2026/3/30",
        address: "国道32号線 白井ビル, 高松市, Japan",
        notes: "Map Code：60 637 360*54\n部屋【203】室、key box【8823】",
        mapUrl: "https://maps.app.goo.gl/2ivAUEN5ZpzGWbsD9"
    },
    {
        name: "arigatouya 3 minutes by car to C",
        dates: "2026/3/30 — 2026/4/1",
        address: "仁尾町仁尾丁３２５, 三豊市, Japan 769-1407",
        notes: "Map Code：77 392 568*62",
        mapUrl: "https://maps.app.goo.gl/qKSvDzaZz5FvERfr9"
    },
    {
        name: "木の家ゲストハウス松山本館",
        dates: "2026/4/1 — 2026/4/2",
        address: "愛媛県松山市越智３丁目６−６, 愛媛県松山市, Japan 790-0933",
        notes: "Map Code：53 199 637*82\nkey box【9655】",
        mapUrl: "https://maps.app.goo.gl/Sbr2kRYoS9dVHCf88"
    },
    {
        name: "entohouse BAR&GUESTHOUSE",
        dates: "2026/4/2 — 2026/4/3",
        address: "西予市野村町野村９−１８０, 西予市, Japan 797-1212",
        notes: "Map Code：176 736 086*27",
        mapUrl: "https://maps.app.goo.gl/vYpASt1zACD7uEGr5"
    },
    {
        name: "光の宿",
        dates: "2026/4/3 — 2026/4/4",
        address: "富岡町トノ町６６－１, 阿南市, Japan 774-0033",
        notes: "Map Code：217 589 853*57",
        mapUrl: "https://maps.app.goo.gl/Fyv8NJsh7Wp7Kwmu9"
    },
    {
        name: "大阪難波ELLY-one",
        dates: "2026/4/4 — 2026/4/5",
        address: "大阪市中央区日本橋2-18-19 公寓, Osaka, Japan 542-0073",
        notes: "",
        mapUrl: "https://maps.app.goo.gl/dDttATrd7b8dM3mt5"
    }
];

export const souvenirData: SouvenirDay[] = [
  {
    day: 5,
    date: "2026/04/01",
    souvenirs: [
      {
        imageUrl: "https://raw.githubusercontent.com/jayliu0012/sui2026/main/omiyage/kyuman.png",
        omiyageName: "灸まん",
        storeName: "灸まん本舗 石段や 本店",
        mapUrl: "https://maps.app.goo.gl/Xz1H8sexCWpBioHS8",
        address: "",
      },
    ],
  },
  {
    day: 6,
    date: "2026/04/02",
    souvenirs: [
        {
            imageUrl: "https://raw.githubusercontent.com/jayliu0012/Shikoku2026/main/dango.png",
            omiyageName: "少爺糰子",
            storeName: "つぼや菓子舗",
            mapUrl: "https://maps.app.goo.gl/88fBM54ZDjnqmqiSA",
            address: "",
        }
    ]
  },
  {
    day: 8,
    date: "2026/04/04",
    souvenirs: [
      {
        imageUrl: "https://raw.githubusercontent.com/jayliu0012/sui2026/main/omiyage/TakinoYakiMochi.png",
        omiyageName: "滝の焼餅",
        storeName: "和田の屋 (阿波おどり会館一階)",
        mapUrl: "https://maps.app.goo.gl/4MvFi1PXYzQpkLv57",
        address: "",
      },
    ],
  },
];

export const itineraryData: ItineraryDay[] = [
    { 
        day: 1, 
        date: "2026/03/28", 
        theme: "城市漫遊與轉乘", 
        color: "border-[#f1be42]", 
        highlight: "泰國越捷 VZ566 11:00 抵達 KIX，難波/心齋橋購物。", 
        stops: [
            {
                time: "07:30",
                name: "臺灣桃園國際機場",
                durationLabel: "(起飛)",
                note: "備註：\n📝越捷航空_VZ566",
                transport: { mode: "✈️", time: "2hr3min" },
                category: "🛫"
            },
            {
                time: "11:00",
                name: "関西国際空港",
                durationLabel: "(停留 01時00分)",
                note: "備註：\n📝 搭乘手扶梯至2F、ICOCA卡(南海電鐵_紅色窗口)",
                transport: { mode: "🚶", time: "10分" },
                category: "🛬"
            },
            {
                time: "12:30",
                name: "関西空港駅",
                durationLabel: "(停留 00時09分)",
                note: "備註：\n📝南海空港線:\n関西空港 → 南海難波(11站)\n💴¥970",
                mapUrl: "https://maps.app.goo.gl/FqjshYKq5CnPxBDT7",
                transport: { mode: "🚇", time: "54分" },
                category: "🚉"
            },
            {
                time: "13:33",
                name: "南海難波",
                durationLabel: "(停留 00時30分)",
                note: "📝行李寄放",
                storageUrl: "https://maps.app.goo.gl/he44jc3v25impeKq6",
                transport: { mode: "🚶", time: "4分" },
                category: "🚉"
            },
            {
                time: "14:07",
                name: "福太郎 難波Dining Maison店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/TxSwyh3CFuRcGjep8",
                transport: { mode: "🚶", time: "9分" },
                category: "🍽️"
            },
            {
                time: "15:16",
                name: "K-books Namba-ichibankan",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/MWa7egcKfBiB4mpt9",
                transport: { mode: "🚶", time: "5分" },
                category: "🛍️"
            },
            {
                time: "16:21",
                name: "Kotobukiya Namba",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/KbTwZ1xipkzfHX1E9",
                note: "備註：\n📝御堂筋線:\n難波站 → 心齋橋站(1站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "10分" },
                category: "🛍️"
            },
            {
                time: "17:31",
                name: "3COINS",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/pqvtqcavzvdt1HtGA",
                transport: { mode: "🚶", time: "5分" },
                category: "🛍️"
            },
            {
                time: "18:36",
                name: "HMV&BOOKS SHINSAIBASHI",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/7WzvQLyVqJdP3KLf9",
                note: "備註：\n📝御堂筋線:\n心齋橋站 → 難波站(1站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "8分" },
                category: "🛍️"
            },
            {
                time: "19:44",
                name: "南海難波",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/FqjshYKq5CnPxBDT7",
                storageUrl: "https://maps.app.goo.gl/he44jc3v25impeKq6",
                note: "備註：\n📝堺筋線:\n日本橋（大阪） → 天神橋筋六丁目(6站)\n💴¥240",
                transport: { mode: "🚶+🚃", time: "25分" },
                category: "🚉"
            },
            {
                time: "20:36",
                name: "JOJO CChouse",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9",
                note: "備註：\n📝谷町線:\n天神橋筋六丁目 → 東梅田(2站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "22分" },
                category: "🛏️"
            },
            {
                time: "21:11",
                name: "新梅田美食街",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/PfkTrsuwTj8YWrCS7",
                note: "備註：\n📝谷町線:\n東梅田 → 天神橋筋六丁目(2站)\n💴¥190",
                transport: { mode: "🚶+🚃", time: "22分" },
                category: "🍽️"
            },
            {
                time: "22:32",
                name: "7-Eleven 天神筋橋六6丁目站南店",
                durationLabel: "(停留 00時15分)",
                mapUrl: "https://maps.app.goo.gl/2X9Brk2n3FqTofzq5",
                transport: { mode: "🚶", time: "5分" },
                category: "🏪"
            },
            {
                time: "22:28",
                name: "JOJO CChouse",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/CaHm3U2Qae6oTWLz9",
                transport: undefined,
                category: "🛏️"
            }
        ]
    },
    { 
        day: 2, 
        date: "2026/03/29", 
        theme: "啟程、烏龍麵與庭園之美", 
        color: "border-[#2b6e90]", 
        highlight: "高速巴士至高松、租車、烏龍麵、栗林公園、骨付鳥。", 
        stops: [
            {
                time: "06:20",
                name: "JOJO CChouse",
                durationLabel: "",
                transport: { mode: "🚶", time: "17min" },
                category: "🛏️"
            },
            {
                time: "06:37",
                name: "大阪梅田_阪急三番街",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/qzNzy6vgcdiQ5LcB6",
                note: "備註：\n📝07:10發車",
                transport: { mode: "🚍", time: "3hr41min" },
                category: "🚏"
            },
            {
                time: "10:51",
                name: "JR高松車站_高速巴士總站",
                durationLabel: "",
                mapUrl: "https://maps.app.goo.gl/xkYKbmPX4qVFYtcQ8",
                transport: { mode: "🚶", time: "4min" },
                category: "🚏"
            },
            {
                time: "11:05",
                name: "平成租車高松車站前店",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/zCnVfvDgy9bnhrB2A",
                transport: { mode: "🚗", time: "11min" },
                category: "🧍"
            },
            {
                time: "11:46",
                name: "手打十段うどんバカ一代",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/AYvf4cQYFPxuAWwM7",
                note:"備註：\n📝Map code: 60 607 011*48\n🅿あなぶきパーク多賀町パーキング\n💴¥100/30min",
                parkingUrl: "https://maps.app.goo.gl/c2nUZh16ivDtgyKs7",
                transport: { mode: "🚗", time: "10min" },
                category: "🍽️"
            },
            {
                time: "13:20",
                name: "栗林公園",
                durationLabel: "(停留 02時00分)",
                mapUrl: "https://maps.app.goo.gl/AYvf4cQYFPxuAWwM7",
                note: "備註：\n💴門票:¥410/人\n🅿栗林公園 駐車場\n📝Map code: 60 545 891*36\n💴¥100/25min",
                parkingUrl: "https://maps.app.goo.gl/c2nUZh16ivDtgyKs7",
                transport: { mode: "🚗", time: "10min" },
                category: "🏞️"
            },
            {
                time: "15:40",
                name: "時尚中心 思夢樂鹿角店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/ZHD7GTgQtJUxRuah6",
                note: "備註：\n🅿思夢樂附設\n📝Map code: 60 484 016*07\n💴免費",
                transport: { mode: "🚗+🚶", time: "25min" },
                category: "🛍️"
            },
            {
                time: "17:25",
                name: "骨付鳥 一鶴 高松店",
                durationLabel: "(停留 01時00分)",
                mapUrl: "https://maps.app.goo.gl/dm8qZsERDKTztRGu6",
                note: "備註：\n🅿丸亀町町営第4駐車場\n📝Map code: 60 606 454*70\n💴¥500/5h",
                parkingUrl: "https://maps.app.goo.gl/Kfeq77aV4R2s5bYS6",
                transport: { mode: "🚶", time: "3min" },
                category: "🍽️"
            },
            {
                time: "18:35",
                name: "セブン-イレブン高松丸亀町店",
                durationLabel: "(停留 00時30分)",
                mapUrl: "https://maps.app.goo.gl/7cqYFFK8Js4gxqEf8",
                note: "備註：\n📝郵票(きって)¥100/張",
            }
        ]
    },
]
