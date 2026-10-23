import React, { useState } from 'react';
import { 
  BookOpen, Search, Quote, CheckCircle, XCircle, Award, 
  HelpCircle, ChevronDown, ChevronUp, Sparkles, Filter
} from 'lucide-react';
import { MASTER_LESSONS, KNOWLEDGE_QUIZ } from '../data/mastersLessons';

export default function MasterLibrary() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const categories = ['全部', '基本面心法', '選股與估值', '被動投資與資產配置', '財報與景氣循環', '高股息與籌碼', '技術面與風控'];

  const filteredLessons = MASTER_LESSONS.filter((l) => {
    const matchCategory = activeCategory === '全部' || l.category === activeCategory;
    const matchSearch = l.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [questionId]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    KNOWLEDGE_QUIZ.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 20;
      }
    });
    return score;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Masters & YouTube Library
            </span>
            <span className="text-slate-400 text-xs">長影片重點提煉</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            大師精華筆記與 YouTube 財經濃縮庫
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            將數十小時巴菲特致股東信、彼得林區演講、綠角怪老子指南、股乾爹與柴鼠兄弟熱門影片精鍊成精準筆記。
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="搜尋大師、作者或概念..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto space-x-2 pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeCategory === cat
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLessons.map((lesson) => {
          const isExpanded = expandedCardId === lesson.id;
          return (
            <div
              key={lesson.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lesson.avatar}</span>
                    <div>
                      <h3 className="text-base font-bold text-white">{lesson.author}</h3>
                      <span className="text-xs text-slate-400">{lesson.source}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {lesson.tag}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-100">{lesson.title}</h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {lesson.summary}
                </p>

                {/* Golden quote */}
                <div className="flex items-center space-x-2 text-xs italic text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <Quote className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>「{lesson.goldenQuote}」</span>
                </div>

                {/* Expandable detailed takeaways */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <span className="text-xs font-bold text-slate-300 block">
                      📌 萬字影片與高階筆記核心提煉：
                    </span>
                    {lesson.takeaways.map((takeaway, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-800/50 text-xs text-slate-300 leading-relaxed">
                        {takeaway}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expand Toggle Button */}
              <button
                onClick={() => setExpandedCardId(isExpanded ? null : lesson.id)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold rounded-xl transition flex items-center justify-center space-x-1"
              >
                <span>{isExpanded ? '收合核心提煉' : '閱讀完整萬字提煉'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* SECTION: Interactive Quiz */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Knowledge Check
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              新手實戰段位自測大考驗 (5 題)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              檢驗你是否真正吸收了台股交割常識、PEG 公式、高股息貼息與融資斷頭風暴！
            </p>
          </div>

          {submitted && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-right">
              <span className="text-xs text-slate-400 block">你的測驗成績</span>
              <span className={`text-2xl font-black ${
                calculateScore() >= 80 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {calculateScore()} / 100 分
              </span>
            </div>
          )}
        </div>

        {/* Quiz list */}
        <div className="space-y-6">
          {KNOWLEDGE_QUIZ.map((q, index) => {
            const isUserAnswered = userAnswers[q.id] !== undefined;
            const isCorrect = userAnswers[q.id] === q.correctIndex;

            return (
              <div key={q.id} className="p-4 sm:p-5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="font-mono font-bold text-xs bg-slate-800 px-2 py-0.5 rounded text-rose-400 shrink-0">
                    Q{index + 1}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-white">{q.question}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    let optionStyle = 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-500/20 border-rose-500 text-white font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-lg border text-left transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {submitted && optIdx === q.correctIndex && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300">
                    💡 <strong>專業詳解：</strong>{q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Reset Button */}
        <div className="pt-2">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-rose-600/20"
            >
              提交答案查看成績與詳解
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setUserAnswers({});
              }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm transition"
            >
              重新測驗一次
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
