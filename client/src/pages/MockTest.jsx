// src/components/MockTest.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'; // Import NavLink
import Navbar from './Navbar'; // Import Navbar
import { setQuestionsShuffled, selectAnswer, nextQuestion, resetTest } from '@/features/mockTestSlice';

const MockTest = () => {
   const dispatch = useDispatch();
   const {
      questions,
      currentQuestionIndex,
      selectedAnswer,
      score,
      showScore,
   } = useSelector((state) => state.mockTest);

   // Load questions from the JSON file
   useEffect(() => {
      async function fetchQuestions() {
         try {
            const response = await fetch('/questions_data.json');
            if (!response.ok) {
               throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            const data = await response.json();
            dispatch(setQuestionsShuffled(data)); // Dispatch action to set shuffled questions
         } catch (error) {
            console.error('Error loading questions:', error);
         }
      }
      fetchQuestions();
   }, [dispatch]);

   // Handle answer selection
   const handleAnswerClick = (option) => {
      dispatch(selectAnswer({ option }));
   };

   // Move to the next question
   const handleNextQuestion = () => {
      dispatch(nextQuestion());
   };

   if (questions.length === 0) {
      return <div className="text-center text-lg font-semibold py-10 text-black">Loading questions...</div>;
   }

   return (
      <>
         <Navbar /> {/* Render the Navbar at the top */}
         <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
            <div className="mock-test-container max-w-2xl p-6 bg-white shadow-md rounded-lg text-black">
               {showScore ? (
                  <div className="score-section text-center text-black">
                     <h2 className="text-3xl font-bold mb-4 text-black">Your Score</h2>
                     <p className="text-lg text-black">
                        {score} out of {questions.length}
                     </p>

                     <div className="button-group mt-6 flex justify-center space-x-4">
                        <button
                           onClick={() => dispatch(resetTest())}
                           className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-black"
                        >
                           Retake Test
                        </button>
                        {/* Add NavLink to navigate to /course */}
                        <NavLink
                           to="/courses"
                           className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-black"
                        >
                           View Courses
                        </NavLink>
                     </div>
                  </div>
               ) : (
                  <div className="question-section text-black">
                     <h2 className="text-2xl font-bold mb-4 text-black">
                        Question {currentQuestionIndex + 1}/{questions.length}
                     </h2>
                     <p className="text-lg mb-6 text-black">{questions[currentQuestionIndex].question}</p>
                     <div className="options-section flex flex-col">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                           <button
                              key={index}
                              className={`option-button px-4 py-2 border rounded-md mb-2 text-left text-black ${selectedAnswer === option
                                 ? option === questions[currentQuestionIndex].correct_option
                                    ? 'bg-green-200 border-green-500'
                                    : 'bg-red-200 border-red-500'
                                 : 'bg-gray-100 hover:bg-gray-200'
                                 }`}
                              onClick={() => handleAnswerClick(option)}
                              disabled={selectedAnswer !== null}
                           >
                              {option}
                           </button>
                        ))}
                     </div>
                     <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className="next-button mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-black"
                     >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                     </button>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default MockTest;
