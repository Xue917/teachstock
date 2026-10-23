import React, { useState } from 'react';
import { 
  TrendingUp, Activity, CheckCircle2, AlertTriangle, ArrowUpRight, 
  Layers, BarChart2, Zap, ShieldCheck, HelpCircle, Compass
} from 'lucide-react';
import { 
  SURGE_PATTERNS, 
  VOLUME_PRICE_RULES, 
  TRIPLE_CONFLUENCE_CHECKLIST 
} from '../data/surgePatternsData';

export default function SurgePredictor() {
  const [selectedPatternId, setSelectedPatternId] = useState('ma-convergence');
  const [activeSubTab, setActiveSubTab] = useState('patterns'); // 'patterns', 'volume-rules', 'confluence'

  const activePattern = SURGE_PATTERNS.find(p => p.id === selectedPatternId) || SURGE_PATTERNS[0];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] sm:text-xs font-bold text-rose-400 uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              Technical Surge Predictor
            </span>
            <span className="text-slate-400 text-xs">起漲信號圖鑑</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
            股票會不會漲？技術面起漲訊號與形態全圖鑑
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">
            告別盲目追高！用三線合一、W 底右腳抬高、破底翻與量價九大法則，精準鎖定主力發動起漲點。
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex overflow-x-auto items-center gap-1.5 bg-slate-900 p-1 sm:p-1.5 rounded-xl border border-slate-800 scrollbar-none">
          {[
            { id: 'patterns', label: '📈 六大必漲經典形態', short: '起漲形態' },
            { id: 'volume-rules', label: '📊 量價配合五大密碼', short: '量價密碼' },
            { id: 'confluence', label: '🎯 技術指標四重共振', short: '指標共振' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id)}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition touch-manipulation min-h-[38px] ${
                activeSubTab === t.id
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Six Major Surge Patterns with SVG Diagrams */}
      {activeSubTab === 'patterns' && (
        <div className="space-y-6">
          {/* Pattern Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SURGE_PATTERNS.map((p) => {
              const isSelected = selectedPatternId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatternId(p.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg ring-1 ring-rose-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs truncate block">{p.name.split('：')[1]}</span>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-mono text-rose-300 font-semibold">{p.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pattern Card with Visual Diagram & Trading SOP */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-2xl font-bold text-white">{activePattern.name}</h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {activePattern.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {activePattern.summary}
                </p>
              </div>
            </div>

            {/* Visual SVG Diagram Canvas */}
            <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-2xl border border-slate-800/80 p-4 overflow-hidden select-none">
              {/* Convergence Diagram */}
              {activePattern.diagramType === 'convergence' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Grid */}
                  <line x1="20" y1="50" x2="580" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="110" x2="580" y2="110" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="20" y1="170" x2="580" y2="170" stroke="#1e293b" strokeDasharray="3 3" />

                  {/* 3 Converging MAs */}
                  {/* 5MA (Yellow) */}
                  <path d="M 40,125 Q 150,115 300,120 T 420,118 Q 480,70 560,40" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  {/* 20MA (Purple) */}
                  <path d="M 40,105 Q 150,125 300,120 T 420,120 Q 480,85 560,55" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                  {/* 60MA (Cyan) */}
                  <path d="M 40,140 Q 150,110 300,120 T 420,122 Q 480,100 560,75" fill="none" stroke="#22d3ee" strokeWidth="2.5" />

                  {/* Consolidation zone shading */}
                  <rect x="180" y="90" width="220" height="60" fill="#3b82f610" rx="8" stroke="#3b82f640" strokeDasharray="2 2" />
                  <text x="290" y="80" fill="#93c5fd" fontSize="11" textAnchor="middle" fontFamily="sans-serif">均線黏合糾結區 (1~3個月籌碼沉澱)</text>

                  {/* Breakout Red Candlestick */}
                  <rect x="420" y="60" width="20" height="90" fill="#ef4444" rx="2" />
                  <line x1="430" y1="45" x2="430" y2="165" stroke="#ef4444" strokeWidth="2" />

                  {/* Entry arrow */}
                  <circle cx="430" cy="50" r="4" fill="#fbbf24" />
                  <line x1="430" y1="50" x2="460" y2="25" stroke="#fbbf24" strokeWidth="2" />
                  <text x="470" y="25" fill="#fbbf24" fontSize="12" fontWeight="bold">🎯 黃金起漲買點</text>

                  {/* Volume Bars at bottom */}
                  <rect x="100" y="195" width="10" height="15" fill="#64748b55" />
                  <rect x="180" y="198" width="10" height="12" fill="#64748b55" />
                  <rect x="250" y="200" width="10" height="10" fill="#64748b55" />
                  <rect x="330" y="202" width="10" height="8" fill="#64748b55" />
                  <text x="330" y="188" fill="#64748b" fontSize="10" textAnchor="middle">窒息量</text>
                  {/* Giant Breakout Volume */}
                  <rect x="420" y="170" width="20" height="40" fill="#ef4444" />
                  <text x="430" y="165" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">2倍巨量！</text>
                </svg>
              )}

              {/* W-Bottom Diagram */}
              {activePattern.diagramType === 'w-bottom' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Neckline */}
                  <line x1="60" y1="90" x2="550" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="560" y="93" fill="#f59e0b" fontSize="12" fontWeight="bold">頸線 (Neckline)</text>

                  {/* W Price curve */}
                  {/* Down -> Left Foot (170) -> Middle Peak (90) -> Right Foot (150 Higher Low) -> Breakout (40) */}
                  <path
                    d="M 60,40 L 160,170 L 260,90 L 370,145 L 470,60 L 530,30"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Left Foot Dot */}
                  <circle cx="160" cy="170" r="5" fill="#64748b" />
                  <text x="160" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">左腳 (第一低點)</text>

                  {/* Right Foot Dot */}
                  <circle cx="370" cy="145" r="5" fill="#10b981" />
                  <text x="370" y="170" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">右腳抬高 (底底高！)</text>

                  {/* Breakout point */}
                  <circle cx="440" cy="90" r="6" fill="#fbbf24" />
                  <text x="450" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold">🎯 突破頸線買點</text>

                  {/* Target Distance indicator */}
                  <line x1="260" y1="90" x2="260" y2="170" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="270" y="135" fill="#38bdf8" fontSize="11">高度 H</text>
                  <line x1="470" y1="90" x2="470" y2="10" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="480" y="50" fill="#38bdf8" fontSize="11">等距目標 +H</text>
                </svg>
              )}

              {/* Head and Shoulders Bottom Diagram */}
              {activePattern.diagramType === 'head-shoulders' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Neckline */}
                  <line x1="50" y1="80" x2="540" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="545" y="83" fill="#f59e0b" fontSize="11" fontWeight="bold">頸線</text>

                  {/* Path */}
                  <path
                    d="M 50,40 L 130,130 L 200,80 L 290,185 L 380,80 L 450,120 L 520,50"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Left Shoulder */}
                  <circle cx="130" cy="130" r="4" fill="#94a3b8" />
                  <text x="130" y="150" fill="#94a3b8" fontSize="11" textAnchor="middle">左肩</text>

                  {/* Head */}
                  <circle cx="290" cy="185" r="5" fill="#f43f5e" />
                  <text x="290" y="205" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">頭部 (最低點)</text>

                  {/* Right Shoulder */}
                  <circle cx="450" cy="120" r="5" fill="#10b981" />
                  <text x="450" y="145" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">右肩 (量縮打底)</text>

                  {/* Breakout point */}
                  <circle cx="495" cy="80" r="6" fill="#fbbf24" />
                  <text x="500" y="105" fill="#fbbf24" fontSize="11" fontWeight="bold">🎯 放量突破點</text>
                </svg>
              )}

              {/* Ascending Triangle Diagram */}
              {activePattern.diagramType === 'triangle' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Horizontal Resistance Line */}
                  <line x1="80" y1="70" x2="520" y2="70" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="40" y="74" fill="#f43f5e" fontSize="11" fontWeight="bold">水平壓力線</text>

                  {/* Sloping Support Line */}
                  <line x1="80" y1="180" x2="480" y2="70" stroke="#10b981" strokeWidth="2.5" />
                  <text x="130" y="200" fill="#10b981" fontSize="11" fontWeight="bold">上升趨勢線 (低點持續墊高)</text>

                  {/* Price bounces inside */}
                  <path
                    d="M 90,170 L 170,70 L 230,145 L 300,70 L 360,115 L 430,70 L 490,25"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Breakout */}
                  <circle cx="430" cy="70" r="6" fill="#fbbf24" />
                  <text x="440" y="55" fill="#fbbf24" fontSize="12" fontWeight="bold">🚀 火箭噴發突破！</text>
                </svg>
              )}

              {/* Wyckoff Spring Diagram */}
              {activePattern.diagramType === 'spring' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Box upper and lower bounds */}
                  <line x1="50" y1="70" x2="550" y2="70" stroke="#64748b" strokeDasharray="3 3" />
                  <text x="555" y="74" fill="#64748b" fontSize="10">箱型上軌</text>
                  <line x1="50" y1="140" x2="550" y2="140" stroke="#f59e0b" strokeWidth="2" />
                  <text x="555" y="144" fill="#f59e0b" fontSize="11" fontWeight="bold">箱型支撐線</text>

                  {/* Price oscillating in box */}
                  <path
                    d="M 60,90 L 120,135 L 180,80 L 250,135 L 320,175 L 360,110 L 440,70 L 520,30"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* The Spring drop */}
                  <circle cx="320" cy="175" r="5" fill="#f43f5e" />
                  <text x="320" y="200" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">🚨 假跌破誘空 (Spring 彈簧)</text>

                  {/* The Recover Dot */}
                  <circle cx="345" cy="140" r="6" fill="#10b981" />
                  <text x="360" y="155" fill="#10b981" fontSize="12" fontWeight="bold">🎯 破底翻收復！立刻買進！</text>
                </svg>
              )}

              {/* Breakaway Gap Diagram */}
              {activePattern.diagramType === 'gap' && (
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Consolidation Box */}
                  <rect x="50" y="110" width="220" height="70" fill="#1e293b55" stroke="#475569" strokeDasharray="3 3" rx="4" />
                  <text x="160" y="100" fill="#94a3b8" fontSize="11" textAnchor="middle">長時間平台盤整區</text>

                  {/* Price inside box */}
                  <path d="M 60,150 L 100,125 L 140,165 L 180,120 L 220,155 L 260,125" fill="none" stroke="#94a3b8" strokeWidth="2.5" />

                  {/* Dotted Gap Zone */}
                  <rect x="290" y="70" width="70" height="40" fill="#fbbf2415" stroke="#fbbf24" strokeDasharray="3 3" rx="4" />
                  <text x="325" y="93" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">突破跳空缺口</text>

                  {/* Giant Red Candle jumping over */}
                  <rect x="380" y="40" width="22" height="65" fill="#ef4444" rx="2" />
                  <line x1="391" y1="25" x2="391" y2="120" stroke="#ef4444" strokeWidth="2" />

                  {/* Next candles continuing up */}
                  <rect x="420" y="30" width="18" height="45" fill="#ef4444" rx="2" />
                  <rect x="455" y="15" width="18" height="50" fill="#ef4444" rx="2" />
                  <text x="440" y="130" fill="#10b981" fontSize="11" fontWeight="bold">三天內完全不回補 ➔ 主升段爆發！</text>
                </svg>
              )}
            </div>

            {/* Trading Checklist & SOP for this pattern */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-sky-400 block flex items-center">
                  <Compass className="w-4 h-4 mr-1.5" /> 形態三大特徵識別：
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {activePattern.characteristics.map((char, i) => (
                    <div key={i} className="flex items-start space-x-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> 實戰進出場操作：
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <p><strong>買進點：</strong>{activePattern.buyAction.entry}</p>
                  <p><strong>停損點：</strong><span className="text-rose-400 font-bold">{activePattern.buyAction.stopLoss}</span></p>
                  <p><strong>目標價：</strong>{activePattern.buyAction.target}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 block flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1.5" /> 避坑與失敗警報：
                  </span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activePattern.trapWarning}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  🏛️ <strong>台股真實範例：</strong>{activePattern.realCase}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Volume-Price Rules */}
      {activeSubTab === 'volume-rules' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
              <BarChart2 className="w-5 h-5" />
              <span>「量先價行」：成交量是真實資金動能，股價只是成交結果！</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              主力可以做假線騙線，但「成交量」是真金白銀砸出來的，絕對做不了假！掌握量價關係五大密碼，一眼識破主力是在吃貨還是倒貨：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VOLUME_PRICE_RULES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition shadow-xl"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">{item.rule}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                    item.meaning.includes('多頭') || item.meaning.includes('起漲') ? 'bg-emerald-500/20 text-emerald-400' :
                    item.meaning.includes('洗盤') ? 'bg-sky-500/20 text-sky-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {item.meaning}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Triple Confluence Checklist */}
      {activeSubTab === 'confluence' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>技術指標多頭共振法則：同時滿足四大條件，勝率高達 80%！</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              單看單一指標容易被雜訊誤導。當均線、MACD、KD、成交量「四位一體」同時發出多頭訊號，就是全市場資金一致推升的起漲奇蹟時刻：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRIPLE_CONFLUENCE_CHECKLIST.map((item) => (
              <div
                key={item.num}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition shadow-xl"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold font-mono text-xs flex items-center justify-center">
                    0{item.num}
                  </span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-200">
                  🎯 <strong>必備條件：</strong>{item.condition}
                </div>

                <p className="text-xs text-emerald-300/90 leading-relaxed">
                  💡 <strong>威力解讀：</strong>{item.weight}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
