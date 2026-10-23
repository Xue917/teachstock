import React, { useState } from 'react';
import { 
  Compass, ShieldAlert, Award, Clock, DollarSign, Layers, 
  HelpCircle, ChevronRight, CheckCircle2, AlertOctagon, TrendingUp, Sparkles, AlertTriangle
} from 'lucide-react';

export default function BeginnerGuide({ onJumpToToolbox, onJumpToMarket }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTradeDay, setSelectedTradeDay] = useState('Mon');

  // T+2 simulator calculation
  const tPlusTwoSchedule = {
    Mon: { t: '週一 (T日)', t1: '週二 (T+1日)', t2: '週三 (T+2日 上午 10:00 前扣款)', note: '最常見標準交易週期' },
    Tue: { t: '週二 (T日)', t1: '週三 (T+1日)', t2: '週四 (T+2日 上午 10:00 前扣款)', note: '中規中矩週期' },
    Wed: { t: '週三 (T日)', t1: '週四 (T+1日)', t2: '週五 (T+2日 上午 10:00 前扣款)', note: '週五需確認帳戶有足夠交割款' },
    Thu: { t: '週四 (T日)', t1: '週五 (T+1日)', t2: '下週一 (T+2日 上午 10:00 扣款)', note: '跨越週末！週末期間銀行不可缺錢' },
    Fri: { t: '週五 (T日)', t1: '下週一 (T+1日)', t2: '下週二 (T+2日 上午 10:00 扣款)', note: '週五買進，下週二早上扣款' }
  };

  const steps = [
    { num: 1, title: '開戶與交割常識', tag: '防違約交割' },
    { num: 2, title: '手續費與稅金精算', tag: '交易成本' },
    { num: 3, title: '三大面向核心剖析', tag: '基本/技術/籌碼' },
    { num: 4, title: '熱門 ETF 與配息真相', tag: '填息 vs 貼息' },
    { num: 5, title: '防割韭菜保命天條', tag: '風控防詐' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/60 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>完全零基礎・從 0 到 100 實戰路徑</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            台股新手無痛通關指南
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            把複雜的股票市場拆解為白話文。從開戶、交割扣款防暴斃、看懂紅漲綠跌，到學會三大面向選股與避開高股息陷阱，建立受用一生的專業投資地基。
          </p>
        </div>
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none">
          <Compass className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {steps.map((s) => {
          const isCurrent = activeStep === s.num;
          const isPassed = activeStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-rose-500/10 border-rose-500 text-white shadow-lg ring-1 ring-rose-500/50'
                  : isPassed
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                  isCurrent ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  STEP 0{s.num}
                </span>
                {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <span className="font-semibold text-sm truncate">{s.title}</span>
              <span className="text-[11px] text-slate-400">{s.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Area */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        {/* STEP 1 */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">關卡 01：台股基礎地基與開戶 (防暴斃必看)</h2>
                <p className="text-xs sm:text-sm text-slate-400">掌握台股獨特常識，避免人生第一次買股票就因違約交割而信用破產！</p>
              </div>
            </div>

            {/* Crucial Concept 1: 兩個帳號與 T+2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-base font-bold text-amber-300 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                  1. 買股票需要哪「兩個」帳戶？
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  想要買台股，必須在同一家證券商（如元大、富邦、國泰、凱基等）同時開立：
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-semibold text-sm">① 證券集保戶 (股票的家)：</span>
                    <p className="text-xs text-slate-400 mt-0.5">紀錄你買進的股票張數與股數（集中保管結算所登錄）。</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-semibold text-sm">② 證券交割銀行戶 (錢包)：</span>
                    <p className="text-xs text-slate-400 mt-0.5">專門用來扣除買股票的款項，或收取賣出股票獲利的銀行帳戶。</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                  ⚠️ <strong>防坑警訊：</strong>下單前一定要確認「交割銀行戶」裡面有足夠的錢，不能只存在自己平時的薪轉戶或活存其他銀行！
                </div>
              </div>

              {/* T+2 Interactive Simulator */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-base font-bold text-rose-400 flex items-center justify-between">
                  <span className="flex items-center">
                    <AlertOctagon className="w-4 h-4 mr-1.5" />
                    2. 什麼是「T+2 交割」？何時會扣款？
                  </span>
                  <span className="text-xs bg-rose-500/20 px-2 py-0.5 rounded text-rose-300">極度重要</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  台股並不是買進當下立刻扣款，而是下單日後第 2 個營業日扣款：
                </p>

                {/* Day selector */}
                <div className="flex space-x-1.5">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => {
                    const names = ['週一', '週二', '週三', '週四', '週五'];
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedTradeDay(day)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                          selectedTradeDay === day
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {names[idx]}買
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic T+2 Visual timeline */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">下單當天 (T)</span>
                    <span className="text-white font-mono font-semibold">{tPlusTwoSchedule[selectedTradeDay].t}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">確認中 (T+1)</span>
                    <span className="text-slate-300 font-mono">{tPlusTwoSchedule[selectedTradeDay].t1}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-rose-400 font-bold">強制扣款 (T+2)</span>
                    <span className="text-rose-400 font-mono font-bold">{tPlusTwoSchedule[selectedTradeDay].t2}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-lg">
                  💡 <strong>若扣款失敗後果：</strong>如果在 T+2 日上午 10:00 前戶頭餘額不足，將構成「違約交割」。券商將強制市價砍掉你的持股追償，並通報金管會聯徵信用破產（無法辦信用卡、無法房貸），情節重大者更會面臨三年以上有期徒刑！
                </div>
              </div>
            </div>

            {/* Trading Units & Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> 台股交易時間
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• <strong>08:30 - 09:00：</strong>開盤試撮 (可抽單)</p>
                  <p>• <strong>09:00 - 13:30：</strong>正規盤中連續撮合</p>
                  <p>• <strong>13:25 - 13:30：</strong>收盤試撮 (防灌單)</p>
                  <p>• <strong>14:00 - 14:30：</strong>盤後定價交易 (以收盤價撮合)</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" /> 交易單位：張 vs 零股
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• <strong>整張交易：</strong>1 張 = 1,000 股。例如台積電 1,000 元，買 1 張需 100 萬元。</p>
                  <p>• <strong>盤中零股 (小資救星)：</strong>1 股 ~ 999 股皆可買！09:10-13:30 每分鐘撮合一次。買 10 股台積電只需 1 萬元。</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 flex items-center">
                  <Layers className="w-4 h-4 mr-1" /> 掛單類型：市價單 vs 限價單
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• <strong>限價單 (推薦)：</strong>指定「我最高只願意用某價買進」，絕不買貴。</p>
                  <p>• <strong>市價單 (危險)：</strong>不計代價立刻成交！若開盤遇急拉，可能直接買在 +10% 漲停板慘被套牢。</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">關卡 02：台股手續費與稅金精算</h2>
                <p className="text-xs sm:text-sm text-slate-400">買賣股票每次要付多少錢？為什麼當沖多數人會賠光？算給你看！</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fee Formula */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
                <h3 className="text-base font-bold text-emerald-400">台股交易兩大法定成本</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-sm font-semibold text-white">
                      <span>1. 券商手續費 (買進與賣出都要收)</span>
                      <span className="text-emerald-400 font-mono">0.1425%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      公式：成交金額 × 0.1425% × 券商折扣。現在電子下單通常有 <strong>2.8 折 ~ 6 折</strong> 優惠。若未滿低消 (通常 1 元或 20 元) 仍以低消計。
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-sm font-semibold text-white">
                      <span>2. 證券交易稅 (賣出時由政府課徵)</span>
                      <span className="text-rose-400 font-mono">0.30%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      • 一般股票賣出：課徵 <strong>0.3%</strong>。<br />
                      • ETF (如 0050/00878) 賣出：享有降稅優惠，僅課徵 <strong>0.1%</strong>。<br />
                      • 現股當沖 (同一天買進當天賣出)：享有當沖降稅 <strong>0.15%</strong>。
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-xs text-indigo-300">
                  💡 <strong>一買一賣總摩擦成本：</strong><br />
                  買賣一般個股 (以 6 折手續費計算)，總手續費約 0.171% + 證交稅 0.3% = <strong>約 0.47%</strong>。<br />
                  也就是說，你買進一檔股票，<strong>至少要漲 0.5% 以上賣出才算真正不賠錢！</strong>
                </div>
              </div>

              {/* Dividend & Second-generation NHI Tax */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
                <h3 className="text-base font-bold text-amber-400">存股族必須注意的配息稅務陷阱</h3>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-white">① 二代健保補充保費 (2.11%)</span>
                    <p className="text-xs text-slate-400">
                      單次單筆股票領到的股利金額若達到 <strong>20,000 元 (含)</strong>，券商在匯款時會直接自動扣除 2.11% 的補充保費！<br />
                      <em>解法：小資族可透過選擇「季配息」或「月配息」ETF，將單次配息金額壓在 2 萬元以下即可合法避開。</em>
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-white">② 個人綜合所得稅與 8.5% 抵減稅額</span>
                    <p className="text-xs text-slate-400">
                      股利會計入個人綜合所得。但政府提供股利 8.5% 的可扣抵稅額（上限 8 萬元）。若你的所得稅率級距為 5%，領股息反而在報稅時享有退稅小確幸！
                    </p>
                  </div>
                </div>

                <button
                  onClick={onJumpToToolbox}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>打開「台股手續費 & 損益平衡試算機」試算</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">關卡 03：三大分析面向核心剖析</h2>
                <p className="text-xs sm:text-sm text-slate-400">基本面看公司體質、技術面看時機點、籌碼面看誰在主導。三者合一勝率最高！</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Fundamental */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                    基
                  </div>
                  <h3 className="text-base font-bold text-white">基本面 (Fundamental)</h3>
                  <span className="text-xs text-blue-300 block font-medium">「這家公司到底賺不賺錢？」</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    透過財報檢視公司的護城河與獲利能力。決定一檔股票的長期「價值底線」。
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                    <p>• <strong>EPS (每股盈餘)：</strong>每一股幫股東賺了多少錢。</p>
                    <p>• <strong>ROE (股東權益報酬率)：</strong>投入資本的獲利效率，巴菲特最愛。</p>
                    <p>• <strong>本益比 (PE)：</strong>現在股價幾年能回本，評估貴不貴。</p>
                    <p>• <strong>自由現金流：</strong>營運現金扣除資本支出，防止虛假獲利。</p>
                  </div>
                </div>
              </div>

              {/* Technical */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    技
                  </div>
                  <h3 className="text-base font-bold text-white">技術面 (Technical)</h3>
                  <span className="text-xs text-amber-300 block font-medium">「現在買進還是等等再買？」</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    透過過去量價走勢與大眾交易心理，尋找進出場的最佳買賣時機點與防守支撐。
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                    <p>• <strong>K 線 (Candlestick)：</strong>紅K代表漲、綠K代表跌、影線代表多空爭奪。</p>
                    <p>• <strong>均線 (MA)：</strong>投資人平均成本，站上季線 (60MA) 為生命線。</p>
                    <p>• <strong>成交量 (Volume)：</strong>「量是價的先行指標」，突破需帶量。</p>
                    <p>• <strong>KD / MACD：</strong>短線超買或超賣轉折指標。</p>
                  </div>
                </div>
                <button
                  onClick={onJumpToMarket}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-xs font-semibold rounded-lg text-slate-200 transition"
                >
                  進入「看盤教室」查看互動 K 線
                </button>
              </div>

              {/* Chips */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
                    籌
                  </div>
                  <h3 className="text-base font-bold text-white">籌碼面 (Chips Analysis)</h3>
                  <span className="text-xs text-rose-300 block font-medium">「台股最獨特的核心力量！」</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    籌碼在誰手裡，股價就往哪走。散戶通常追高殺低，跟著大資金法人才能吃香喝辣。
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                    <p>• <strong>外資：</strong>資金量最大，主宰台積電、聯發科等大型權值股。</p>
                    <p>• <strong>投信：</strong>操盤本土基金，季底作帳行情中小型潛力飆股。</p>
                    <p>• <strong>千張大戶持股比：</strong>籌碼集中度越高，主力越容易拉抬。</p>
                    <p>• <strong>融資餘額：</strong>散戶借錢指標，融資暴增通常代表高檔危險。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">關卡 04：熱門 ETF 拆解與配息真相</h2>
                <p className="text-xs sm:text-sm text-slate-400">0050 vs 00878 誰更好？破解台灣人最容易中計的高股息「貼息」與「平準金」迷思！</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market vs Dividend */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
                <h3 className="text-base font-bold text-purple-300">市值型 ETF vs 高股息 ETF 終極對決</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-bold text-sm">【市值型】0050 / 006208 (追求資產極大化)</span>
                    <p className="text-xs text-slate-300 mt-1">
                      • <strong>選股邏輯：</strong>直接打包台灣市值前 50 大企業 (台積電佔比 50% 以上)。<br />
                      • <strong>特點：</strong>配息率較低，但享受台灣科技企業成長紅利。長期年化報酬率約 <strong>8%~10%</strong>。<br />
                      • <strong>適合族群：</strong>40 歲以下年輕人、小資族、累積退休金首選。
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold text-sm">【高股息型】00878 / 0056 / 00919 (追求現金流)</span>
                    <p className="text-xs text-slate-300 mt-1">
                      • <strong>選股邏輯：</strong>篩選過去或預期配息率高的公司 (如金融、傳產、成熟電子)。<br />
                      • <strong>特點：</strong>殖利率高 (6%~10%)，但往往犧牲長期資本成長空間。<br />
                      • <strong>適合族群：</strong>已退休人士、每個月需要穩定現金繳房貸或生活費者。
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 text-xs text-slate-300 border border-slate-800">
                  📊 <strong>真實數據結論：</strong>若回測過去 10 年，0050 的總報酬率高達 250% 以上，遠遠超越高股息 ETF 加上配息的總報酬。年輕人一昧存高股息，複利累積速度會慢上一倍！
                </div>
              </div>

              {/* The Dividend Trap */}
              <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 space-y-4">
                <h3 className="text-base font-bold text-rose-400 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  新手必破：高股息兩大致命誤區
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-rose-300">誤區 1：配息 10% 等於賺 10%？(填息才算賺！)</span>
                    <p className="text-xs text-slate-400">
                      除息日當天，股價會<strong>強制扣除配息金額</strong>！<br />
                      例：股價 30 元配息 3 元，除息當天開盤價變成 27 元。若股價沒有漲回 30 元（貼息），你戶頭拿到的 3 元股息只不過是把自己原本的本金拿出來，甚至還要被扣稅，實質總資產毫無增加！
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-semibold text-amber-300">誤區 2：收益平準金是騙局嗎？</span>
                    <p className="text-xs text-slate-400">
                      平準金是為防配息被新加入的大量資金稀釋的調節機制。配發平準金本質是「退還投資人一部分本金」，不需繳稅，但也不能視為公司營運賺來的真金白銀。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">關卡 05：新手防割韭菜保命五大天條</h2>
                <p className="text-xs sm:text-sm text-slate-400">在股市賺錢之前，先學會「不虧大錢」。只要遵守這五條鐵律，你就能打敗市場 80% 的散戶！</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  rule: '天條一：嚴禁借錢融資與開高槓桿買股票',
                  desc: '只能用「至少 3 年以上用不到的閒錢」投資。一旦使用融資借款，遇到回檔很容易因維持率不足被券商強迫斷頭砍在阿呆谷，再也等不到後面的大行情。',
                  level: '絕對禁令'
                },
                {
                  rule: '天條二：嚴守停損紀律 (7% ~ 10% 無條件退場)',
                  desc: '散戶之所以巨幅套牢虧損 50% 甚至 80%，都是因為最初虧損 5% 時不捨得停損，幻想會漲回來，最後變成鴕鳥裝死。把停損當成投資買保險的成本！',
                  level: '生存法則'
                },
                {
                  rule: '天條三：單一持股不超過總資金 25%，單筆虧損限制在 2%',
                  desc: '不要把所有雞蛋放在同一個籃子裡。再看好的公司都可能遭遇黑天鵝或被抽單。分散持股 3-5 檔不同產業龍頭，能大幅降低投資組合波動度。',
                  level: '資金控管'
                },
                {
                  rule: '天條四：拒絕任何 LINE 炒股群組、網路「飆股明牌」',
                  desc: '天底下沒有白吃的午餐！詐騙集團通常先在群裡推薦幾檔能小賺的股票建立信任，最後誘騙你去買無成交量的「港股仙股」、「海外未上市股票」或「全額交割股」，一天暴跌 90% 讓你血本無歸。',
                  level: '防詐鐵則'
                },
                {
                  rule: '天條五：看不懂營運邏輯與商業模式的公司，絕不進場',
                  desc: '巴菲特說：「投資必須在自己的能力圈內。」若你連這家公司靠什麼產品賣給誰、如何賺錢都不清楚，只因為聽到同事或網路說會飆就買，這不叫投資，這叫賭博。',
                  level: '心法修為'
                }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-800/70 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-rose-400 font-bold text-sm sm:text-base">{item.rule}</span>
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Navigation Bottom Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              activeStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-500 bg-slate-800'
                : 'text-slate-200 bg-slate-800 hover:bg-slate-700'
            }`}
          >
            ← 上一步
          </button>

          <div className="text-xs text-slate-400">
            關卡進度：{activeStep} / 5
          </div>

          <button
            onClick={() => {
              if (activeStep < 5) {
                setActiveStep((prev) => prev + 1);
              } else {
                onJumpToMarket();
              }
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition flex items-center space-x-1 shadow-lg shadow-rose-600/20"
          >
            <span>{activeStep === 5 ? '前往「看盤圖解教室」' : '下一步 →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
