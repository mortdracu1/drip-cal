"use client";
import { useState, useEffect } from 'react';

const brandOptions = {
  top: ['Bluorng', 'Jaywalking', 'Polite Society', 'Kartik Research', 'Kardo', 'Almost Gods', 'Stylo Label', 'Other Streetwear', 'Not Streetwear'],
  bottom: ['Bluorng', 'Jaywalking', 'Polite Society', 'Kartik Research', 'Kardo', 'Almost Gods', 'Stylo Label', 'Other Streetwear', 'Not Streetwear'],
  shoes: ['Asics', 'Nike', 'Reebok', 'Puma', 'New Balance', 'Adidas', 'Gully Labs', 'Other']
};

export default function Home() {
  const [topBrand, setTopBrand] = useState('');
  const [bottomBrand, setBottomBrand] = useState('');
  const [shoesBrand, setShoesBrand] = useState('');
  const [age, setAge] = useState('');
  const [dripScore, setDripScore] = useState(null);
  const [evaluationText, setEvaluationText] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    console.log('Component mounted or updated');
    console.log('dripScore:', dripScore);
    console.log('evaluationText:', evaluationText);
  }, [dripScore, evaluationText]);

  const calculateDripScore = () => {
    const brandScores = {
      'Bluorng': 2, 'Jaywalking': 2, 'Polite Society': 8, 'Kartik Research': 8, 
      'Kardo': 5, 'Almost Gods': 3, 'Stylo Label': 5, 'Other Streetwear': 3, 
      'Not Streetwear': 9,
      'Asics': 7, 'Nike': 2, 'Reebok': 4, 'Puma': 2, 'New Balance': 5, 
      'Adidas': 2, 'Gully Labs': 5, 'Other': 9
    };

    const topScore = brandScores[topBrand] || 0;
    const bottomScore = brandScores[bottomBrand] || 0;
    const shoesScore = brandScores[shoesBrand] || 0;

    let averageScore = (topScore + bottomScore + shoesScore) / 3;

    const userAge = parseInt(age);

    let finalScore;
    if (userAge >= 1 && userAge <= 29) {
      finalScore = Math.round(averageScore * 10) / 10;
    } else if (userAge >= 30 && userAge <= 59) {
      finalScore = Math.round(averageScore * (userAge / 100) * 10) / 10;
    } else if (userAge >= 60) {
      finalScore = Math.round(averageScore * userAge * 10) / 10;
    } else {
      return userAge === 0 ? "zero" : "invalid";
    }
    
    console.log("Final calculated score:", finalScore);
    return finalScore;
  };

  const getDripEvaluation = (score) => {
    const numScore = Number(score);
    if (numScore <= 1) {
      return "Think about life insurance. Not drip. There's more to life than the clothes you wear. What's worse is that you're trying too hard.";
    } else if (numScore <= 2) {
      return "Non-existent drip. Yo where you at? You've camouflaged into the crowd.";
    } else if (numScore <= 3) {
      return "Delhi boy drip. Business mein dimaag laga. Drip tere bas ki baat nahi hai.";
    } else if (numScore <= 4) {
      return "Weak drip. Jaake 2 milds lekar aa";
    } else if (numScore <= 5) {
      return "Mid drip. The journey ahead is long and tough. Also, the glass is looking half empty.";
    } else if (numScore <= 6) {
      return "Mid drip. The journey ahead is long and tough. But the glass is looking half full.";
    } else if (numScore <= 7) {
      return "Tastyyy. You've got style and that isn't easy to come by";
    } else if (numScore <= 8) {
      return "It's getting hot in here. Mere mortals could only wish to be this drippy.";
    } else if (numScore <= 9) {
      return "You're making Virgil blush. Take it easy hombre. Leave some drip for the rest of us.";
    } else {
      return "Illegal levels of drip. So what if the knees don't work, the hair's all white and dementia is kicking in? You know how to stay fresh and that's all that matters.";
    }
  };

  const getScoreColor = (score) => {
    if (score === "zero" || score === "invalid") return "text-gray-800";
    const numScore = Number(score);
    if (numScore > 9) return "text-purple-600";
    if (numScore > 7) return "text-green-600";
    if (numScore > 5) return "text-blue-600";
    if (numScore > 3) return "text-yellow-600";
    if (numScore > 1) return "text-orange-600";
    return "text-red-600";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topBrand || !bottomBrand || !shoesBrand || age === '') {
      alert("Please fill in all fields before calculating your drip score.");
      return;
    }
    const score = calculateDripScore();
    const evaluation = getDripEvaluation(score);
    console.log("Calculated score:", score);
    console.log("Evaluation:", evaluation);
    setDripScore(score);
    setEvaluationText(evaluation);
    // Force re-render
    setForceUpdate(prev => !prev);
  };

  console.log('Rendering component:', { dripScore, evaluationText });

  return (
<main 
  className="flex min-h-screen flex-col items-center justify-center p-8 bg-cover bg-center bg-no-repeat" 
  style={{backgroundImage: `url('https://i.ibb.co/HnwhD1h/TV-Jan-Cover-2022-HEADER.webp')`}}
>
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Drip Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topBrand">
              Top Brand
            </label>
            <select
              id="topBrand"
              value={topBrand}
              onChange={(e) => setTopBrand(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Top Brand</option>
              {brandOptions.top.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bottomBrand">
              Bottom Brand
            </label>
            <select
              id="bottomBrand"
              value={bottomBrand}
              onChange={(e) => setBottomBrand(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Bottom Brand</option>
              {brandOptions.bottom.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shoesBrand">
              Shoes Brand
            </label>
            <select
              id="shoesBrand"
              value={shoesBrand}
              onChange={(e) => setShoesBrand(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Shoes Brand</option>
              {brandOptions.shoes.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your age"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Calculate Drip Score
            </button>
          </div>
          </form>
        <div className="mt-8 text-center">
          {dripScore !== null && (
            <>
              <h2 className={`text-3xl font-bold mb-4 ${getScoreColor(dripScore)}`}>
                Your Drip Score: {dripScore}
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-xl mb-2 font-bold">Evaluation:</p>
                <p className="text-lg text-green-600">{evaluationText}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}