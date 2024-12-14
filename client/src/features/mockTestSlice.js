// src/redux/mockTestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  showScore: false,
  correctDomains: [],
  wrongDomains: [],
};

const mockTestSlice = createSlice({
  name: "mockTest",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    selectAnswer: (state, action) => {
      state.selectedAnswer = action.payload.option;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (action.payload.option === currentQuestion.correct_option) {
        state.score += 1;
        state.correctDomains.push(currentQuestion.domain);
      } else {
        state.wrongDomains.push(currentQuestion.domain);
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.showScore = true;
      }
      state.selectedAnswer = null;
    },
    resetTest: (state) => {
      state.score = 0;
      state.currentQuestionIndex = 0;
      state.selectedAnswer = null;
      state.showScore = false;
      state.correctDomains = [];
      state.wrongDomains = [];
    },
    setQuestionsShuffled: (state, action) => {
      const shuffledQuestions = action.payload
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      state.questions = shuffledQuestions;
    },
  },
});

export const {
  setQuestions,
  selectAnswer,
  nextQuestion,
  resetTest,
  setQuestionsShuffled,
} = mockTestSlice.actions;
export default mockTestSlice.reducer;