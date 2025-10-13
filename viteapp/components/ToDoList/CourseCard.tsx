import "./courseCard.css";
import React, { useState } from "react";

export const CourseCard = ({ course, handleCourseFavoriteChange }) => {
  const {
    id,
    title,
    description,
    duration,
    instructor,
    difficulty,
    status,
    isFavorite,
  } = course;
  const [showReviewInput, setShowReviewInput] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollCount, setEnrollCount] = useState(0);
  const enrollButtonText =
    difficulty === "Beginner" ? "Start Learning Now!" : "Enroll";
  const customiseButtonText =
    status === "completed" ? "Revisit Corse" : "Start Corse";
  const favoriteButtonText = isFavorite ? "Unfavorite" : "Favorite";

  const handleToggleEnroll = () => {
    setIsEnrolled(true);
    setEnrollCount(enrollCount + 1); // 1
    setEnrollCount(enrollCount + 1); // 1

    setEnrollCount((prevEnrollCount) => prevEnrollCount + 1); // 1
    setEnrollCount((prevEnrollCount) => prevEnrollCount + 1); // 2
    // 语法上是同步函数，但是behaviour上是异步的（调用多次会批量batchUpdate执行出于性能考虑）
  };

  const handleToggleReviewInput = () => {
    setShowReviewInput(!showReviewInput);
  };

  return (
    <div className="course-card">
      <h3>{title}</h3>
      {isFavorite && <span>⭐️</span>}
      <p>{description}</p>
      <p>{duration}</p>
      {/* enroll button */}
      {/* onClick is from react events system */}
      <button onClick={handleToggleEnroll}>{enrollButtonText}</button>

      <div>You have enrolled: {enrollCount}</div>
      <button>{customiseButtonText}</button>
      {/* review button */}
      {isEnrolled && (
        <div>
          {showReviewInput && (
            <input type="text" placeholder="leave your review"></input>
          )}
          {
            <button onClick={handleToggleReviewInput}>
              Submit your review
            </button>
          }
        </div>
      )}
      <button onClick={() => handleCourseFavoriteChange(id)}>
        {favoriteButtonText}
      </button>
    </div>
  );
};
// 1. show star icon next to title if favorite
// 2. remove star icon if not favorite
// 3. when click favorite button, toggle favorite status
