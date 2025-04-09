"use client"
import { useState, useEffect } from 'react';
import { Timer, Brain, CircleCheckBig } from 'lucide-react';
import QuizResults from '@/components/QuizResults';
import { questions } from './_component/data';



interface UserAnswers {
    [key: string]: string;
}


const Page = () => { // Component name starts with uppercase letter
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [score, setScore] = useState(0);
    const [currentSection, setCurrentSection] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        if (questions.length > 0) {
            const uniqueGroups = getUniqueGroups();
            setCurrentSection(uniqueGroups[0]);
        }

        return () => clearInterval(timer);
    }, []);



    const getUniqueGroups = () => {
        return questions.reduce((acc, q) => {
            if (!acc.includes(q.group)) {
                acc.push(q.group);
            }
            return acc;
        }, [] as string[]);
    };

    const getGroupProgress = (group: string) => {
        const groupQuestions = questions.filter(q => q.group === group);
        const answeredCount = groupQuestions.filter((q) => {
            const globalIndex = questions.findIndex(item => item === q);
            return userAnswers[`q${globalIndex}`] !== undefined;
        }).length;

        return {
            total: groupQuestions.length,
            answered: answeredCount,
            percentage: Math.round((answeredCount / groupQuestions.length) * 100)
        };
    };

    const getOverallProgress = () => {
        const answeredCount = Object.keys(userAnswers).length;
        return Math.round((answeredCount / questions.length) * 100);
    };

    const handleSectionChange = (section: string) => { // Removed unused index parameter
        setCurrentSection(section);
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        // Calculate score
        let correctAnswers = 0;
        questions.forEach((q, idx) => {
            const userAnswer = userAnswers[`q${idx}`];
            if (userAnswer === q.answer) {
                correctAnswers++;
            }
        });

        setScore(correctAnswers);
        setShowResults(true);
    };

    const restartQuiz = () => {
        setShowResults(false);
        setUserAnswers({});
        setTimeLeft(600);
        setScore(0);
        const uniqueGroups = getUniqueGroups();
        setCurrentSection(uniqueGroups[0]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showResults) {
        return (
            <QuizResults
                questions={questions}
                userAnswers={userAnswers}
                score={score}
                restartQuiz={restartQuiz}
            />
        );
    }





    const ProgressBar = ({ value }: { value: number }) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${value}%` }}
            />
        </div>
    );

    if (showResults) {
        return <QuizResults questions={questions} userAnswers={userAnswers} score={score} restartQuiz={restartQuiz} />;
    }

    const uniqueGroups = getUniqueGroups();
    const overallProgress = getOverallProgress();

    return (

        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                    <Brain className="h-8 w-8" />
                                    Entrance Exam Practice
                                </h1>
                                <p className="text-orange-100 mt-1">Complete all sections to finish the test</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-white">
                                <Timer className="h-5 w-5" />
                                <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="p-4 bg-orange-50 border-b border-orange-200">
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                                <span className="text-sm font-medium text-gray-600">{overallProgress}%</span>
                            </div>
                            <ProgressBar value={overallProgress} />
                        </div>

                        <div className="flex overflow-x-auto gap-2 pb-2">
                            {uniqueGroups.map((group) => {
                                const progress = getGroupProgress(group);
                                return (
                                    <button
                                        key={group}
                                        onClick={() => handleSectionChange(group)} // Removed index parameter
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${currentSection === group
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-orange-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{group}</span>
                                            <span className="text-xs font-medium bg-black/10 px-2 py-0.5 rounded-full">
                                                {progress.answered}/{progress.total}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="p-6">
                        {uniqueGroups.map((group, groupIndex) => (
                            <div key={group} className={`${currentSection === group ? 'block' : 'hidden'}`}>
                                <div className="space-y-6">
                                    {questions
                                        .filter(q => q.group === group)
                                        .map((q, idx) => {
                                            const globalIndex = questions.findIndex(item => item === q);
                                            return (
                                                <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                                                    <div className="p-6">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="bg-orange-100 text-orange-800 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                                {idx + 1}
                                                            </div>
                                                            <h3 className="font-medium text-gray-800">{q.question}</h3>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {q.options.map((option, optIndex) => (
                                                                <label
                                                                    key={optIndex}
                                                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${userAnswers[`q${globalIndex}`] === option
                                                                        ? 'bg-orange-50 border-orange-300'
                                                                        : 'bg-gray-50 border-gray-200 hover:border-orange-200'
                                                                        }`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`q${globalIndex}`}
                                                                        value={option}
                                                                        checked={userAnswers[`q${globalIndex}`] === option}
                                                                        onChange={() => handleAnswerChange(`q${globalIndex}`, option)}
                                                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                                                                    />
                                                                    <span className="text-gray-700">{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>

                                {/* Navigation Controls */}
                                <div className="mt-8 flex flex-wrap gap-4 justify-between">
                                    {groupIndex > 0 && (
                                        <button
                                            onClick={() => handleSectionChange(uniqueGroups[groupIndex - 1])} // Removed index
                                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                        >
                                            Previous Section
                                        </button>
                                    )}

                                    {groupIndex < uniqueGroups.length - 1 ? (
                                        <button
                                            onClick={() => handleSectionChange(uniqueGroups[groupIndex + 1])} // Removed index
                                            className="ml-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                        >
                                            Next Section
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                                        >
                                            <CircleCheckBig size={20} />
                                            Submit Quiz
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;