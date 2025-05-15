import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
                navigate('/');
            } else {
                setPost(data);
            }
            setIsLoading(false);
        };

        fetchPost();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSaveChanges = async () => {
        if (post.title.trim() === '' || post.content.trim() === '') return;

        const { error } = await supabase
            .from('posts')
            .update({ title: post.title, content: post.content })
            .eq('id', id);

        if (error) {
            console.error('Error updating post:', error);
        } else {
            navigate(`/post/${id}`);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Post</h1>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-semibold">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="4"
                />
            </div>

            <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Save Changes
            </button>
        </div>
    );
}
