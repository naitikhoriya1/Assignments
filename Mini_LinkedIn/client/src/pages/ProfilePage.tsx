import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

interface User {
  name: string;
  email: string;
}

interface Post {
  _id: string;
  text: string;
  author: { _id: string, name: string };
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const [userResponse, postsResponse] = await Promise.all([
          axios.get(`/api/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`/api/users/${userId}/posts`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setUser(userResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile data', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 my-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <h3 className="text-2xl font-bold">Posts</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
