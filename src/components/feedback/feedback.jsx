const Feedback = ({ feedback, positivePercentage, totalFeedback }) => {
  return (
    <div>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive feedback percentage: {positivePercentage}%</p>
    </div>
  );
};

export default Feedback;
