import { useState } from "react";

export default function SignInToShowInput() {
    const [isSignedIn, setisSignedIn] = useState(false);
    const [showReviewInput, setShowReviewInput] = useState(false);

    const signInText = isSignedIn ? "Sign Out" : "Sign In";
    const headerText = isSignedIn ? "Hello User" : "Hello guest";

    const toggleEnrollment = () => {
        setisSignedIn((prev) => {
            // auto-close review
            if (prev) setShowReviewInput(false);
            return !prev;
        });
    };

    const toggleReviewInput = () => setShowReviewInput((prev) => !prev);

    return (
        <div className="course-card">
            <h2>{headerText}</h2>
            <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={toggleEnrollment}>{signInText}</button>
                <button type="button" className="btn btn-primary" onClick={toggleReviewInput} disabled={!isSignedIn}>
                    Leave a feedback
                </button>
            </div>
            {showReviewInput && (
                <input type="text" className="form-control" placeholder="Leave a feedback" aria-label="feedback" />
            )}
        </div>
    );
}