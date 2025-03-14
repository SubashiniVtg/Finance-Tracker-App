import { useState } from "react";

const questions = [
  {
    question: "What is the first step in financial planning?",
    options: ["Setting a budget", "Investing in stocks", "Taking a loan", "Spending freely"],
    answer: "Setting a budget",
  },
  {
    question: "Which investment type is the least risky?",
    options: ["Stocks", "Bonds", "Real Estate", "Cryptocurrency"],
    answer: "Bonds",
  },
  {
    question: "What is a SIP (Systematic Investment Plan)?",
    options: [
      "A type of insurance",
      "A method of investing in mutual funds",
      "A loan scheme",
      "A way to calculate EMI",
    ],
    answer: "A method of investing in mutual funds",
  },
];

const Quiz = ({ setQuizScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setCompleted(true);
      setQuizScore(score + 1);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Financial Literacy Quiz</h2>
      {completed ? (
        <div>
          <h3 className="text-xl font-semibold">Quiz Completed!</h3>
          <p className="mt-2">Your Score: {score} / {questions.length}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
          <div className="mt-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="block w-full p-2 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
