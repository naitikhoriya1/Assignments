import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  _id: string;
  text: string;
  author: { _id: string, name: string };
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="p-4 my-4 bg-white rounded-lg shadow-md">
      <p className="text-lg">{post.text}</p>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <Link to={`/profile/${post.author._id}`} className="font-bold hover:underline">
          By: {post.author.name}
        </Link>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostCard;
