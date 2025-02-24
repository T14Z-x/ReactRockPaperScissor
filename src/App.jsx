import { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import Confetti
import rockImg from "./assets/rock.png";
import paperImg from "./assets/paper.png";
import scissorsImg from "./assets/scissors.png";

const choices = [
  { name: "rock", img: rockImg },
  { name: "paper", img: paperImg },
  { name: "scissors", img: scissorsImg },
];

function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [winner, setWinner] = useState(""); // To track overall winner

  const playGame = (choice) => {
    if (winner) return; // Stop the game if someone has won

    const computerRandom = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerRandom);
    determineWinner(choice.name, computerRandom.name);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a tie!");
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      setResult("You Win!");
      updateScore("user");
    } else {
      setResult("You Lose!");
      updateScore("computer");
    }
  };

  const updateScore = (winner) => {
    setScore((prevScore) => {
      const newScore = {
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      };

      // Check if anyone reaches 3 points
      if (newScore.user === 3) {
        setWinner("You Win the Game! 🎉");
      } else if (newScore.computer === 3) {
        setWinner("Computer Wins the Game! 😢");
      }

      return newScore;
    });
  };

  const resetGame = () => {
    setScore({ user: 0, computer: 0 });
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setWinner("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white text-center p-6">
      {winner && <Confetti />} {/* Show confetti when there is a winner */}

      <h1 className="text-4xl font-extrabold mb-6">Rock Paper Scissors</h1>

      {winner ? (
        <div>
          <h2 className="text-3xl font-bold text-green-400">{winner}</h2>
          <button
            onClick={resetGame}
            className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="flex space-x-6 mb-8">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => playGame(choice)}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
              >
                <img src={choice.img} alt={choice.name} className="w-24 h-24" />
              </button>
            ))}
          </div>

          {userChoice && computerChoice && (
            <div className="mt-6 text-lg">
              <p>You chose: {userChoice.name}</p>
              <img
                src={userChoice.img}
                alt={userChoice.name}
                className="w-24 h-24 mx-auto"
              />
              <p>Computer chose: {computerChoice.name}</p>
              <img
                src={computerChoice.img}
                alt={computerChoice.name}
                className="w-24 h-24 mx-auto"
              />
              <h2 className="text-3xl font-bold mt-4">{result}</h2>
            </div>
          )}

          <div className="mt-8 text-xl">
            <p>Your Score: {score.user}</p>
            <p>Computer Score: {score.computer}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
