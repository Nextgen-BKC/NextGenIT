"use client"
import { useState, useEffect } from 'react';
import { Timer, Brain, CircleCheckBig } from 'lucide-react';
import QuizResults from '@/components/QuizResults';

interface Question {
    group: string;
    question: string;
    options: string[];
    answer: string;
}

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

    const questions: Question[] = [
        // English questions
        {
            group: "English",
            question: "She is very good ______ swimming.",
            options: ["at", "on", "of", "for"],
            answer: "at",
        },
        {
            group: "English",
            question: "Ravi will have arrived home ______ 8 pm tomorrow.",
            options: ["in", "at", "by", "on"],
            answer: "by",
        },
        {
            group: "English",
            question: "Rita is ______ honest and diligent student.",
            options: ["a", "an", "this", "no article"],
            answer: "an",
        },
        {
            group: "English",
            question: "He has been living in Delhi ______ five years.",
            options: ["since", "for", "from", "at"],
            answer: "for",
        },
        {
            group: "English",
            question: "They insisted ______ going out.",
            options: ["in", "on", "at", "about"],
            answer: "on",
        },
        {
            group: "English",
            question: "Neither the manager nor the workers ______ present.",
            options: ["was", "are", "is", "were"],
            answer: "were",
        },
        {
            group: "English",
            question: "He speaks English as ______ as his brother.",
            options: ["well", "good", "better", "best"],
            answer: "well",
        },
        {
            group: "English",
            question: "The sun ______ in the east.",
            options: ["rise", "rises", "rose", "rising"],
            answer: "rises",
        },
        {
            group: "English",
            question: "The book is divided ______ four sections.",
            options: ["in", "into", "on", "among"],
            answer: "into",
        },
        {
            group: "English",
            question: "I am looking forward to ______ you soon.",
            options: ["see", "seeing", "seen", "saw"],
            answer: "seeing",
        },

        // Math questions
        {
            group: "Math",
            question: "What is 25% of 200?",
            options: ["40", "50", "60", "70"],
            answer: "50",
        },
        {
            group: "Math",
            question: "Solve for x: 2x + 5 = 15",
            options: ["5", "10", "7", "4"],
            answer: "5",
        },
        {
            group: "Math",
            question: "What is the square root of 81?",
            options: ["7", "8", "9", "10"],
            answer: "9",
        },
        {
            group: "Math",
            question: "The value of pi (π) is approximately?",
            options: ["3.14", "2.14", "4.14", "5.14"],
            answer: "3.14",
        },
        {
            group: "Math",
            question: "What is the sum of 45 and 56?",
            options: ["101", "102", "103", "104"],
            answer: "101",
        },
        {
            group: "Math",
            question: "The product of 12 and 15 is?",
            options: ["180", "190", "200", "210"],
            answer: "180",
        },
        {
            group: "Math",
            question: "What is the value of x if 5x = 25?",
            options: ["5", "4", "6", "7"],
            answer: "5",
        },
        {
            group: "Math",
            question: "What is 72 divided by 9?",
            options: ["7", "8", "9", "10"],
            answer: "8",
        },
        {
            group: "Math",
            question: "What is the area of a rectangle with length 10 cm and width 5 cm?",
            options: ["50 cm²", "55 cm²", "60 cm²", "65 cm²"],
            answer: "50 cm²",
        },
        {
            group: "Math",
            question: "If a triangle has base 10 cm and height 6 cm, what is its area?",
            options: ["30 cm²", "32 cm²", "28 cm²", "35 cm²"],
            answer: "30 cm²",
        },

        // Reasoning questions
        {
            group: "Reasoning",
            question: "If all roses are flowers, and some flowers are red, which of the following is true?",
            options: ["Some roses are red", "All flowers are red", "Some roses are not flowers", "None of the above"],
            answer: "Some roses are red",
        },
        {
            group: "Reasoning",
            question: "If today is Monday, what day will it be 45 days from now?",
            options: ["Wednesday", "Thursday", "Friday", "Saturday"],
            answer: "Wednesday",
        },
        {
            group: "Reasoning",
            question: "Which number comes next in the series: 2, 6, 12, 20, 30?",
            options: ["36", "42", "40", "48"],
            answer: "42",
        },
        {
            group: "Reasoning",
            question: "If all cats are animals, and some animals are pets, which of the following is true?",
            options: ["Some cats are pets", "All cats are pets", "Some pets are cats", "None of the above"],
            answer: "Some cats are pets",
        },
        {
            group: "Reasoning",
            question: "Which of the following is the odd one out? 5, 9, 13, 15, 17",
            options: ["9", "13", "15", "17"],
            answer: "15",
        },
        {
            group: "Reasoning",
            question: "Find the missing number: 2, 5, 10, 17, ___, 37",
            options: ["26", "28", "30", "32"],
            answer: "26",
        },
        {
            group: "Reasoning",
            question: "What comes next in the pattern: 2, 5, 11, 23, ___?",
            options: ["40", "45", "47", "50"],
            answer: "47",
        },
        {
            group: "Reasoning",
            question: "If 'A' is coded as '1', 'B' as '2', 'C' as '3', and so on, what is the sum of the positions of the letters in 'HELLO'?",
            options: ["52", "53", "54", "55"],
            answer: "52",
        },
        {
            group: "Reasoning",
            question: "Which number should replace the question mark: 1, 4, 9, 16, ?",
            options: ["20", "25", "30", "36"],
            answer: "25",
        },
        {
            group: "Reasoning",
            question: "If 3 pencils cost 50 cents, how many pencils can you buy for $4.00?",
            options: ["24", "25", "30", "35"],
            answer: "24",
        },

        // General Knowledge questions
        {
            group: "General Knowledge",
            question: "Who is the first president of the United States?",
            options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
            answer: "George Washington",
        },
        {
            group: "General Knowledge",
            question: "What is the capital of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Hanoi"],
            answer: "Tokyo",
        },
        {
            group: "General Knowledge",
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            group: "General Knowledge",
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
            answer: "William Shakespeare",
        },
        {
            group: "General Knowledge",
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: "Pacific",
        },
        {
            group: "General Knowledge",
            question: "Which is the largest country in the world by land area?",
            options: ["China", "United States", "Canada", "Russia"],
            answer: "Russia",
        },
        {
            group: "General Knowledge",
            question: "What is the currency of the United Kingdom?",
            options: ["Dollar", "Pound", "Euro", "Yen"],
            answer: "Pound",
        },
        {
            group: "General Knowledge",
            question: "Which continent is known as the 'Dark Continent'?",
            options: ["Africa", "Asia", "Australia", "Antarctica"],
            answer: "Africa",
        },
        {
            group: "General Knowledge",
            question: "Who is the current CEO of Tesla?",
            options: ["Elon Musk", "Jeff Bezos", "Sundar Pichai", "Bill Gates"],
            answer: "Elon Musk",
        },
        {
            group: "General Knowledge",
            question: "Which ocean is the largest in the world?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            answer: "Pacific",
        },

        // Science questions
        {
            group: "Science",
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "H2"],
            answer: "H2O",
        },
        {
            group: "Science",
            question: "What is the human body's largest organ?",
            options: ["Heart", "Liver", "Skin", "Brain"],
            answer: "Skin",
        },
        {
            group: "Science",
            question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            answer: "Carbon Dioxide",
        },
        {
            group: "Science",
            question: "What is the speed of light in a vacuum?",
            options: ["300,000 km/s", "150,000 km/s", "299,792 km/s", "500,000 km/s"],
            answer: "299,792 km/s",
        },
        {
            group: "Science",
            question: "What is the smallest unit of matter?",
            options: ["Atom", "Molecule", "Proton", "Electron"],
            answer: "Atom",
        },
    ];

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
        const answeredCount = groupQuestions.filter((q, idx) => {
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
        setActiveGroupIndex(0);
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
                            {uniqueGroups.map((group, idx) => {
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