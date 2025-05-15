import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error('Error fetching posts:', error);
            else setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">MindSpace 🌿</h1>
                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + New Post
                </Link>
            </div>
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <p className="text-gray-500">No posts yet...</p>
                )}
            </div>
        </div>
    );
}
