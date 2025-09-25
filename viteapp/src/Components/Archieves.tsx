// import React from 'react';
import { useState, useEffect } from "react";

// ---------------------------
// Sign In to show Input
// ---------------------------
export function SignInToShowInput() {
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

// ---------------------------
//  fetch and post list
// ---------------------------
export function FetchPostList() {
    type Post = { id: number; title: string };
    const [posts, setPostList] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasFetched, setHasFetched] = useState(false);

    const handleFetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        setHasFetched(true);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data: Post[] = await response.json();
            setPostList(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(`Error fetching posts: ${message}`);
            setPostList([]);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonLabel = isLoading ? "Loading..." : posts.length > 0 ? "Refresh Posts" : "Load Posts";

    return (
        <div className="post-list">
            <h2>Post List</h2>
            <button type="button" className="btn btn-primary" onClick={handleFetchPosts} disabled={isLoading}>
                {buttonLabel}
            </button>
            {error && <p>{error}</p>}
            {!error && hasFetched && !isLoading && posts.length === 0 && <p>No posts to display.</p>}
            <ul className="list-group">
                {posts.map((post) => (
                    <li key={post.id} className="list-group-item">{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
