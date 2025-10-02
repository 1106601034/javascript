import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import axios from "axios";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const url = "https://jsonplaceholder.typicode.com/posts";
            const response = await axios.get(url);
            setPosts(response.data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1 className="text-primary">My Blog</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Posts />
            )}
            <Pagination />
        </div>
    );
}
