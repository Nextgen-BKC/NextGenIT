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

const QuizResults: React.FC<QuizResultsProps> = ({ questions, userAnswers, score, restartQuiz }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-8">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-3">
                                <Brain className="h-8 w-8 text-white" />
                                <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
                            </div>
                            <p className="text-orange-100 mt-2">Entrance Exam Practice</p>
                            <div className="mt-4 bg-white/20 px-6 py-2 rounded-full">
                                <p className="text-2xl font-semibold text-white">
                                    Score: {score}/{questions.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results Content */}
                    <div className="p-6">
                        <div className="space-y-6">
                            {questions.map((q, idx) => {
                                const userAnswer = userAnswers[`q${idx}`];
                                const isCorrect = userAnswer === q.answer;

                                return (
                                    <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                                        <div className="p-6">
                                            <div className="flex items-start gap-3 mb-4">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-500' : 'bg-red-500'
                                                        }`}
                                                >
                                                    <span className="text-white font-medium text-sm">{idx + 1}</span>
                                                </div>
                                                <h3 className="font-medium text-gray-800">{q.question}</h3>
                                            </div>

                                            <div className="ml-12 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-green-600 font-medium">Correct Answer:</span>
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md">{q.answer}</span>
                                                </div>
                                                {!isCorrect && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-red-600 font-medium">Your Answer:</span>
                                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md">
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
                        <div className="mt-8 text-center">
                            <button
                                onClick={restartQuiz}
                                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition flex items-center gap-2 mx-auto"
                            >
                                <CircleCheckBig size={20} />
                                Restart Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResults;
