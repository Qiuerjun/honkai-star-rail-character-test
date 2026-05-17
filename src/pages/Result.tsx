import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, Users, Quote, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Result() {
  const navigate = useNavigate();
  const { result, userTraits, reset } = useQuizStore();

  useEffect(() => {
    if (!result) {
      navigate('#/');
    }
  }, [result, navigate]);

  if (!result) return null;

  const { topMatch, matchPercent, similarMatches } = result;

  const radarData = {
    labels: ['外向性', '直觉性', '思考性', '判断性', '冒险性', '独立性'],
    datasets: [
      {
        label: '你的性格',
        data: [
          userTraits.extraversion + 10,
          userTraits.intuition + 10,
          userTraits.thinking + 10,
          userTraits.judging + 10,
          userTraits.adventurous + 10,
          userTraits.independent + 10,
        ],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: 'rgba(139, 92, 246, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
      },
      {
        label: topMatch.name,
        data: [
          topMatch.traits.extraversion + 10,
          topMatch.traits.intuition + 10,
          topMatch.traits.thinking + 10,
          topMatch.traits.judging + 10,
          topMatch.traits.adventurous + 10,
          topMatch.traits.independent + 10,
        ],
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        borderColor: 'rgba(251, 191, 36, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(251, 191, 36, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(251, 191, 36, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 20,
        min: 0,
        ticks: {
          display: false,
          stepSize: 5,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
  };

  const handleRestart = () => {
    reset();
    navigate('#/');
  };

  const handleShare = () => {
    const text = `我在「崩坏：星穹铁道角色匹配测试」中匹配到了${topMatch.name}！匹配度${matchPercent}%！快来测测你最像哪个角色吧！`;
    if (navigator.share) {
      navigator.share({
        title: '崩坏：星穹铁道角色匹配测试',
        text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('结果已复制到剪贴板！');
    }
  };

  return (
    <div className="relative min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/70 text-sm">匹配结果</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-yellow-400/30 shadow-lg shadow-yellow-400/10 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center"
              >
                {topMatch.avatarUrl ? (
                  <img
                    src={topMatch.avatarUrl}
                    alt={topMatch.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User className="w-16 h-16 text-white/30 mb-2" />
                    <span className="text-white/40 text-sm">{topMatch.name}</span>
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-lg font-bold text-black">{matchPercent}%</span>
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                {topMatch.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4"
              >
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                  {topMatch.path}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                  {topMatch.element}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                  {topMatch.faction}
                </span>
                {topMatch.mbti && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                    {topMatch.mbti}
                  </span>
                )}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/60 mb-4"
              >
                {topMatch.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-white/80 text-sm italic">{topMatch.quote}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            性格分析对比
          </h3>
          <div className="h-64 md:h-80">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">相似角色推荐</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {similarMatches.map((match, index) => (
              <motion.div
                key={match.character.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.15 }}
                className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                  {match.character.avatarUrl ? (
                    <img
                      src={match.character.avatarUrl}
                      alt={match.character.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-6 h-6 text-white/30" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold truncate">{match.character.name}</h4>
                  <p className="text-white/50 text-sm truncate">{match.character.personality}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-bold text-purple-400">{match.percent}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            重新测试
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-colors"
          >
            <Share2 className="w-4 h-4" />
            分享结果
          </button>
          <button
            onClick={() => navigate('#/characters')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/10"
          >
            <Users className="w-4 h-4" />
            浏览图鉴
          </button>
        </motion.div>
      </div>
    </div>
  );
}
