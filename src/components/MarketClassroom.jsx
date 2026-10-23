import React, { useState } from 'react';
import { 
  LineChart, Eye, TrendingUp, AlertTriangle, Layers, Info, Check, 
  HelpCircle, BarChart3, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { PRESET_STOCKS } from '../data/stockData';

export default function MarketClassroom() {
  const [selectedStockId, setSelectedStockId] = useState('2330');
  const [showMA5, setShowMA5] = useState(true);
  const [showMA20, setShowMA20] = useState(true);
  const [showMA60, setShowMA60] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showKD, setShowKD] = useState(false);
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

  // Patterns for encyclopedia
  const patterns = [
    {
      name: '大紅K棒 (長紅)',
      bias: '強烈偏多',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '開盤後買盤一路推升至最高點或接近最高點收盤。實體長、上下影線極短，代表多方全面掌握絕對主導權。'
    },
    {
      name: '大黑K棒 (長綠)',
      bias: '強烈偏空',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      desc: '開盤後賣壓湧出，一路下殺至最低點收盤。代表市場空方力量極度沉重，常伴隨恐慌拋售或主力倒貨。'
    },
    {
      name: '長下影線 (鎚子線)',
      bias: '低檔支撐轉多',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      desc: '盤中曾大幅下跌，但在收盤前有強力買盤湧入將價格拉回。影線長度為實體 2 倍以上，代表低檔有主力強烈護盤意願。'
    },
    {
      name: '長上影線 (避雷針)',
      bias: '高檔遇壓轉空',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      desc: '早盤曾大幅衝高，隨後引來沉重獲利了結或主力出貨賣壓，收盤大幅回落。常是短線見頂的危險信號。'
    },
    {
      name: '十字星 (十字線)',
      bias: '多空均勢變盤點',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      desc: '開盤價與收盤價幾乎相同，上下皆有影線。代表多空雙方廝殺激烈未分勝負，出現在波段高檔或低檔常預示即將「變盤」！'
    },
    {
      name: '早晨之星 (晨星)',
      bias: '底部反轉形態',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      desc: '由「長黑K + 跳空小星線 + 吞噬長紅K」組成。連續三日形成黃金底部反轉，是波段止跌買進的經典勝率信號。'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              Interactive Classroom
            </span>
            <span className="text-slate-400 text-xs">實戰看盤不求人</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            台股看盤實戰圖解教室
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            親手操作 K 線走勢、均線多空排列、成交量，並解碼五檔委託買賣單與主力騙線陷阱。
          </p>
        </div>

        {/* Stock Scenario Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium px-2">切換教學實例：</span>
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

      {/* SECTION 1: Interactive K-Line Canvas & Analysis */}
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
              const candleColor = isUp ? '#ef4444' : '#10b981'; // 台股：紅漲綠跌

              const yHigh = 20 + ((maxPrice - candle.high) / priceRange) * 200;
              const yLow = 20 + ((maxPrice - candle.low) / priceRange) * 200;
              const yOpen = 20 + ((maxPrice - candle.open) / priceRange) * 200;
              const yClose = 20 + ((maxPrice - candle.close) / priceRange) * 200;

              const bodyTop = Math.min(yOpen, yClose);
              const bodyHeight = Math.max(Math.abs(yClose - yOpen), 3);

              // Volume bar calculations (bottom 70px)
              const volHeight = showVolume ? (candle.volume / maxVolume) * 60 : 0;
              const volY = 300 - volHeight;

              return (
                <g
                  key={index}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onMouseEnter={() => setHoveredCandle(candle)}
                >
                  {/* High - Low shadow line */}
                  <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={candleColor} strokeWidth="1.5" />

                  {/* Body rectangle */}
                  <rect
                    x={x - 14}
                    y={bodyTop}
                    width="28"
                    height={bodyHeight}
                    fill={isUp ? '#ef4444' : '#10b981'}
                    rx="1"
                  />

                  {/* Volume Bar */}
                  {showVolume && (
                    <rect
                      x={x - 10}
                      y={volY}
                      width="20"
                      height={volHeight}
                      fill={isUp ? '#ef444455' : '#10b98155'}
                      stroke={candleColor}
                      strokeWidth="0.8"
                    />
                  )}

                  {/* Date label at bottom */}
                  <text x={x} y="315" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    {candle.date}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Real-time Hover Tooltip info */}
          <div className="absolute top-3 left-4 p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm text-xs font-mono space-y-1 z-10 pointer-events-none">
            {hoveredCandle ? (
              <div>
                <div className="text-white font-bold flex items-center space-x-2">
                  <span>📅 日期：{hoveredCandle.date}</span>
                  <span className={hoveredCandle.close >= hoveredCandle.open ? 'text-rose-400' : 'text-emerald-400'}>
                    {hoveredCandle.close >= hoveredCandle.open ? '▲ 上漲' : '▼ 下跌'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-slate-300 mt-1">
                  <span>開盤：{hoveredCandle.open}</span>
                  <span>收盤：{hoveredCandle.close}</span>
                  <span>最高：{hoveredCandle.high}</span>
                  <span>最低：{hoveredCandle.low}</span>
                  <span>成交量：{hoveredCandle.volume.toLocaleString()} 張</span>
                </div>
              </div>
            ) : (
              <span className="text-slate-400 flex items-center">
                <Info className="w-3.5 h-3.5 mr-1 text-slate-500" />
                將鼠標懸停在任一 K 線棒上可查看盤中價量明細
              </span>
            )}
          </div>
        </div>

        {/* Legend of Moving Averages & Beginner Guide */}
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center text-amber-400 font-medium">
              <span className="w-2.5 h-1 bg-amber-400 mr-1.5 rounded"></span> 5MA (週線)：極短線強弱指標
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

      {/* SECTION 2: Order Book (五檔買賣盤與內外盤) Interactive Simulator */}
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

          {/* Alert Box from user interaction */}
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
            {orderBook.simAlert}
          </div>

          {/* Order Book Table */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {/* Bids Column (買進排隊) */}
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

            {/* Asks Column (賣出排隊) */}
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

          {/* Interactive Simulation Action Buttons */}
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

      {/* SECTION 3: K-Line Pattern Encyclopedia */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">常見經典 K 線型態圖解百科</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patterns.map((p, i) => (
            <div key={i} className={`p-4 rounded-xl border ${p.bg} space-y-2`}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-base">{p.name}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${p.color} bg-slate-900/80`}>
                  {p.bias}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
