import React, { useState } from "react";

export default function FetchPostList() {
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
                    <li key={post.id} className="list-group-item">
                        <div className="d-flex justify-content-start">
                            <span>{post.id}</span>
                            .&nbsp;
                            <span>{post.title}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}