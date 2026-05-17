import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { quickQuestions, detailedQuestions } from '../data/questions';
import { characters } from '../data/characters';
import { findBestMatches } from '../utils/match';

export default function Quiz() {
  const navigate = useNavigate();
  const {
    mode,
    currentQuestion,
    answers,
    userTraits,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    setResult,
  } = useQuizStore();

  const [direction, setDirection] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (!mode) {
      navigate('/');
    }
  }, [mode, navigate]);

  const questions = mode === 'quick' ? quickQuestions : detailedQuestions;
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (question && answers[question.id]) {
      setSelectedOption(answers[question.id].optionIndex);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, answers, question]);

  const handleOptionSelect = (optionIndex: number) => {
    if (!question) return;
    const option = question.options[optionIndex];
    answerQuestion(question.id, optionIndex, option.weights);
    setSelectedOption(optionIndex);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setDirection(1);
        nextQuestion();
      } else {
        const matches = findBestMatches(userTraits, characters, 3);
        setResult({
          topMatch: matches[0].character,
          matchPercent: matches[0].percent,
          similarMatches: matches.slice(1),
        });
        navigate('/result');
      }
    }, 600);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      prevQuestion();
    }
  };

  if (!question) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="flex items-center text-white/50 hover:text-white/80 disabled:opacity-30 transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一题
            </button>
            <span className="text-white/50 text-sm">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
              {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    selectedOption === index
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/50 text-white'
                      : selectedOption !== null
                      ? 'bg-white/5 border-white/5 text-white/30'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        selectedOption === index
                          ? 'border-blue-400 bg-blue-400/20 text-blue-400'
                          : 'border-white/30 text-white/50'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
