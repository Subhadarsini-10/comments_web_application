import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [name, setName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userName = prompt("Enter your name:");
    if (userName) {
      setName(userName);
      setShowWelcome(true);
    }
  };

  const handleContinueClick = () => {
    navigate("/comments", { state: { userName: name } });
  };

  return (
    <div className="home-container">
      <div style={{fontSize: "80px"}}>Home</div>
      <p>Enter your name to continue!</p>
      {!showWelcome ? (
        <form onSubmit={handleFormSubmit}>
          <button type="submit" className="enter-button">
            Enter your name
          </button>
        </form>
      ) : (
        <div>
          <p className="welcome-message">Welcome, {name} 🎉!</p>
          <button onClick={handleContinueClick} className="continue-button">
            Continue to Comments
          </button>
        </div>
      )}
    </div>
  );
};
