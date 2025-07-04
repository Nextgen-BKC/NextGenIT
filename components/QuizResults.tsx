import React from 'react';
import { Brain, CircleCheckBig } from 'lucide-react';

type QuestionType = {
    question: string;
    options: string[];
    answer: string;
};

type QuizResultsProps = {
    questions: QuestionType[];
    userAnswers: Record<string, string>;
    score: number;
    restartQuiz: () => void;
};

const QuizResults: React.FC<QuizResultsProps> = ({ questions, score, userAnswers, restartQuiz }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-4 md:py-6 px-4 md:px-8">
                        <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2 md:gap-3">
                                <Brain className="h-6 w-6 md:h-8 md:w-8 text-white" />
                                <h1 className="text-2xl md:text-3xl font-bold text-white">Quiz Results</h1>
                            </div>
                            <p className="text-orange-100 text-sm md:text-base mt-1 md:mt-2">Entrance Exam Practice</p>
                            <div className="mt-2 md:mt-4 bg-white/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                                <p className="text-xl md:text-2xl font-semibold text-white">
                                    Score: {score}/{questions.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results Content */}
                    <div className="p-4 md:p-6">
                        <div className="space-y-4 md:space-y-6">
                            {questions.map((q, idx) => {
                                const userAnswer = userAnswers[`q${idx}`];
                                const isCorrect = userAnswer === q.answer;

                                return (
                                    <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                                        <div className="p-4 md:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'
                                                        }`}
                                                >
                                                    <span className="text-white font-medium text-sm">{idx + 1}</span>
                                                </div>
                                                <h3 className="font-medium text-gray-800 text-base md:text-lg">{q.question}</h3>
                                            </div>

                                            <div className="sm:ml-12 space-y-2">
                                                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2">
                                                    <span className="text-green-600 font-medium text-sm md:text-base">Correct Answer:</span>
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm md:text-base break-words">
                                                        {q.answer}
                                                    </span>
                                                </div>
                                                {!isCorrect && (
                                                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2">
                                                        <span className="text-red-600 font-medium text-sm md:text-base">Your Answer:</span>
                                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm md:text-base break-words">
                                                            {userAnswer || 'Not answered'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Restart Button */}
                        <div className="mt-6 md:mt-8 text-center">
                            <button
                                onClick={restartQuiz}
                                className="bg-orange-500 text-white px-4 py-2 md:px-8 md:py-3 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 mx-auto w-full md:w-auto justify-center"
                            >
                                <CircleCheckBig className="h-5 w-5 md:h-6 md:w-6" />
                                <span className="text-sm md:text-base">Restart Quiz</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;