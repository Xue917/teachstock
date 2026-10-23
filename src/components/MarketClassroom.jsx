import React, { useState } from 'react';
import { 
  LineChart, Eye, TrendingUp, AlertTriangle, Layers, Info, Check, 
  HelpCircle, BarChart3, ArrowUpRight, ArrowDownRight, Activity,
  Users, DollarSign, Scale, Compass, ShieldCheck, Award, Sparkles, ChevronRight, BookOpen
} from 'lucide-react';
import { PRESET_STOCKS } from '../data/stockData';
import {
  INSTITUTIONAL_INVESTORS_PLAYBOOK,
  KLINE_ANATOMY_GUIDE,
  KLINE_VOLUME_COMBINATIONS,
  CHIPS_FOLLOWING_FORMULAS
} from '../data/marketClassroomData';

export default function MarketClassroom() {
  const [subSection, setSubSection] = useState('kline-guide'); // 'kline-guide', 'institutional', 'chart-sim', 'patterns'
  const [selectedStockId, setSelectedStockId] = useState('2330');
  const [selectedInstitutionalId, setSelectedInstitutionalId] = useState('foreign');
  const [klinePartHighlight, setKlinePartHighlight] = useState('body'); // 'upper', 'body', 'lower', 'open', 'close'

  const [showMA5, setShowMA5] = useState(true);
  const [showMA20, setShowMA20] = useState(true);
  const [showMA60, setShowMA60] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState(null);

  // Five-tier order book simulator state
  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 1040, volume: 145, percent: 80 },
      { price: 1035, volume: 220, percent: 95 },
      { price: 1030, volume: 380, percent: 100 },
      { price: 1025, volume: 180, percent: 70 },
      { price: 1020, volume: 310, percent: 85 }
    ],
    asks: [
      { price: 1045, volume: 85, percent: 45 },
      { price: 1050, volume: 160, percent: 75 },
      { price: 1055, volume: 240, percent: 90 },
      { price: 1060, volume: 420, percent: 100 },
      { price: 1065, volume: 190, percent: 70 }
    ],
    outerRatio: 64, // 外盤比率 64%
    innerRatio: 36, // 內盤比率 36%
    simAlert: '目前外盤成交佔比 64%，代表買方願意追價意願強烈，股價處於偏多推升格局！'
  });

  const activeStock = PRESET_STOCKS.find((s) => s.id === selectedStockId) || PRESET_STOCKS[0];
  const candles = activeStock.klineData;

  // Calculate chart boundaries
  const allPrices = candles.flatMap(c => [c.high, c.low, c.ma5, c.ma20, c.ma60]);
  const minPrice = Math.floor(Math.min(...allPrices) * 0.98);
  const maxPrice = Math.ceil(Math.max(...allPrices) * 1.02);
  const priceRange = maxPrice - minPrice;
  const maxVolume = Math.max(...candles.map(c => c.volume));

  // Simulation handlers for order book
  const handleSimulateBuy = () => {
    setOrderBook({
      bids: [
        { price: 1045, volume: 120, percent: 70 },
        { price: 1040, volume: 190, percent: 85 },
        { price: 1035, volume: 250, percent: 95 },
        { price: 1030, volume: 380, percent: 100 },
        { price: 1025, volume: 180, percent: 70 }
      ],
      asks: [
        { price: 1050, volume: 95, percent: 50 },
        { price: 1055, volume: 180, percent: 75 },
        { price: 1060, volume: 310, percent: 95 },
        { price: 1065, volume: 190, percent: 70 },
        { price: 1070, volume: 260, percent: 80 }
      ],
      outerRatio: 78,
      innerRatio: 22,
      simAlert: '⚡ 外盤大買單湧入！大戶直接以 1045 元吃掉賣單，推升股價向上跳動一檔！外盤比率飆升至 78%！'
    });
  };

  const handleSimulateSell = () => {
    setOrderBook({
      bids: [
        { price: 1035, volume: 90, percent: 50 },
        { price: 1030, volume: 210, percent: 80 },
        { price: 1025, volume: 160, percent: 65 },
        { price: 1020, volume: 290, percent: 90 },
        { price: 1015, volume: 140, percent: 55 }
      ],
      asks: [
        { price: 1040, volume: 210, percent: 85 },
        { price: 1045, volume: 280, percent: 95 },
        { price: 1050, volume: 320, percent: 100 },
        { price: 1055, volume: 190, percent: 70 },
        { price: 1060, volume: 220, percent: 80 }
      ],
      outerRatio: 28,
      innerRatio: 72,
      simAlert: '⚠️ 內盤大單狂倒！賣方不計成本往買價砍單，內盤比重達 72%，買方接單潰退，價格向下回調！'
    });
  };

  const handleSimulateTrap = () => {
    setOrderBook({
      bids: [
        { price: 1040, volume: 980, percent: 100 }, // 假大單
        { price: 1035, volume: 120, percent: 35 },
        { price: 1030, volume: 80, percent: 25 },
        { price: 1025, volume: 60, percent: 20 },
        { price: 1020, volume: 50, percent: 15 }
      ],
      asks: [
        { price: 1045, volume: 45, percent: 30 },
        { price: 1050, volume: 60, percent: 35 },
        { price: 1055, volume: 90, percent: 45 },
        { price: 1060, volume: 110, percent: 50 },
        { price: 1065, volume: 130, percent: 60 }
      ],
      outerRatio: 45,
      innerRatio: 55,
      simAlert: '🚨 典型主力「假大單誘多陷阱」！主力在買一掛出 980 張巨大買單製造「下檔支撐強勁」假象，吸引散戶追高。一旦散戶掛單進場，主力便會瞬間抽單並反手倒貨！'
    });
  };

  // Patterns for encyclopedia with visual diagrams
  const patterns = [
    {
      id: 'big-red',
      name: '大紅K棒 (長紅)',
      bias: '強烈偏多',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '開盤後買盤一路推升至最高點或接近最高點收盤。實體長、上下影線極短，代表多方全面掌握絕對主導權。'
    },
    {
      id: 'big-green',
      name: '大黑K棒 (長綠)',
      bias: '強烈偏空',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: '開盤後賣壓湧出，一路下殺至最低點收盤。代表市場空方力量極度沉重，常伴隨恐慌拋售或主力倒貨。'
    },
    {
      id: 'hammer',
      name: '長下影線 (鎚子線)',
      bias: '低檔支撐轉多',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      desc: '盤中曾大幅下跌，但在收盤前有強力買盤湧入將價格拉回。影線長度為實體 2 倍以上，代表低檔有主力強烈護盤意願。'
    },
    {
      id: 'shooting-star',
      name: '長上影線 (避雷針)',
      bias: '高檔遇壓轉空',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      desc: '早盤曾大幅衝高，隨後引來沉重獲利了結或主力出貨賣壓，收盤大幅回落。常是短線見頂的危險信號。'
    },
    {
      id: 'doji',
      name: '十字星 (十字線)',
      bias: '多空均勢變盤點',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      desc: '開盤價與收盤價幾乎相同，上下皆有影線。代表多空雙方廝殺激烈未分勝負，出現在波段高檔或低檔常預示即將「變盤」！'
    },
    {
      id: 'morning-star',
      name: '早晨之星 (晨星)',
      bias: '底部反轉形態',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '由「長黑K + 跳空小星線 + 吞噬長紅K」組成。連續三日形成黃金底部反轉，是波段止跌買進的經典勝率信號。'
    },
    {
      id: 'red-three-soldiers',
      name: '紅三兵 (連續長紅)',
      bias: '主升段發動',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '連續三根紅 K 棒，每日收盤價均高於前一日，實體穩健放大且無長上影線。多頭發起全面進攻，通常為大波段起跑標誌。'
    },
    {
      id: 'three-black-crows',
      name: '三隻烏鴉 (連續長黑)',
      bias: '崩跌走空',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: '高檔連續出現三根大黑 K，每日開盤都在前一日實體內，收盤連創新低。主力不計成本傾銷，後市跌幅深不見底。'
    },
    {
      id: 'bullish-engulfing',
      name: '多頭吞噬 (陽包陰)',
      bias: '強勢反轉',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '第二根大紅 K 的實體，把前一天的黑 K 實體連頭帶尾徹底完全包覆。代表多方一天之內逆轉戰局，空頭全面繳械。'
    },
    {
      id: 'bearish-engulfing',
      name: '空頭吞噬 (陰包陽)',
      bias: '強勢轉空',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: '第二根大黑 K 的實體，把前一天的小紅 K 實體完全覆蓋吞沒。代表高檔多頭力竭，主力反手全力摜壓。'
    },
    {
      id: 'break-and-reverse',
      name: '破底翻 (假跌破真拉升)',
      bias: '主力誘空殺盤翻多',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/30',
      desc: '股價跌破頸線支撐引發散戶停損與融資砍倉，隔天立即出爆量長紅收復頸線，把空頭軋上天。'
    },
    {
      id: 'guide-fairy',
      name: '仙人指路 (測試高檔賣壓)',
      bias: '突破試盤信號',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      desc: '在上升趨勢中收出帶長上影線的紅 K，隔日若跳空開高並吞噬上影線，代表主力試盤完畢即將展開噴出。'
    }
  ];

  const renderPatternDiagram = (id) => {
    switch (id) {
      case 'big-red':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="75" y1="8" x2="75" y2="15" stroke="#ef4444" strokeWidth="2" />
            <rect x="58" y="15" width="34" height="50" fill="#ef4444" rx="2" />
            <line x1="75" y1="65" x2="75" y2="72" stroke="#ef4444" strokeWidth="2" />
            <path d="M125 55 L145 22 M145 22 L133 22 M145 22 L145 34" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <text x="135" y="70" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">+7%~10%</text>
            <text x="22" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">多方全勝</text>
          </svg>
        );
      case 'big-green':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="75" y1="8" x2="75" y2="15" stroke="#10b981" strokeWidth="2" />
            <rect x="58" y="15" width="34" height="50" fill="#10b981" rx="2" />
            <line x1="75" y1="65" x2="75" y2="72" stroke="#10b981" strokeWidth="2" />
            <path d="M125 25 L145 58 M145 58 L133 58 M145 58 L145 46" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
            <text x="135" y="22" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">-7%~10%</text>
            <text x="22" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">空方灌殺</text>
          </svg>
        );
      case 'hammer':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="70" y1="12" x2="70" y2="18" stroke="#f59e0b" strokeWidth="2" />
            <rect x="56" y="18" width="28" height="16" fill="#ef4444" rx="2" />
            <line x1="70" y1="34" x2="70" y2="72" stroke="#f59e0b" strokeWidth="2.5" />
            <path d="M70 72 Q 110 72, 125 42" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 2" />
            <polygon points="125,36 132,46 120,44" fill="#f59e0b" />
            <text x="130" y="24" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">探底強彈</text>
            <text x="20" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">低檔護盤</text>
          </svg>
        );
      case 'shooting-star':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="70" y1="10" x2="70" y2="48" stroke="#c084fc" strokeWidth="2.5" />
            <rect x="56" y="48" width="28" height="16" fill="#10b981" rx="2" />
            <line x1="70" y1="64" x2="70" y2="70" stroke="#c084fc" strokeWidth="2" />
            <path d="M70 10 Q 110 10, 125 38" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="3 2" />
            <polygon points="125,44 120,34 131,36" fill="#c084fc" />
            <text x="130" y="65" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">高檔出貨</text>
            <text x="20" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">避雷針頂</text>
          </svg>
        );
      case 'doji':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="75" y1="12" x2="75" y2="68" stroke="#60a5fa" strokeWidth="2" />
            <line x1="56" y1="40" x2="94" y2="40" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
            <circle cx="130" cy="40" r="14" fill="#60a5fa20" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="130" y="44" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">變盤</text>
            <text x="20" y="44" fill="#94a3b8" fontSize="10" fontFamily="monospace">多空僵局</text>
          </svg>
        );
      case 'morning-star':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            {/* Candle 1 (Green) */}
            <line x1="42" y1="12" x2="42" y2="52" stroke="#10b981" strokeWidth="1.5" />
            <rect x="33" y="16" width="18" height="32" fill="#10b981" rx="1" />
            {/* Candle 2 (Gapped Down Star) */}
            <line x1="82" y1="52" x2="82" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="75" y="56" width="14" height="8" fill="#ef4444" rx="1" />
            {/* Candle 3 (Red up) */}
            <line x1="122" y1="18" x2="122" y2="58" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="113" y="22" width="18" height="32" fill="#ef4444" rx="1" />
            <path d="M35 65 Q 82 78, 130 65" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />
            <text x="155" y="44" fill="#ef4444" fontSize="10" fontWeight="bold">V轉</text>
          </svg>
        );
      case 'red-three-soldiers':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            {/* Soldier 1 */}
            <line x1="40" y1="40" x2="40" y2="70" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="32" y="44" width="16" height="20" fill="#ef4444" rx="1" />
            {/* Soldier 2 */}
            <line x1="80" y1="26" x2="80" y2="56" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="72" y="30" width="16" height="20" fill="#ef4444" rx="1" />
            {/* Soldier 3 */}
            <line x1="120" y1="12" x2="120" y2="42" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="112" y="16" width="16" height="20" fill="#ef4444" rx="1" />
            <path d="M30 70 L70 54 L110 38 L145 15" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="155" y="44" fill="#ef4444" fontSize="10" fontWeight="bold">強攻</text>
          </svg>
        );
      case 'three-black-crows':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            {/* Crow 1 */}
            <line x1="40" y1="12" x2="40" y2="42" stroke="#10b981" strokeWidth="1.5" />
            <rect x="32" y="16" width="16" height="20" fill="#10b981" rx="1" />
            {/* Crow 2 */}
            <line x1="80" y1="26" x2="80" y2="56" stroke="#10b981" strokeWidth="1.5" />
            <rect x="72" y="30" width="16" height="20" fill="#10b981" rx="1" />
            {/* Crow 3 */}
            <line x1="120" y1="40" x2="120" y2="70" stroke="#10b981" strokeWidth="1.5" />
            <rect x="112" y="44" width="16" height="20" fill="#10b981" rx="1" />
            <path d="M30 16 L70 32 L110 48 L145 72" fill="none" stroke="#10b981" strokeWidth="2.5" />
            <text x="155" y="44" fill="#10b981" fontSize="10" fontWeight="bold">暴跌</text>
          </svg>
        );
      case 'bullish-engulfing':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            {/* Small green */}
            <line x1="58" y1="28" x2="58" y2="54" stroke="#10b981" strokeWidth="1.5" />
            <rect x="49" y="32" width="18" height="18" fill="#10b981" rx="1" />
            {/* Large red engulfing */}
            <line x1="105" y1="12" x2="105" y2="68" stroke="#ef4444" strokeWidth="2" />
            <rect x="92" y="18" width="26" height="46" fill="#ef4444" rx="2" stroke="#f43f5e" strokeWidth="1" />
            <text x="145" y="44" fill="#ef4444" fontSize="10" fontWeight="bold">吞噬轉多</text>
          </svg>
        );
      case 'bearish-engulfing':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="10" y1="40" x2="170" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
            {/* Small red */}
            <line x1="58" y1="28" x2="58" y2="54" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="49" y="32" width="18" height="18" fill="#ef4444" rx="1" />
            {/* Large green engulfing */}
            <line x1="105" y1="12" x2="105" y2="68" stroke="#10b981" strokeWidth="2" />
            <rect x="92" y="18" width="26" height="46" fill="#10b981" rx="2" stroke="#34d399" strokeWidth="1" />
            <text x="145" y="44" fill="#10b981" fontSize="10" fontWeight="bold">吞噬轉空</text>
          </svg>
        );
      case 'break-and-reverse':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <line x1="15" y1="44" x2="165" y2="44" stroke="#38bdf8" strokeDasharray="3 2" strokeWidth="1.5" />
            <text x="20" y="38" fill="#38bdf8" fontSize="9" fontFamily="monospace">頸線支撐</text>
            {/* Day 1: breaks down */}
            <line x1="72" y1="36" x2="72" y2="64" stroke="#10b981" strokeWidth="1.5" />
            <rect x="64" y="40" width="16" height="18" fill="#10b981" rx="1" />
            {/* Day 2: Springs up */}
            <line x1="110" y1="16" x2="110" y2="56" stroke="#ef4444" strokeWidth="2" />
            <rect x="100" y="20" width="20" height="32" fill="#ef4444" rx="1" />
            <text x="145" y="30" fill="#ef4444" fontSize="10" fontWeight="bold">假破真拉</text>
          </svg>
        );
      case 'guide-fairy':
        return (
          <svg viewBox="0 0 180 80" className="w-full h-20 select-none">
            <rect width="180" height="80" rx="8" fill="#090d16" />
            <path d="M20 66 L75 48 L140 22" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            {/* Probe candle */}
            <line x1="75" y1="12" x2="75" y2="55" stroke="#ef4444" strokeWidth="2" />
            <rect x="65" y="40" width="20" height="12" fill="#ef4444" rx="1" />
            {/* Breakout candle */}
            <line x1="120" y1="8" x2="120" y2="38" stroke="#ef4444" strokeWidth="2" />
            <rect x="110" y="14" width="20" height="20" fill="#ef4444" rx="1" />
            <text x="135" y="55" fill="#f59e0b" fontSize="10" fontWeight="bold">高檔試盤</text>
          </svg>
        );
      default:
        return null;
    }
  };

  const activeInstitutional = INSTITUTIONAL_INVESTORS_PLAYBOOK.find(i => i.id === selectedInstitutionalId) || INSTITUTIONAL_INVESTORS_PLAYBOOK[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              K-Line & Institutional Chips Masterclass
            </span>
            <span className="text-slate-400 text-xs">實戰看盤與籌碼雷達</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            K 線入門精解・法人籌碼全解碼・看盤實戰教室
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            從「K 線開高低收四價心理學」、徹底搞懂「外資・投信・自營商・八大官股有何深遠影響」，到盤面五檔與量價戰法。
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'kline-guide', label: '1. K 線該怎麼看？' },
            { id: 'institutional', label: '2. 外資/投信/三大法人解碼' },
            { id: 'chart-sim', label: '3. 互動看盤/五檔模擬器' },
            { id: 'patterns', label: '4. 經典 K 線型態圖鑑' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubSection(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                subSection === tab.id
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          SUBSECTION 1: K-Line Complete Beginner Guide
      ======================================================== */}
      {subSection === 'kline-guide' && (
        <div className="space-y-8">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <BookOpen className="w-5 h-5" />
              <span>K 線的本質：多空兩軍一整天的「心理搏擊戰況紀錄」</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {KLINE_ANATOMY_GUIDE.concept}
            </p>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-amber-300 flex flex-col sm:flex-row justify-between gap-3">
              <div className="space-y-1">
                <span className="font-bold text-rose-400">🇹🇼 台股規則 (紅漲綠跌)：</span>
                <p className="text-slate-300 font-mono text-[11px] whitespace-pre-line">
                  {KLINE_ANATOMY_GUIDE.taiwanVsWorld.taiwan}
                </p>
              </div>
              <div className="space-y-1 sm:max-w-md border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-3 pt-2 sm:pt-0">
                <span className="font-bold text-amber-400">🌐 國際市場差異 (歐美/加密貨幣)：</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {KLINE_ANATOMY_GUIDE.taiwanVsWorld.world}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive K-Line Anatomy Explorer */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                  <Compass className="w-5 h-5 text-rose-400 mr-2" />
                  互動式 K 線解剖台：點擊各部位看穿主力心理學
                </h3>
                <span className="text-xs text-slate-400">點擊下方部位，即可揭開背後的買賣方力量角力</span>
              </div>

              {/* Part selector pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'upper', label: '上影線 (天花板壓力)' },
                  { id: 'body', label: '實體 (多空真實推力)' },
                  { id: 'lower', label: '下影線 (腳底地板支撐)' },
                  { id: 'open', label: '開盤價' },
                  { id: 'close', label: '收盤價 (勝負決勝價)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setKlinePartHighlight(item.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      klinePartHighlight === item.id
                        ? 'bg-rose-500 text-white shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Visual Interactive SVG Candle Diagram */}
              <div className="md:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col items-center justify-center relative min-h-[300px]">
                <span className="text-[11px] font-mono text-slate-400 absolute top-3 left-3">
                  台股長紅 K (陽線) 結構透視
                </span>

                <svg width="220" height="260" viewBox="0 0 220 260" className="select-none">
                  {/* High Price Marker */}
                  <circle cx="110" cy="20" r="4" fill="#f43f5e" />
                  <text x="125" y="24" fill="#f43f5e" fontSize="11" fontFamily="monospace" fontWeight="bold">最高價 (High)</text>

                  {/* Upper Shadow */}
                  <line
                    x1="110" y1="20" x2="110" y2="70"
                    stroke={klinePartHighlight === 'upper' ? '#38bdf8' : '#ef4444'}
                    strokeWidth={klinePartHighlight === 'upper' ? '4' : '2'}
                    className="cursor-pointer transition-all"
                    onClick={() => setKlinePartHighlight('upper')}
                  />
                  {klinePartHighlight === 'upper' && (
                    <text x="25" y="48" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">⬅ 上影線 (被壓回的痕跡)</text>
                  )}

                  {/* Close Price */}
                  <line x1="60" y1="70" x2="160" y2="70" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="165" y="74" fill={klinePartHighlight === 'close' ? '#38bdf8' : '#fda4af'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                    收盤價 (Close)
                  </text>

                  {/* Candle Body */}
                  <rect
                    x="75" y="70" width="70" height="120"
                    fill={klinePartHighlight === 'body' ? '#f43f5e' : '#ef4444'}
                    stroke={klinePartHighlight === 'body' ? '#38bdf8' : '#f43f5e'}
                    strokeWidth={klinePartHighlight === 'body' ? '3' : '1'}
                    rx="3"
                    className="cursor-pointer transition-all"
                    onClick={() => setKlinePartHighlight('body')}
                  />
                  <text x="110" y="135" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    紅 K 實體
                  </text>

                  {/* Open Price */}
                  <line x1="60" y1="190" x2="160" y2="190" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="165" y="194" fill={klinePartHighlight === 'open' ? '#38bdf8' : '#fda4af'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                    開盤價 (Open)
                  </text>

                  {/* Lower Shadow */}
                  <line
                    x1="110" y1="190" x2="110" y2="240"
                    stroke={klinePartHighlight === 'lower' ? '#38bdf8' : '#ef4444'}
                    strokeWidth={klinePartHighlight === 'lower' ? '4' : '2'}
                    className="cursor-pointer transition-all"
                    onClick={() => setKlinePartHighlight('lower')}
                  />
                  {klinePartHighlight === 'lower' && (
                    <text x="25" y="220" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">⬅ 下影線 (拉回的護盤)</text>
                  )}

                  {/* Low Price Marker */}
                  <circle cx="110" cy="240" r="4" fill="#f43f5e" />
                  <text x="125" y="244" fill="#f43f5e" fontSize="11" fontFamily="monospace" fontWeight="bold">最低價 (Low)</text>
                </svg>
              </div>

              {/* Dynamic Detail Card Based on Selected Highlight */}
              <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                {klinePartHighlight === 'body' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      部位解構：實體 (The Real Body)
                    </span>
                    <h4 className="text-lg font-bold text-white">實體大小代表趨勢真實動能與資金決心</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      實體是「開盤價」與「收盤價」之間的長方形柱體。實體越長，說明單一方向（買方或賣方）具有壓倒性的優勢！
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 space-y-1">
                      <span className="font-bold block">💡 實戰觀察竅門：</span>
                      <p className="text-slate-300 leading-relaxed">
                        • <strong>大長紅 K 棒：</strong>多方毫無保留全力推升，若出現在底部盤整突破，勝率極高。<br />
                        • <strong>大長黑 K 棒：</strong>空方全力砸盤，多方毫無招架之力，千萬不能進場徒手接飛刀。<br />
                        • <strong>小實體（紡錘線）：</strong>多空暫時打成平手，即將出現方向性突破。
                      </p>
                    </div>
                  </div>
                )}

                {klinePartHighlight === 'upper' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      部位解構：上影線 (Upper Shadow)
                    </span>
                    <h4 className="text-lg font-bold text-white">天花板壓力與多方受挫的痕跡</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      最高價與實體頂端之間的細線。它忠實記錄了「買方今天一度想發動猛烈進攻，但到了高檔慘遭空頭迎頭痛擊、被迫大幅潰退」的過程。
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 space-y-1">
                      <span className="font-bold block">🚨 避雷警訊：</span>
                      <p className="text-slate-300 leading-relaxed">
                        若在連續大漲 3~5 天的高檔區出現「極長上影線（避雷針）」，代表主力在盤中拉高吸引散戶追高後立刻大舉倒貨，高檔套牢賣壓極度沉重，常是波段頭部出現的信號！
                      </p>
                    </div>
                  </div>
                )}

                {klinePartHighlight === 'lower' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      部位解構：下影線 (Lower Shadow)
                    </span>
                    <h4 className="text-lg font-bold text-white">地板支撐與多方主力護盤承接力道</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      實體底端與最低價之間的細線。它記錄了「空方今天一度想往下砸盤摜殺，但在低檔有強大主力大單硬生生把價格撈起來護盤」的痕跡。
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 space-y-1">
                      <span className="font-bold block">✅ 底部黃金訊號：</span>
                      <p className="text-slate-300 leading-relaxed">
                        在長期跌深後的低檔區，若收出一根「長下影線（影線長度大於實體 2 倍，如鎚子線）」，說明低檔有人不惜代價大手筆護盤，常是短線止跌甚至 V 轉反彈的先兆！
                      </p>
                    </div>
                  </div>
                )}

                {klinePartHighlight === 'open' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      價格解構：開盤價 (Open Price)
                    </span>
                    <h4 className="text-lg font-bold text-white">09:00 第一筆成交價・昨夜市場情緒的直接體現</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      開盤價直接反映了昨夜美股費半或那斯達克走勢、台積電 ADR 漲跌，以及早盤市場的第一波心理預期。
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-300 space-y-1">
                      <span className="font-bold block">💡 新手看盤心法：</span>
                      <p className="text-slate-300 leading-relaxed">
                        「開盤高不代表會收高」！許多散戶常在開盤 09:00~09:15 急著追高（開盤衝高往往是隔日沖主力製造出來誘騙散戶的假象），高手通常會等待 09:30 以後走勢沉澱才做出決定。
                      </p>
                    </div>
                  </div>
                )}

                {klinePartHighlight === 'close' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      價格解構：收盤價 (Close Price)
                    </span>
                    <h4 className="text-lg font-bold text-white">13:30 終場結算價・全天最重要、最具法律效力的真正勝負價</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      盤中所有價格跳動都只是「過眼雲煙」，只有 13:30 的收盤價，才是所有法人、主力、投信基金與交易所最終承認的結算基準！
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-rose-300 space-y-1">
                      <span className="font-bold block">⚡ 鐵律：</span>
                      <p className="text-slate-300 leading-relaxed">
                        所有均線（5MA、20MA、60MA）與指標（KD、RSI、MACD）的計算，<strong>一律以收盤價為準</strong>！是否站穩月線、是否跌破頸線，不到最後一盤搓合結束，都不算真正確定！
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3 Golden Steps of K-Line Reading */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
              高手看 K 線的三步關鍵口訣
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {KLINE_ANATOMY_GUIDE.threeGoldenRules.map((r, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 block">
                    {r.step}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {r.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Volume-Price Strategy (量價關係戰法) */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 text-indigo-400 mr-2" />
                  成交量是 K 線的靈魂：四大「量價配合」實戰絕殺戰法
                </h3>
                <span className="text-xs text-slate-400">只看 K 線不看量等於瞎子摸象！成交量是真金白銀投票出來的真實意願</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KLINE_VOLUME_COMBINATIONS.map((c, i) => (
                <div key={i} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {c.signal}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                      <strong>形態描述：</strong>{c.pattern}
                    </p>

                    <div className="text-xs text-amber-300 font-medium">
                      🎯 <strong>研判核心：</strong>{c.verdict}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    <strong>實戰操作策略：</strong>{c.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBSECTION 2: Institutional Investors (外資/投信/自營商/八大官股)
      ======================================================== */}
      {subSection === 'institutional' && (
        <div className="space-y-8">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <Users className="w-5 h-5" />
              <span>台股獨步全球的籌碼生態：什麼是「三大法人」？誰在真正操縱股票漲跌？</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              在台灣股市，三大法人（外資、投信、自營商）與主力大戶掌控了超過 70% 的每日成交金額！散戶想要在股市獲利，最聰明的方法不是去對抗大鯨魚，而是<strong>看穿他們的資金意圖，搭上他們的順風順水順風車（跟轎）</strong>！
            </p>
          </div>

          {/* Institutional Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
            {INSTITUTIONAL_INVESTORS_PLAYBOOK.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedInstitutionalId(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${
                  selectedInstitutionalId === item.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{item.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({item.name.split(' ')[1] || ''})</span>
              </button>
            ))}
          </div>

          {/* Active Institutional Detail Showcase */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeInstitutional.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeInstitutional.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                市場影響力比重：{activeInstitutional.shareRatio}
              </span>
            </div>

            {/* Basic Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                <span className="font-bold text-slate-400 block font-mono">💰 資金來源是誰的錢？</span>
                <p className="text-slate-200 leading-relaxed">{activeInstitutional.capitalSource}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
                <span className="font-bold text-slate-400 block font-mono">🎯 最喜歡買什麼股票？</span>
                <p className="text-slate-200 leading-relaxed">{activeInstitutional.targetPreference}</p>
              </div>
            </div>

            {/* Impact Mechanisms */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-400 mr-2" />
                會造成什麼具體影響？（運作機制與避坑指南）
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeInstitutional.impactMechanisms.map((mech, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <span className="font-bold text-indigo-300 text-sm block">
                      {idx + 1}. {mech.title}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {mech.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Rule */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                <strong>散戶實戰跟轎心法：</strong>{activeInstitutional.goldenRule}
              </span>
            </div>
          </div>

          {/* Chips Winning Formulas */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
              <Award className="w-5 h-5 text-emerald-400 mr-2" />
              跟著聰明錢（法人大戶）賺錢的 3 大高勝率打擊公式
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHIPS_FOLLOWING_FORMULAS.map((formula, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-400 font-mono block">
                      {formula.title}
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                      {formula.conditions.map((c, i) => (
                        <div key={i} className="flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 text-[11px] text-amber-300">
                    ⚡ <strong>預期戰果：</strong>{formula.targetResult}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBSECTION 3: Interactive Chart Simulator & Order Book
      ======================================================== */}
      {subSection === 'chart-sim' && (
        <div className="space-y-8">
          {/* Stock Scenario Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-300 font-bold px-2">切換教學實例：</span>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_STOCKS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStockId(s.id);
                    setHoveredCandle(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedStockId === s.id
                      ? 'bg-rose-500 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {s.name} ({s.code})
                </button>
              ))}
            </div>
          </div>

          {/* Interactive K-Line Canvas & Analysis */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
            {/* Chart Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold text-white flex items-center">
                  <span>{activeStock.name} ({activeStock.code})</span>
                  <span className={`ml-2 text-sm font-mono font-bold ${
                    activeStock.change >= 0 ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    ${activeStock.currentPrice} ({activeStock.change >= 0 ? '+' : ''}{activeStock.changePercent}%)
                  </span>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                  {activeStock.technicalStatus}
                </span>
              </div>

              {/* Toggle buttons for MAs & Volume */}
              <div className="flex items-center space-x-2 text-xs">
                <button
                  onClick={() => setShowMA5(!showMA5)}
                  className={`px-2.5 py-1 rounded-md font-mono font-semibold transition border ${
                    showMA5
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  5MA (週線)
                </button>
                <button
                  onClick={() => setShowMA20(!showMA20)}
                  className={`px-2.5 py-1 rounded-md font-mono font-semibold transition border ${
                    showMA20
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  20MA (月線/多空)
                </button>
                <button
                  onClick={() => setShowMA60(!showMA60)}
                  className={`px-2.5 py-1 rounded-md font-mono font-semibold transition border ${
                    showMA60
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  60MA (季線/生命線)
                </button>
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className={`px-2.5 py-1 rounded-md font-mono font-semibold transition border ${
                    showVolume
                      ? 'bg-slate-700 text-slate-200 border-slate-600'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  成交量
                </button>
              </div>
            </div>

            {/* The SVG Candlestick Chart */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-xl p-3 select-none overflow-hidden border border-slate-800/80">
              <svg className="w-full h-full" viewBox="0 0 800 320" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                  const y = 20 + ratio * 200;
                  const val = Math.round(maxPrice - ratio * priceRange);
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2="780" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                      <text x="35" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Render MA Lines */}
                {['ma5', 'ma20', 'ma60'].map((maKey) => {
                  if (maKey === 'ma5' && !showMA5) return null;
                  if (maKey === 'ma20' && !showMA20) return null;
                  if (maKey === 'ma60' && !showMA60) return null;

                  const color = maKey === 'ma5' ? '#f59e0b' : maKey === 'ma20' ? '#c084fc' : '#22d3ee';
                  const points = candles.map((c, i) => {
                    const x = 70 + (i * 700) / (candles.length - 1);
                    const y = 20 + ((maxPrice - c[maKey]) / priceRange) * 200;
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <polyline
                      key={maKey}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      points={points}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Render Candlesticks */}
                {candles.map((candle, index) => {
                  const x = 70 + (index * 700) / (candles.length - 1);
                  const isUp = candle.close >= candle.open;
                  const candleColor = isUp ? '#ef4444' : '#10b981';

                  const yHigh = 20 + ((maxPrice - candle.high) / priceRange) * 200;
                  const yLow = 20 + ((maxPrice - candle.low) / priceRange) * 200;
                  const yOpen = 20 + ((maxPrice - candle.open) / priceRange) * 200;
                  const yClose = 20 + ((maxPrice - candle.close) / priceRange) * 200;

                  const bodyTop = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(Math.abs(yClose - yOpen), 3);

                  const volHeight = showVolume ? (candle.volume / maxVolume) * 60 : 0;
                  const volY = 300 - volHeight;

                  return (
                    <g
                      key={index}
                      className="cursor-pointer transition-opacity hover:opacity-80"
                      onMouseEnter={() => setHoveredCandle(candle)}
                    >
                      <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={candleColor} strokeWidth="1.5" />
                      <rect
                        x={x - 14}
                        y={bodyTop}
                        width="28"
                        height={bodyHeight}
                        fill={isUp ? '#ef4444' : '#10b981'}
                        rx="1"
                      />
                      {showVolume && (
                        <rect
                          x={x - 10}
                          y={volY}
                          width="20"
                          height={volHeight}
                          fill={isUp ? '#ef444466' : '#10b98166'}
                          stroke={isUp ? '#ef4444' : '#10b981'}
                          strokeWidth="1"
                          rx="1"
                        />
                      )}
                      <text x={x} y="315" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        {candle.date}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip overlay */}
              {hoveredCandle && (
                <div className="absolute top-4 right-4 bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1 font-mono pointer-events-none">
                  <div className="text-white font-bold border-b border-slate-700 pb-1">
                    日期：{hoveredCandle.date}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 pt-1 text-slate-300">
                    <span>開盤：${hoveredCandle.open}</span>
                    <span>收盤：${hoveredCandle.close}</span>
                    <span>最高：${hoveredCandle.high}</span>
                    <span>最低：${hoveredCandle.low}</span>
                    <span className="col-span-2 text-slate-400 pt-1">
                      成交量：{hoveredCandle.volume.toLocaleString()} 張
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Moving Average Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-amber-400 font-medium">
                  <span className="w-2.5 h-1 bg-amber-400 mr-1.5 rounded"></span> 5MA (週線)
                </span>
                <span className="flex items-center text-purple-400 font-medium">
                  <span className="w-2.5 h-1 bg-purple-400 mr-1.5 rounded"></span> 20MA (月線)：波段多空分水嶺
                </span>
                <span className="flex items-center text-cyan-400 font-medium">
                  <span className="w-2.5 h-1 bg-cyan-400 mr-1.5 rounded"></span> 60MA (季線)：中長線多空生命線
                </span>
              </div>

              <div className="text-slate-400">
                💡 <strong>多頭排列鐵律：</strong>當 5MA &gt; 20MA &gt; 60MA 且均線全部向上發散，代表行情強勢，拉回都是買點！
              </div>
            </div>
          </div>

          {/* SECTION 2: Order Book Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">五檔報價 (Order Book) 與內外盤實戰模擬</h3>
                    <p className="text-xs text-slate-400">買一到買五、賣一到賣五排隊機制與大單心理學</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
                {orderBook.simAlert}
              </div>

              {/* Order Book Table */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Bids */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-800 pb-1.5">
                    <span>買盤掛單 (張數)</span>
                    <span>買價 (Bid)</span>
                  </div>
                  {orderBook.bids.map((b, idx) => (
                    <div key={idx} className="relative flex justify-between items-center py-1 px-1.5 rounded overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-rose-500/15 pointer-events-none"
                        style={{ width: `${b.percent}%` }}
                      />
                      <span className="relative z-10 text-slate-300 font-semibold">{b.volume} 張</span>
                      <span className="relative z-10 text-rose-400 font-bold">${b.price}</span>
                    </div>
                  ))}
                </div>

                {/* Asks */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-800 pb-1.5">
                    <span>賣價 (Ask)</span>
                    <span>賣盤掛單 (張數)</span>
                  </div>
                  {orderBook.asks.map((a, idx) => (
                    <div key={idx} className="relative flex justify-between items-center py-1 px-1.5 rounded overflow-hidden">
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none"
                        style={{ width: `${a.percent}%` }}
                      />
                      <span className="relative z-10 text-emerald-400 font-bold">${a.price}</span>
                      <span className="relative z-10 text-slate-300 font-semibold">{a.volume} 張</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outer / Inner Ratio Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-rose-400">外盤 (主動敲買單): {orderBook.outerRatio}%</span>
                  <span className="text-emerald-400">內盤 (主動砍賣單): {orderBook.innerRatio}%</span>
                </div>
                <div className="w-full h-3 bg-emerald-600 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-rose-600 transition-all duration-300"
                    style={{ width: `${orderBook.outerRatio}%` }}
                  />
                </div>
              </div>

              {/* Simulation Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                <button
                  onClick={handleSimulateBuy}
                  className="py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition text-center"
                >
                  模擬：買盤敲外盤 (+強攻)
                </button>
                <button
                  onClick={handleSimulateSell}
                  className="py-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition text-center"
                >
                  模擬：賣盤砍內盤 (-下殺)
                </button>
                <button
                  onClick={handleSimulateTrap}
                  className="py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition text-center"
                >
                  模擬：主力假大單誘多陷阱
                </button>
              </div>
            </div>

            {/* Five-tier Guide Breakdown */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center">
                  <Info className="w-4 h-4 text-indigo-400 mr-2" />
                  如何一眼看穿五檔與內外盤玄機？
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                    <span className="font-bold text-rose-400">🔴 什麼是「外盤」？(買方主動追價)</span>
                    <p className="text-xs text-slate-400">
                      買方不等著在低檔排隊，而是<strong>主動用賣方開出的價格（賣一價）直接買進</strong>。外盤佔比大於 60% 代表市場搶購意願強，短線容易上漲！
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                    <span className="font-bold text-emerald-400">🟢 什麼是「內盤」？(賣方主動砍單)</span>
                    <p className="text-xs text-slate-400">
                      持股者想急著套現，<strong>主動用買方掛出的價格（買一價）直接拋售</strong>。內盤佔比大於 60% 代表賣壓沉重，短線容易續跌！
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                    <span className="font-bold text-amber-400">⚠️ 主力掛單三步詐術 (防被割韭菜)</span>
                    <p className="text-xs text-slate-400">
                      <strong>1. 假委買護盤：</strong>在買二、買三掛千張大單，讓散戶誤以為有大咖撐盤，其實隨時可能在 1 秒內抽單。<br />
                      <strong>2. 壓盤進貨：</strong>故意在賣一掛出幾百張假大單擋住股價，迫使沒耐心的散戶低賣，主力暗中用內盤偷偷吃貨！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUBSECTION 4: Classic K-Line Patterns Encyclopedia
      ======================================================== */}
      {subSection === 'patterns' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">常見經典 K 線型態圖解百科（單棒與組合形態）</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patterns.map((p, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${p.bg} space-y-3 flex flex-col justify-between shadow-lg`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-base">{p.name}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${p.color} bg-slate-900/80`}>
                      {p.bias}
                    </span>
                  </div>

                  {/* Visual SVG Candlestick Graphic */}
                  <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800/80 overflow-hidden flex items-center justify-center shadow-inner">
                    {renderPatternDiagram(p.id)}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
