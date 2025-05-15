import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <Link to={`/post/${post.id}`}>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                </p>
                <p className="text-sm mt-1">{post.upvotes} upvotes</p>
            </Link>
        </div>
    );
}
