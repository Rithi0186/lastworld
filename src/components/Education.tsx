import { useState } from 'react';
import { ArrowLeft, BookOpen, Brain, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { NewsArticle, QuizQuestion } from '../types';
import { ecoTips } from '../data/mockData';

interface EducationProps {
  news: NewsArticle[];
  quiz: QuizQuestion[];
  onNavigate: (page: string) => void;
}

export default function Education({ news, quiz, onNavigate }: EducationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === quiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert(`Quiz complete! Your score: ${score + (selectedAnswer === quiz[currentQuestion].correctAnswer ? 1 : 0)}/${quiz.length}`);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('dashboard')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Education Hub</h1>
        <p className="text-gray-600 mt-1">Learn and grow your eco-knowledge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Latest Eco News</h2>
          </div>
          <div className="space-y-4">
            {news.map(article => (
              <div key={article.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-300 transition-all group cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <button className="text-sm text-green-600 font-medium hover:text-green-700">
                      Read more →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Eco Quiz</h2>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-blue-800">
                Question {currentQuestion + 1} of {quiz.length}
              </span>
              <span className="text-sm font-medium text-blue-800">
                Score: {score}/{quiz.length}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {quiz[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-4">
              {quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                    showResult
                      ? index === quiz[currentQuestion].correctAnswer
                        ? 'bg-green-500 text-white border-2 border-green-600'
                        : index === selectedAnswer
                        ? 'bg-red-500 text-white border-2 border-red-600'
                        : 'bg-white text-gray-700 border-2 border-gray-200'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === quiz[currentQuestion].correctAnswer && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    {showResult && index === selectedAnswer && index !== quiz[currentQuestion].correctAnswer && (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <button
                onClick={nextQuestion}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {currentQuestion < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-800">Eco Tips & Best Practices</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ecoTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">Sustainability Infographics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 text-center border-2 border-green-300 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-full h-48 bg-white rounded-lg mb-4 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Infographic {i}</h3>
              <p className="text-sm text-gray-600">Learn about sustainable practices</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
