import React, { useState } from 'react';
import axios from 'axios';

interface CreatePostFormProps {
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post('/api/posts', { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 my-6 bg-white rounded-lg shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="w-full px-4 py-2 mt-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
