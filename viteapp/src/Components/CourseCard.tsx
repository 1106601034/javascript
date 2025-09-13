import React, { useState, useEffect } from 'react';

function CourseCard(difficulty: string) {
    const [isEnrolled, setEnrolled] = useState(false);
    const [showReviewInput, setShowReviewInput] = useState(false);

    const enrollText = difficulty === 'beginner' ? 'Get Started' : 'Enroll Now';
    const buttonText = difficulty === 'beginner' ? 'Learn more' : 'Contace us';

    const handleClickRerool = () => { setEnrolled(true); }
    return (
        <div className='courseCard'>
            <h2>Course title</h2>
            <button onClick={handleClickRerool}>{enrollText}</button>
            <button>{buttonText}</button>
            <button>Leave a review</button>
            <input type="text" placeholder='Leave a review'></input>
        </div>
    )
}

export default CourseCard;