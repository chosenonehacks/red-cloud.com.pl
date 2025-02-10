import React, { useState, useEffect } from 'react';

interface SimpleCaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export function SimpleCaptcha({ onValidate }: SimpleCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer('');
    setError(false);
    onValidate(false);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setUserAnswer(answer);
    
    if (answer !== '') {
      const isCorrect = parseInt(answer) === num1 + num2;
      setError(!isCorrect);
      onValidate(isCorrect);
    } else {
      setError(false);
      onValidate(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">
        Prove you're human: What is {num1} + {num2}?
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          value={userAnswer}
          onChange={handleAnswerChange}
          className={`mt-1 block w-32 rounded-md bg-gray-900 border-gray-700 text-white shadow-sm ${
            error ? 'border-red-500' : 'focus:border-red-500'
          } focus:ring-red-500`}
          placeholder="Answer"
        />
        <button
          type="button"
          onClick={generateNewProblem}
          className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          ↻
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">Incorrect answer, please try again</p>
      )}
    </div>
  );
}