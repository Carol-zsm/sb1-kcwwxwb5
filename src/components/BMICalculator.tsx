import React, { useState, useCallback } from 'react';
import { Scale, Ruler } from 'lucide-react';
import { calculateBMI, getBMIMessage } from '../utils/bmi';
import confetti from 'canvas-confetti';

export function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleCalculate = () => {
    if (!height || !weight) {
      setResult('请输入身高和体重哦~');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      setResult('请输入正确的数字哦~');
      return;
    }

    const bmi = calculateBMI(heightNum, weightNum);
    const message = getBMIMessage(bmi);
    setResult(message);

    if (message === "你的身材很标准！棒棒哒~保持哦~") {
      triggerConfetti();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        身材小计算器
      </h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center text-lg font-medium text-gray-700">
            <Ruler className="w-5 h-5 mr-2 text-blue-500" />
            身高 (厘米)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="请输入身高"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-lg font-medium text-gray-700">
            <Scale className="w-5 h-5 mr-2 text-blue-500" />
            体重 (千克)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="请输入体重"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          计算 BMI
        </button>

        {result && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg">
            <p className="text-center text-2xl font-bold text-blue-800 animate-bounce">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}