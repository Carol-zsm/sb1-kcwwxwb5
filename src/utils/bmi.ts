export function calculateBMI(heightCm: number, weightKg: number): number {
  // Convert height from cm to meters
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMIMessage(bmi: number): string {
  if (bmi < 18.5) {
    return "太瘦啦，多长点肉才好呀~";
  } else if (bmi <= 24) {
    return "你的身材很标准！棒棒哒~保持哦~";
  } else {
    return "有点胖哦，你得减减肥啦~";
  }
}