interface IPost {
    id: number;
    title: string;
    // Add other fields if needed
}

interface IPosts {
    currentPosts: IPost[];
    loading: boolean;
}

export default function Posts({ currentPosts, loading, }: IPosts) {

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
