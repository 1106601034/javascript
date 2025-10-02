interface Post {
    id: number;
    title: string;
    // Add other fields if needed
}

export default function Posts({ currentPosts, loading }: { currentPosts: Post[]; loading: boolean }) {
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <ul className="list-group">
            {currentPosts.map(post => (
                <li key={post.id} className="list-group-item">{post.id}. {post.title}
                </li>
            ))}
        </ul>
    );
}
