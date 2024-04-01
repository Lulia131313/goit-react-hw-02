import { useEffect, useState } from "react";
import Feedback from "./components/feedback/feedback";
import Notification from "./components/notification/notification";
import Options from "./components/options/options";
import "./App.css";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const saveFeedback = JSON.parse(localStorage.getItem("feedback"));
    if (saveFeedback && Object.keys(saveFeedback).length) {
      return saveFeedback;
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  const handleFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const { good, neutral, bad } = feedback;
  const totalFeedback = good + neutral + bad;
  console.log(totalFeedback);
  const positivePercentage = Math.round((good / totalFeedback) * 100);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className="app-container">
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options
        handleFeedback={handleFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          positivePercentage={positivePercentage}
          totalFeedback={totalFeedback}
        />
      ) : (
        <Notification message="No feedback yet." />
      )}
    </div>
  );
};

export default App;
