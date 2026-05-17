import { create } from 'zustand';
import { Character, CharacterTraits } from '../data/characters';

interface QuizState {
  mode: 'quick' | 'detailed' | null;
  currentQuestion: number;
  answers: Record<number, { optionIndex: number; weights: Record<string, number> }>;
  userTraits: CharacterTraits;
  result: {
    topMatch: Character;
    matchPercent: number;
    similarMatches: { character: Character; percent: number }[];
  } | null;
  isComplete: boolean;

  setMode: (mode: 'quick' | 'detailed') => void;
  answerQuestion: (questionId: number, optionIndex: number, weights: Record<string, number>) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setResult: (result: QuizState['result']) => void;
  reset: () => void;
}

const defaultTraits: CharacterTraits = {
  extraversion: 0,
  intuition: 0,
  thinking: 0,
  judging: 0,
  adventurous: 0,
  independent: 0,
};

export const useQuizStore = create<QuizState>((set) => ({
  mode: null,
  currentQuestion: 0,
  answers: {},
  userTraits: { ...defaultTraits },
  result: null,
  isComplete: false,

  setMode: (mode) => set({ mode, currentQuestion: 0, answers: {}, userTraits: { ...defaultTraits }, result: null, isComplete: false }),

  answerQuestion: (questionId, optionIndex, weights) =>
    set((state) => {
      const newAnswers = { ...state.answers, [questionId]: { optionIndex, weights } };
      const newTraits = { ...state.userTraits };
      Object.entries(weights).forEach(([key, value]) => {
        if (key in newTraits) {
          newTraits[key as keyof CharacterTraits] += value;
        }
      });
      return { answers: newAnswers, userTraits: newTraits };
    }),

  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),

  prevQuestion: () => set((state) => ({ currentQuestion: Math.max(0, state.currentQuestion - 1) })),

  setResult: (result) => set({ result, isComplete: true }),

  reset: () => set({ mode: null, currentQuestion: 0, answers: {}, userTraits: { ...defaultTraits }, result: null, isComplete: false }),
}));
