import { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import axios from "axios";
import './Blog.scss';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const goToNextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const goToPrevPage = () => setCurrentPage(prevPage => prevPage - 1);

    return (
        <div>
            <h1 className="text-primary">My Blog</h1>
            <Posts
                currentPosts={currentPosts}
                loading={loading}
            />
            <Pagination
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                totalPosts={posts.length}
                paginate={paginate}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
            />
        </div>
    );
}