// 台股真實與代表性案例資料庫（經基本面、技術面、籌碼面、估值面嚴格校驗）

export const PRESET_STOCKS = [
  {
    id: '2330',
    name: '台積電',
    code: '2330',
    category: '半導體權值股',
    tag: '護城河極深 / 全球晶圓代工龍頭',
    marketCap: '約 27 兆新台幣',
    currentPrice: 1045,
    change: +25,
    changePercent: +2.45,
    pe: 23.5,
    pb: 6.2,
    yield: 1.85,
    roe: 28.5,
    operatingMargin: 43.2,
    freeCashFlow: '連續 10 年為正 (強健)',
    debtRatio: 38.5,
    foreignHolding: 73.2,
    trustTrend: '連續買超 8 天',
    foreignTrend: '近 5 日買超 15,200 張',
    marginUsage: '融資使用率僅 1.2% (散戶籌碼安定)',
    technicalStatus: '站上所有均線 (5MA > 20MA > 60MA 多頭排列)',
    valuationStatus: '本益比河流圖處於合理偏中下緣',
    scores: {
      fundamental: 38, // 滿分 40
      valuation: 16,   // 滿分 20
      chips: 18,       // 滿分 20
      technical: 18,   // 滿分 20
      total: 90
    },
    grade: 'S',
    canBuyVerdict: '強烈推薦 (可分批佈局 / 定期定額長抱)',
    verdictColor: 'emerald',
    analysisSummary: '具備無可替代的製程壟斷優勢 (先進封裝 CoWoS + 3nm/2nm)，毛利率長年維持在 53% 以上，自由現金流極度充沛。籌碼面外資與投信持股集中，技術面維持長多架構，是台股長線投資最穩健的核心資產。',
    buyStrategy: '拉回跌破月線 (20MA) 或本益比降至 20 倍以下即為絕佳低接點；小資族建議採用盤中零股定期定額。',
    stopLossPrice: 960,
    klineData: [
      { date: '10/01', open: 970, high: 985, low: 965, close: 980, volume: 28400, ma5: 968, ma20: 950, ma60: 920 },
      { date: '10/04', open: 982, high: 995, low: 978, close: 990, volume: 31200, ma5: 975, ma20: 955, ma60: 923 },
      { date: '10/07', open: 995, high: 1010, low: 990, close: 1005, volume: 42100, ma5: 988, ma20: 962, ma60: 928 },
      { date: '10/11', open: 1010, high: 1025, low: 1000, close: 1015, volume: 38900, ma5: 998, ma20: 970, ma60: 934 },
      { date: '10/15', open: 1015, high: 1030, low: 1010, close: 1025, volume: 36500, ma5: 1007, ma20: 978, ma60: 940 },
      { date: '10/18', open: 1025, high: 1035, low: 1015, close: 1020, volume: 29000, ma5: 1015, ma20: 985, ma60: 946 },
      { date: '10/21', open: 1025, high: 1045, low: 1020, close: 1040, volume: 45000, ma5: 1025, ma20: 994, ma60: 952 },
      { date: '10/23', open: 1038, high: 1050, low: 1035, close: 1045, volume: 41200, ma5: 1033, ma20: 1002, ma60: 958 }
    ]
  },
  {
    id: '2454',
    name: '聯發科',
    code: '2454',
    category: 'IC 設計權值股',
    tag: '5G手機晶片與 ASIC 邊緣運算',
    marketCap: '約 2 兆新台幣',
    currentPrice: 1280,
    change: -10,
    changePercent: -0.78,
    pe: 18.2,
    pb: 3.8,
    yield: 4.8,
    roe: 22.1,
    operatingMargin: 19.8,
    freeCashFlow: '正向且穩定',
    debtRatio: 31.2,
    foreignHolding: 56.4,
    trustTrend: '投信微幅調節賣超',
    foreignTrend: '外資多空拉鋸，區間操作',
    marginUsage: '融資溫和，無失控現象',
    technicalStatus: '股價在月線 (20MA) 附近震盪整理，季線 (60MA) 有強支撐',
    valuationStatus: '本益比 18 倍低於歷史均值，殖利率近 5% 具備防守下檔空間',
    scores: {
      fundamental: 34,
      valuation: 17,
      chips: 14,
      technical: 15,
      total: 80
    },
    grade: 'A',
    canBuyVerdict: '推薦 (適合拉回分批承接、領息+資本利得雙修)',
    verdictColor: 'sky',
    analysisSummary: '手機旗艦天璣晶片搶攻高階市佔率，並攜手輝達發展車用與 ASIC 晶片。高配息政策 (常年配發率高達 80% 以上)，但需留意全球智慧型手機換機週期與庫存回補力道。',
    buyStrategy: '回測季線 (約 1200 元) 不破時可積極進場，逢高 1400 壓力區若無放量可部分獲利了結。',
    stopLossPrice: 1180,
    klineData: [
      { date: '10/01', open: 1230, high: 1250, low: 1220, close: 1245, volume: 6800, ma5: 1235, ma20: 1210, ma60: 1180 },
      { date: '10/04', open: 1250, high: 1270, low: 1240, close: 1260, volume: 7200, ma5: 1246, ma20: 1215, ma60: 1185 },
      { date: '10/07', open: 1265, high: 1300, low: 1260, close: 1295, volume: 9500, ma5: 1262, ma20: 1225, ma60: 1190 },
      { date: '10/11', open: 1300, high: 1315, low: 1285, close: 1300, volume: 8100, ma5: 1275, ma20: 1235, ma60: 1195 },
      { date: '10/15', open: 1295, high: 1305, low: 1275, close: 1280, volume: 6100, ma5: 1282, ma20: 1245, ma60: 1200 },
      { date: '10/18', open: 1280, high: 1295, low: 1270, close: 1285, volume: 5400, ma5: 1288, ma20: 1252, ma60: 1205 },
      { date: '10/21', open: 1290, high: 1300, low: 1275, close: 1290, volume: 5900, ma5: 1288, ma20: 1260, ma60: 1210 },
      { date: '10/23', open: 1290, high: 1295, low: 1270, close: 1280, volume: 6300, ma5: 1287, ma20: 1265, ma60: 1215 }
    ]
  },
  {
    id: '2603',
    name: '長榮',
    code: '2603',
    category: '航運景氣循環股',
    tag: '典型景氣循環股 / 容易產生高殖利率陷阱',
    marketCap: '約 4500 億新台幣',
    currentPrice: 198.5,
    change: +1.5,
    changePercent: +0.76,
    pe: 6.5,
    pb: 0.85,
    yield: 8.5,
    roe: 14.2,
    operatingMargin: 24.5,
    freeCashFlow: '起伏劇烈 (隨航運運價 SCFI 大幅波動)',
    debtRatio: 36.8,
    foreignHolding: 32.1,
    trustTrend: '短線價差操作，無長期鎖碼',
    foreignTrend: '隨地緣政治紅海消息忽買忽賣',
    marginUsage: '融資水位較高，散戶當沖熱門標的',
    technicalStatus: '季線附近高檔橫盤，上方套牢壓力沉重',
    valuationStatus: '本益比僅 6 倍看似便宜，但景氣循環股「低本益比常是賣點，高本益比甚至虧損常是買點」',
    scores: {
      fundamental: 22,
      valuation: 11,
      chips: 12,
      technical: 13,
      total: 58
    },
    grade: 'C',
    canBuyVerdict: '小心觀望 (景氣循環股陷阱，新手嚴禁長抱當存股)',
    verdictColor: 'amber',
    analysisSummary: '典型海運景氣循環股。雖然近期配息大方、本益比個位數，但獲利受全球新船交船量、巴拿馬運河乾旱、紅海危機等外生變數主導。新手極容易因表面超高殖利率進場，除息後陷入「賺了股息、賠了價差」且永遠填不了息的深淵。',
    buyStrategy: '若非熟稔航運運價期貨與波浪理論的高手，強烈建議新手避開；如欲操作僅限嚴守 5% 停損的短線波段。',
    stopLossPrice: 188,
    klineData: [
      { date: '10/01', open: 195, high: 202, low: 193, close: 199, volume: 55000, ma5: 197, ma20: 194, ma60: 190 },
      { date: '10/04', open: 200, high: 206, low: 198, close: 204, volume: 68000, ma5: 199, ma20: 195, ma60: 191 },
      { date: '10/07', open: 205, high: 208, low: 200, close: 201, volume: 72000, ma5: 201, ma20: 196, ma60: 192 },
      { date: '10/11', open: 200, high: 203, low: 195, close: 196, volume: 48000, ma5: 200, ma20: 197, ma60: 193 },
      { date: '10/15', open: 196, high: 198, low: 192, close: 193, volume: 41000, ma5: 198, ma20: 197, ma60: 194 },
      { date: '10/18', open: 194, high: 198, low: 193, close: 196, volume: 39000, ma5: 197, ma20: 197, ma60: 194 },
      { date: '10/21', open: 197, high: 200, low: 195, close: 197, volume: 44000, ma5: 196, ma20: 197, ma60: 195 },
      { date: '10/23', open: 197, high: 201, low: 196, close: 198.5, volume: 46000, ma5: 196.5, ma20: 197.5, ma60: 195.5 }
    ]
  },
  {
    id: '9999',
    name: '極限飆風 (假想地雷飆股案例)',
    code: '9999',
    category: '生技/題材概念股',
    tag: '無營收本夢比 / 主力拉抬出貨割韭菜典型',
    marketCap: '約 35 億新台幣 (小股本易操盤)',
    currentPrice: 88.0,
    change: -9.5,
    changePercent: -9.74,
    pe: -99.9,
    pb: 9.8,
    yield: 0.0,
    roe: -18.5,
    operatingMargin: -45.0,
    freeCashFlow: '連續 4 年大額流出 (燒錢中)',
    debtRatio: 78.4,
    foreignHolding: 1.2,
    trustTrend: '投信完全零持股 (基本面不符內規)',
    foreignTrend: '假外資券商 (如摩根大通某特定分點) 隔日沖',
    marginUsage: '融資使用率高達 68% (極度危險，隨時斷頭)',
    technicalStatus: '爆量長黑跌破月線，形成巨大 M 頭避雷針',
    valuationStatus: '公司仍在虧損，毫無合理本益比可言',
    scores: {
      fundamental: 5,
      valuation: 2,
      chips: 6,
      technical: 5,
      total: 18
    },
    grade: 'D',
    canBuyVerdict: '絕對禁買！(高機率面臨主力倒貨、融資斷頭與全額交割危機)',
    verdictColor: 'rose',
    analysisSummary: '無實質營收與獲利，純靠 LINE 群組、網路論壇放話「打入北美供應鏈 / 取得藥證認證」等虛無題材炒作。主力大戶已在 120 元高檔將籌碼倒給散戶，融資散戶套在山頂。一旦融資維持率跌破 130%，將引發券商不計代價市價砍倉斷頭，呈現連續無量跌停鎖死！',
    buyStrategy: '千萬不可抄底！「飛刀落地不要用手去接」，已有持股者應立即市價掛跌停停損逃命。',
    stopLossPrice: 0,
    klineData: [
      { date: '10/01', open: 95, high: 105, low: 95, close: 104, volume: 12000, ma5: 98, ma20: 88, ma60: 72 },
      { date: '10/04', open: 106, high: 115, low: 105, close: 114, volume: 18000, ma5: 103, ma20: 91, ma60: 74 },
      { date: '10/07', open: 116, high: 125, low: 112, close: 122, volume: 29000, ma5: 110, ma20: 95, ma60: 76 },
      { date: '10/11', open: 124, high: 126, low: 108, close: 110, volume: 48000, ma5: 112, ma20: 97, ma60: 78 },
      { date: '10/15', open: 108, high: 112, low: 98, close: 101, volume: 35000, ma5: 110, ma20: 99, ma60: 80 },
      { date: '10/18', open: 100, high: 102, low: 94, close: 95, volume: 22000, ma5: 105, ma20: 99, ma60: 81 },
      { date: '10/21', open: 94, high: 96, low: 90, close: 91, volume: 16000, ma5: 101, ma20: 99, ma60: 82 },
      { date: '10/23', open: 90, high: 91, low: 88, close: 88, volume: 24000, ma5: 95, ma20: 98, ma60: 83 }
    ]
  }
];

export const FOUR_DIMENSION_EXPLANATION = [
  {
    id: 'fundamental',
    title: '第一維度：基本面與財報安全 (權重 40%)',
    icon: 'ShieldCheck',
    description: '評估這家公司是不是一間「真正賺錢且體質健康」的公司，杜絕倒閉與下市風險。',
    checklist: [
      { name: 'ROE (股東權益報酬率) > 15%', tip: '巴菲特最看重的指標，代表股東投入的每一塊錢能賺回多少利潤。' },
      { name: '近四季 EPS 穩定成長', tip: '每股盈餘持續向上，證明公司營運具備擴張動能。' },
      { name: '營業毛利率與營益率持平或上升', tip: '代表公司具有產品定價權，不怕原物料上漲侵蝕利潤。' },
      { name: '營業現金流與自由現金流 > 0', tip: '真金白銀流入公司，防止「帳面獲利、實際沒錢」的黑字倒閉。' },
      { name: '負債比率 < 50% (非金融業)', tip: '財務槓桿適中，能承受升息循環與不景氣衝擊。' }
    ]
  },
  {
    id: 'valuation',
    title: '第二維度：估值與殖利率位階 (權重 20%)',
    icon: 'Scale',
    description: '就算再好的公司，買貴了依然會賠錢！評估目前股價是否具備足夠的「安全邊際」。',
    checklist: [
      { name: '本益比 (PE) 落於河流圖合理或偏低區間', tip: '通常 12-18 倍屬合理區間；大於 25-30 倍需具備高成長動能支撐。' },
      { name: '本益成長比 (PEG) < 1.2', tip: '彼得林區公式：本益比 / 預估獲利年成長率。小於 1 代表嚴重低估。' },
      { name: '現金殖利率 > 4% 且歷年填息率高', tip: '股利必須填息才算真正獲利，避開貼息高股息假象。' },
      { name: '股價淨值比 (PB) 合理', tip: '對於傳產與金融股，低於 1.0~1.2 倍常具備深厚資產保護防線。' }
    ]
  },
  {
    id: 'chips',
    title: '第三維度：籌碼面與法人大戶動態 (權重 20%)',
    icon: 'Users',
    description: '台股最獨特的核心機制：大資金（外資、投信、主力）往哪裡跑，股價就往哪裡推！',
    checklist: [
      { name: '投信連續買超 (投信認養股)', tip: '投信作帳行情常在中小型潛力股掀起驚人漲幅。' },
      { name: '外資未連續大幅提款賣超', tip: '外資為台積電等大型權值股的最大推手，賣超代表外資匯出資金。' },
      { name: '千張大戶持股比例上升', tip: '籌碼由散戶移轉到大戶手中，籌碼安定度極高。' },
      { name: '融資餘額下降或融資維持率 > 160%', tip: '散戶退場、浮額洗淨，融資維持率低於 130% 隨時會被斷頭砍倉。' }
    ]
  },
  {
    id: 'technical',
    title: '第四維度：技術面位階與動能 (權重 20%)',
    icon: 'TrendingUp',
    description: '決定「何時出手 (買賣時機點)」的羅盤，不追高、不接急速下墜的飛刀。',
    checklist: [
      { name: '股價位於生命線 (季線 60MA) 之上', tip: '台股鐵律：站上季線偏多操作，跌破季線一律保守看待。' },
      { name: '短中長期均線呈現多頭排列', tip: '5MA > 20MA > 60MA，代表所有人買進平均都賺錢，賣壓極輕。' },
      { name: '成交量溫和放大，突破整理平台', tip: '「有量才有價」，出量突破盤整區常是主升段起點。' },
      { name: 'KD/RSI 未處於嚴重超買鈍化區', tip: 'KD > 80 高檔過熱需防拉回，黃金交叉為買進訊號。' }
    ]
  }
];
