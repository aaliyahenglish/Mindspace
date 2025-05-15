import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State for image URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new post
        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    title,
                    content,
                    image_url: imageUrl, // Insert the image URL
                    upvotes: 0
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating post:', error);
        } else {
            console.log('Post created:', data);
            navigate(`/post/${data.id}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-lg font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Content Input */}
                <div>
                    <label htmlFor="content" className="block text-lg font-medium">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        className="w-full p-2 border rounded"
                        rows="6"
                        required
                    />
                </div>

                {/* Image URL Input */}
                <div>
                    <label htmlFor="image-url" className="block text-lg font-medium">Image URL (Optional)</label>
                    <input
                        type="text"
                        id="image-url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}
