import { motion } from 'framer-motion';
import { Zap, Search, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';

export default function Home() {
  const navigate = useNavigate();
  const setMode = useQuizStore((state) => state.setMode);

  const handleModeSelect = (mode: 'quick' | 'detailed') => {
    setMode(mode);
    navigate('#/quiz');
  };

  const titleChars = '你最像崩铁里的哪个角色？'.split('');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e27]/80 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400/80 text-sm tracking-widest uppercase">Honkai: Star Rail</span>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center relative">
        {titleChars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="inline-block"
            style={{
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.2)',
            }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-white/60 text-lg mb-12 text-center max-w-md"
      >
        通过科学的性格分析，找到与你最匹配的星穹铁道角色
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeSelect('quick')}
          className="group relative bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 text-left transition-all hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">快速模式</h3>
                <span className="text-blue-400/80 text-sm">6道精选题目</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-4">适合想要快速获得结果的用户，约1分钟完成</p>
            <div className="flex items-center text-blue-400 text-sm font-medium">
              开始测试 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModeSelect('detailed')}
          className="group relative bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8 text-left transition-all hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Search className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">详细模式</h3>
                <span className="text-amber-400/80 text-sm">18道深度题目</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-4">更精准的性格分析，约3-5分钟完成</p>
            <div className="flex items-center text-amber-400 text-sm font-medium">
              开始测试 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        onClick={() => navigate('#/characters')}
        className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        浏览角色图鉴
      </motion.button>
    </div>
  );
}
