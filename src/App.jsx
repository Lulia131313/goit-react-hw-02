import { useEffect, useState } from "react";
import Feedback from "./components/feedback/feedback";
import Notification from "./components/notification/notification";
import Options from "./components/options/options";

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

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
  const positivePercentage = Math.round((good / totalFeedback) * 100);
  console.log(positivePercentage);

  // useEffect(() => {
  //   const storedFeedback = JSON.parse(localStorage.getItem("feedback"));
  //   if (storedFeedback) {
  //     setFeedback(storedFeedback);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
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
        <Feedback feedback={feedback} positivePercentage={positivePercentage} />
      ) : (
        <Notification message="No feedback yet." />
      )}
    </>
  );
};

export default App;
