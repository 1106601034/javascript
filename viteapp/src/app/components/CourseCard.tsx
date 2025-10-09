import { useState, useEffect } from 'react';
interface ICourseCardProps { difficulty:string}
// props
const CourseCard = ({ difficulty }:ICourseCardProps) => {
  // state and SetState
  const [isEnrolled, setEnrolled] = useState(false);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [enrollCount, setEnrollCount] = useState(0);

  // any JS code
  const enrollText =
    difficulty === 'beginner' ? 'Start Learning Now!' : 'Enroll Now';
  const buttonText = difficulty === 'beginner' ? 'Learn more' : 'Contact us';

  // event handlers for onClick, onChange
  const handleClickEnroll = () => {
    setEnrolled(true);
    // Batch Update

    // is setState async or sync?
    // setState is a sync function, but the batch update behind the scenes makes it like async behaviour.
    setEnrollCount((prev) => prev + 1);
    setEnrollCount((prev) => prev + 1);
    setEnrollCount((prev) => prev + 1);
    // setEnrollCount(enrollCount + 2);
    // setEnrollCount(enrollCount + 1);
    console.log('Enroll clicked', enrollCount);
  };

  const handleLeaveReview = () => {
    setShowReviewInput(true);
  };

  // useEffect (3 life cycles: componentDidMount, componentDidUpdate, componentWillUnmount)
  useEffect(() => {
    console.log('Component mounted 1');
    setEnrollCount((prev) => prev + 1);
    console.log('Component updated', enrollCount);
    return () => {
      console.log('Component unmounted');
    };
  }, [enrollCount]);

  return (
    <div>
      <h2>Course title</h2>
      <h3>Enrollments: {enrollCount}</h3>
      <button onClick={handleClickEnroll}>{enrollText}</button>
      <button>{buttonText}</button>
      {isEnrolled && (
        <div>
          {showReviewInput ? (
            <input type="text" placeholder="Write your review..." />
          ) : (
            <button onClick={handleLeaveReview}>Leave a review</button>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
