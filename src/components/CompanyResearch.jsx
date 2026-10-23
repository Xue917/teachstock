import React, { useState } from 'react';
import { 
  Search, ShieldCheck, Flame, Compass, ExternalLink, CheckCircle2, 
  AlertTriangle, Layers, Building2, Wallet, MousePointerClick, CalendarCheck,
  Check, X, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { 
  BUYING_PROCESS_STEPS, 
  COMPANY_RESEARCH_SEVEN_STEPS, 
  CURRENT_TREND_RADAR, 
  FAKE_TREND_LITMUS_TEST, 
  PUBLIC_RESOURCES_DIRECTORY 
} from '../data/researchGuideData';

export default function CompanyResearch() {
  const [subSection, setSubSection] = useState('how-to-buy'); // 'how-to-buy', 'seven-steps', 'trend-radar', 'fake-detector', 'resources'

  // Interactive Litmus Test State for custom checking
  const [checkedRules, setCheckedRules] = useState({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleRule = (num) => {
    setCheckedRules((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const passedCount = Object.values(checkedRules).filter(Boolean).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
              Deep Company Research & Hot Trend Detective
            </span>
            <span className="text-slate-400 text-xs">開源級全維度研究庫</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            新手購股・公司體質研究・最新熱潮偵測
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            從開戶下單買進第一股、手把手拆解公司財報與體質，到一眼辨識是「真題材」還是「主力炒作蹭熱度」。
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'how-to-buy', label: '1. 新手買股完全流程' },
            { id: 'seven-steps', label: '2. 公司研究 7 步法' },
            { id: 'trend-radar', label: '3. 最新風口產業地圖' },
            { id: 'fake-detector', label: '4. 真假熱潮六大照妖鏡' },
            { id: 'resources', label: '5. 免費官方開源工具庫' }
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

      {/* SECTION 1: How to buy first stock */}
      {subSection === 'how-to-buy' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
              <Compass className="w-5 h-5" />
              <span>實體操作指引：完全沒接觸過股票，第一次如何下單？</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              買股票就像在網購，差別只在於你需要專門的證券戶頭與看盤 App。以下是從零開始到成功買入台積電或 0050 零股的 5 大具體環節：
            </p>
          </div>

          <div className="space-y-4">
            {BUYING_PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 font-black font-mono text-sm flex items-center justify-center shrink-0">
                      0{item.step}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 w-fit">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {item.details.map((d, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-sky-400 font-bold">•</span>
                      <span className="leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-amber-300 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed"><strong>新手關鍵眉角：</strong>{item.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: 7 Steps Company Research */}
      {subSection === 'seven-steps' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>手把手 7 步法：如何徹底搞懂一家公司的營運與財務狀態？</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              買股票就是合夥做生意。不要把血汗錢交給自己不了解的公司！透過以下 7 步標準作業程序 (SOP)，從公開免費資訊中找出體質健康、護城河深厚的好公司。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMPANY_RESEARCH_SEVEN_STEPS.map((s) => (
              <div
                key={s.step}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      STEP {s.step} · {s.category}
                    </span>
                    <span className="text-xs text-slate-400 italic">{s.question}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{s.title}</h3>

                  <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    {s.actionCheck.map((check, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>📂 官方/免費查詢途徑：</span>
                  <span className="text-indigo-300 font-mono font-semibold">{s.sourceTool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Current Trend Radar */}
      {subSection === 'trend-radar' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <Flame className="w-5 h-5" />
              <span>當前台股最新主流風口熱潮地圖 (The Latest Big Trends)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              股票要大漲，必須站在產業資金與技術革新的大風口上。以下是當前台股最核心的五大熱潮主升浪與對應的台灣代表性供應鏈龍頭：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CURRENT_TREND_RADAR.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-xl"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <span className="text-xs text-slate-400">{item.theme}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                    {item.heatLevel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {item.description}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-indigo-300 block">
                    🏭 台灣代表性受惠供應鏈：
                  </span>
                  <div className="space-y-1 text-xs text-slate-300 font-mono">
                    {item.taiwanSupplyChain.map((chain, i) => (
                      <div key={i} className="p-2 rounded bg-slate-800/60 border border-slate-700/50">
                        {chain}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-300">
                  💡 <strong>研究部評價：</strong>{item.verdictCriteria}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Fake vs Real Litmus Test */}
      {subSection === 'fake-detector' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>「真熱潮」vs「蹭題材假熱潮」六大照妖鏡檢驗系統</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              每次市場出現新題材（AI、矽光子、低軌衛星、機器人），都會有一大堆毫無營收的小公司發新聞蹭熱度割韭菜。使用這 6 道照妖鏡，一眼識破真假！
            </p>
          </div>

          {/* Interactive Litmus Score Banner */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400">目前互動檢驗純度測試：</span>
              <div className="text-lg font-bold text-white flex items-center space-x-2">
                <span>符合條件數：{passedCount} / 6 項</span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  passedCount >= 5 ? 'bg-emerald-500/20 text-emerald-400' :
                  passedCount >= 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {passedCount >= 5 ? '✅ 頂級真龍頭 (強烈受惠)' :
                   passedCount >= 3 ? '⚠️ 中度受惠 (部分仍處驗證期)' : '🚨 高度疑似蹭題材割韭菜'}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              點擊各項右側開關，即可為你目前觀察中的股票進行照妖鏡體檢
            </span>
          </div>

          {/* Rules List */}
          <div className="space-y-4">
            {FAKE_TREND_LITMUS_TEST.map((rule) => {
              const isChecked = !!checkedRules[rule.number];
              return (
                <div
                  key={rule.number}
                  className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
                        #{rule.number}
                      </span>
                      <h3 className="text-base font-bold text-white">{rule.rule}</h3>
                    </div>

                    <button
                      onClick={() => toggleRule(rule.number)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {isChecked ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>{isChecked ? '符合真受惠' : '未達標準/存疑'}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 font-medium bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    ❓ <strong>檢驗核心問題：</strong>{rule.test}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      {rule.realSignal}
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                      {rule.fakeSignal}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 5: Free Public Open Resources */}
      {subSection === 'resources' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <ExternalLink className="w-5 h-5" />
              <span>全公開・開源與官方權威資料庫完全導航</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              做股票不需要花大錢買軟體！台灣擁有全世界最透明的公開財報與交易所數據庫，善用以下官方與開源社群資源，你掌握的資訊不會輸給任何法人研究員。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PUBLIC_RESOURCES_DIRECTORY.map((res, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-white">{res.name}</h3>
                      <span className="text-xs text-emerald-400 font-medium">{res.org}</span>
                    </div>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 transition"
                    >
                      <span>前往官方</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    {res.role}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 block">📌 新手必看核心功能路徑：</span>
                    {res.keyPages.map((page, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-center space-x-1.5 font-mono">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{page}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
