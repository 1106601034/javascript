// import React from 'react';
import { useState, useEffect } from "react";

// ---------------------------
// CourseCard Component
// ---------------------------
export function CourseCard() {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showReviewInput, setShowReviewInput] = useState(false);

    const enrollText = isEnrolled ? "Get Started" : "Enroll Now";
    const headerText = isEnrolled ? "Learn More" : "Contact Us";

    const toggleEnrollment = () => setIsEnrolled((prev) => !prev);
    const toggleReviewInput = () => setShowReviewInput((prev) => !prev);

    return (
        <div className="course-card">
            <h2>{headerText}</h2>
            <button onClick={toggleEnrollment}>{enrollText}</button>
            <button onClick={toggleReviewInput} disabled={!isEnrolled}>
                Leave a Review
            </button>
            {showReviewInput && (
                <input type="text" placeholder="Leave a review" aria-label="Review" />
            )}
        </div>
    );
}

// ---------------------------
// MyClock Component
// ---------------------------
export function MyClock() {
    const [time, setTime] = useState(() => new Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="my-clock">
            <h2>My Clock</h2>
            <h3>{time}</h3>
        </div>
    );
}
