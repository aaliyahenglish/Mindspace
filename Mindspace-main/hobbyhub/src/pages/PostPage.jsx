import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();
            if (error) console.error(error);
            else setPost(data);
        };

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });
            if (error) console.error(error);
            else setComments(data);
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const handleUpvote = async () => {
        const { data, error } = await supabase
            .from('posts')
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id)
            .select()
            .single();
        if (error) console.error(error);
        else setPost(data);
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        const { data: insertedComment, error } = await supabase
            .from('comments')
            .insert([{
                post_id: id,
                content: newComment
            }])
            .select()
            .single();
        if (error) {
            console.error('Error adding comment:', error);
        } else {
            setComments((prevComments) => [...prevComments, insertedComment]);
            setNewComment('');
        }
    };

    const handleBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    const handleHome = () => {
        navigate('/'); // Navigate to the home page (root route)
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    async function handleDelete() {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting post:', error);
        } else {
            console.log('Post deleted successfully');
            navigate('/');
        }
    }

    if (!post) return <p>Loading...</p>;

    // Log the image URL to check if it's valid
    console.log(post.image_url);  // Check the image URL

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* Home Button */}
            <button onClick={handleHome} className="home-button">
                Home
            </button>

            {/* Back Button */}
            <button onClick={handleBack} className="back-button">
                Back
            </button>

            {/* Post Content */}
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                {new Date(post.created_at).toLocaleString()} · {post.upvotes} upvotes
            </p>
            <p className="mb-6">{post.content}</p>

            {/* Post Image (with class 'post-image') */}
            {post.image_url && (
                <img
                    src={post.image_url}  // Image URL from the post data
                    alt={post.title}
                    className="post-image"  // Applying the CSS class for styling
                />
            )}
            {/* Fallback image if no image URL exists */}
            {!post.image_url && (
                <img
                    src="path_to_default_image.jpg"  // Path to a default image if none exists
                    alt="Default Image"
                    className="post-image"
                />
            )}

            {/* Edit and Delete Buttons */}
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleEdit}
                    className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-500'
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                    Delete
                </button>
            </div>

            {/* Upvote Button */}
            <button
                onClick={handleUpvote}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
            >
                Upvote
            </button>

            <hr className="my-6" />

            {/* Comments Section */}
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <div className="space-y-2 mb-4">
                {comments.map((c) => (
                    <div key={c.id} className="border p-2 rounded bg-white shadow-sm">
                        <p className="text-sm">{c.content}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(c.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Add Comment Section */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Post
                </button>
            </div>
        </div>
    );
}
