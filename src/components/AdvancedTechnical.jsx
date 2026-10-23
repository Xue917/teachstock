import React, { useState } from 'react';
import { 
  Zap, TrendingUp, BookOpen, Award, Calculator, Search, 
  AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, BarChart2,
  Sliders, Activity, Flame, ChevronRight, Layers, Sparkles
} from 'lucide-react';
import { 
  TECHNICAL_GLOSSARY, 
  ADVANCED_TECHNICAL_STRATEGIES, 
  DAY_TRADING_TACTICS, 
  ROADMAP_TO_ONE_MILLION 
} from '../data/advancedTechnicalData';

export default function AdvancedTechnical() {
  const [subTab, setSubTab] = useState('day-trading'); // 'day-trading', 'advanced-ta', 'glossary', 'roadmap', 'expectancy'

  // Glossary filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // Expectancy Calculator State
  const [winRate, setWinRate] = useState(45); // 45%
  const [avgWinPct, setAvgWinPct] = useState(15); // 平均賺 15%
  const [avgLossPct, setAvgLossPct] = useState(5); // 平均賠 5% (停損)
  const [totalTrades, setTotalTrades] = useState(40); // 40 次交易
  const [tradeCapital, setTradeCapital] = useState(100000); // 每次動用本金 10 萬

  // Expectancy calculations
  const winFraction = winRate / 100;
  const lossFraction = (100 - winRate) / 100;
  const profitLossRatio = avgLossPct > 0 ? (avgWinPct / avgLossPct).toFixed(2) : 0;
  // Mathematical Expectancy % per trade
  const expectancyPct = (winFraction * avgWinPct - lossFraction * avgLossPct).toFixed(2);
  const expectedProfitPerTrade = Math.round(tradeCapital * (expectancyPct / 100));
  const totalExpectedProfit = Math.round(expectedProfitPerTrade * totalTrades);

  // Filter glossary
  const categories = ['全部', '交易撮合', '籌碼名詞', '技術名詞', '當沖實戰'];
  const filteredGlossary = TECHNICAL_GLOSSARY.filter((item) => {
    const matchCat = selectedCategory === '全部' || item.category === selectedCategory;
    const matchSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.practicalUsage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Pro Trader Masterclass
            </span>
            <span className="text-slate-400 text-xs">新手蛻變高手必修</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            高階技術兵法・當沖絕技與百萬致富藍圖
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            破解均線扣抵、MACD 背離、開盤三法與隔日沖倒貨陷阱，掌握數學期望值滾出人生第一個 100 萬！
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'day-trading', label: '⚡ 當沖實戰絕技' },
            { id: 'advanced-ta', label: '📐 高階技術兵法' },
            { id: 'roadmap', label: '🏆 百萬資產藍圖' },
            { id: 'expectancy', label: '🧮 期望值風控算力' },
            { id: 'glossary', label: '📚 實戰名詞全百科' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                subTab === t.id
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: Day Trading Tactics */}
      {subTab === 'day-trading' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Zap className="w-5 h-5" />
              <span>當沖高手的真實戰場：賺的是波動與紀律，不是賭博！</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              全台灣證交所統計，90% 散戶當沖之所以賠光，是因為「賺了想跑、賠了凹單變存股」。當沖本質是「極限風控與高勝率形態複製」。以下是操盤室傳授的 4 大超短線必殺戰法：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DAY_TRADING_TACTICS.map((tac) => (
              <div
                key={tac.id}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-white">{tac.name}</h3>
                      <span className="text-xs text-amber-400 font-medium">{tac.coreBias}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      ⏰ {tac.timeWindow}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    {tac.rules.map((r, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="text-rose-400 font-bold shrink-0">•</span>
                        <span className="leading-relaxed">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Day Trading 5 Survival Rules */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2" />
              當沖職業操盤手「五大保命鐵律」 (違反任一條立刻被市場消滅)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white">① 13:00 前必須全部平倉</span>
                <p className="text-slate-400 leading-relaxed">
                  絕不在 13:20 之後手忙腳亂撮合，更嚴禁「今天虧損捨不得砍，就留倉變成抱長線存股」！
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-rose-400">② 單筆虧損 1.5% 無條件停損</span>
                <p className="text-slate-400 leading-relaxed">
                  只要股價跌破分時均價線或支撐點，立刻市價砍出，絕不猶豫半秒，不給虧損擴大的機會。
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">③ 嚴防「先賣後買」借券地雷</span>
                <p className="text-slate-400 leading-relaxed">
                  做空當沖若遇到主力強鎖漲停買不回來，將面臨一天高達 7% 的懲罰性借券費與天價賠償！新手絕不做空！
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-white">④ 只做「成交量前 50 大」活躍股</span>
                <p className="text-slate-400 leading-relaxed">
                  流動性就是生命！成交量低於 3000 張的中小型股容易遇到「想賣卻沒有人接盤」的流動性滑價風險。
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">⑤ 當天虧損達總資金 2% 立即關電腦</span>
                <p className="text-slate-400 leading-relaxed">
                  防止「賭徒情緒上頭」不斷盲目下單逆勢翻本。只要當天觸及兩次停損，今天立刻強制停止下單！
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Advanced TA Strategies */}
      {subTab === 'advanced-ta' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <TrendingUp className="w-5 h-5" />
              <span>頂尖高手不外傳的技術分析底層物理學</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              普通人看指標只看金叉死叉，高手看的是背後的「扣抵值拉力」、「能量背離」與「波動度收縮發散」。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADVANCED_TECHNICAL_STRATEGIES.map((strat) => (
              <div
                key={strat.id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white">{strat.title}</h3>
                  <p className="text-xs text-amber-300 font-medium bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                    💡 <strong>核心邏輯：</strong>{strat.coreLogic}
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 pt-1">
                    {strat.steps.map((st, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-300 font-mono">
                  {strat.secretFormula}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Roadmap to 1 Million TWD */}
      {subTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <Award className="w-5 h-5" />
              <span>從 0 到 100 萬的「階梯式翻倍藍圖」 (x 年破百萬全實戰)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              很多人想靠當沖一個月百萬暴富，結果通常一個月賠光破產。真正的金融高手是透過「階段性槓桿與複利滾動」，在 2~3 年內腳踏實地累積到第一個 100 萬：
            </p>
          </div>

          <div className="space-y-5">
            {ROADMAP_TO_ONE_MILLION.map((phase) => (
              <div
                key={phase.phase}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black font-mono text-base flex items-center justify-center shrink-0">
                      0{phase.phase}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{phase.title}</h3>
                      <span className="text-xs text-slate-400">週期：{phase.duration} · 目標：{phase.target}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-emerald-300 border border-slate-700 w-fit">
                    資產配置：{phase.capitalAllocation}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                  <div className="lg:col-span-8 space-y-2">
                    <span className="font-bold text-slate-300 block">📌 本階段核心執行任務：</span>
                    {phase.coreTasks.map((task, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-slate-400 block mb-1">交易風格指引：</span>
                      <span className="text-amber-300 font-semibold">{phase.tradingStyle}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 italic text-[11px] text-slate-400">
                      💬「{phase.milestoneQuote}」
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Expectancy & Risk Calculator */}
      {subTab === 'expectancy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Calculator className="w-5 h-5 text-rose-400 mr-2" />
              操盤手數學期望值試算模型
            </h3>
            <p className="text-xs text-slate-400">
              你不需要 90% 的勝率！只要盈虧比拉開到 3:1，哪怕勝率只有 45%，數學公式將保證你長期獲利翻倍！
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-300 font-semibold">真實勝率 (Win Rate)：{winRate}%</label>
                  <span className="text-slate-400 font-mono">敗率：{100 - winRate}%</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="75"
                  value={winRate}
                  onChange={(e) => setWinRate(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">平均每筆獲利幅度 (%)：</label>
                <input
                  type="number"
                  step="0.5"
                  value={avgWinPct}
                  onChange={(e) => setAvgWinPct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">平均每筆停損幅度 (%)：</label>
                <input
                  type="number"
                  step="0.5"
                  value={avgLossPct}
                  onChange={(e) => setAvgLossPct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">單筆交易動用本金 (元)：</label>
                <input
                  type="number"
                  step="10000"
                  value={tradeCapital}
                  onChange={(e) => setTradeCapital(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">連續交易筆數：{totalTrades} 筆</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={totalTrades}
                  onChange={(e) => setTotalTrades(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">大數法則數學計算結果</h3>

              <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-950 to-emerald-950/40 border border-slate-800 space-y-3">
                <span className="text-xs text-slate-400 block uppercase">
                  {totalTrades} 筆交易累積期望淨利潤 (純賺)
                </span>
                <span className={`text-3xl sm:text-4xl font-black font-mono ${
                  totalExpectedProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {totalExpectedProfit >= 0 ? '+' : ''}${totalExpectedProfit.toLocaleString()} 元
                </span>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block">真實盈虧比 (Profit/Loss Ratio)</span>
                    <span className="text-white font-bold font-mono text-sm">
                      {profitLossRatio} : 1
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">每筆交易平均數學期望值</span>
                    <span className={`font-bold font-mono text-sm ${expectancyPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {expectancyPct >= 0 ? '+' : ''}{expectancyPct}% (每次進場約賺 ${expectedProfitPerTrade.toLocaleString()} 元)
                    </span>
                  </div>
                </div>
              </div>

              {/* Teaching Revelation */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-amber-300 block">🧠 給新手的震撼教育真相：</span>
                <p className="leading-relaxed">
                  看見了嗎？在目前設定下，<strong>勝率只有 {winRate}%（等於你做 10 次有 {Math.round(lossFraction*10)} 次會停損虧損）</strong>，但只要你堅持「賠錢嚴格停損在 {avgLossPct}%、賺錢抱到 {avgWinPct}%」，{totalTrades} 筆交易下來依然能夠淨賺 <strong>${totalExpectedProfit.toLocaleString()} 元</strong>！
                </p>
                <p className="text-slate-400 leading-relaxed">
                  這就是為什麼職業操盤手從不預測明天漲停跌停，他們只專注於<strong>「嚴守停損截斷虧損、讓大贏的利潤奔跑」</strong>！
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              ※ 公式：期望值 = (勝率 × 平均獲利率) - (敗率 × 平均停損率)。盈虧比大於 2.5:1 為專業交易系統標配。
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Glossary Dictionary */}
      {subTab === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === c
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="搜尋術語、機制或黑話..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-white">{item.term}</h3>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        item.level === '當沖命脈' || item.level === '核心風控' ? 'bg-rose-500/20 text-rose-300' :
                        item.level === '高手必修' ? 'bg-amber-500/20 text-amber-300' :
                        item.level === '避雷' ? 'bg-red-500/20 text-red-400' : 'bg-sky-500/20 text-sky-300'
                      }`}>
                        {item.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-emerald-300 leading-relaxed">
                  💡 <strong>實戰用法：</strong>{item.practicalUsage}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
