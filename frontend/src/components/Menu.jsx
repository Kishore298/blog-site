import axios from "axios"; 
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!cat) {
      console.warn("Category is undefined, skipping fetch");
      return; 
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-site-870t.onrender.com/api/posts/?cat=${cat}`); 
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err); 
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu bg-white p-4 rounded w-full mt-4">
      <h1 className="text-lg font-bold mb-2">Other posts you may like</h1>
      {posts.length === 0 ? (
        <p>No posts found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
          {posts.map((post) => (
            <motion.div 
              className="post bg-gray-100 p-4 rounded shadow" 
              key={post._id}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}   
              transition={{ duration: 2.5 }}    
            >
              <img src={post.img} alt={post.title} className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <Link to={`/posts/${post._id}`}>
                <button className="font-semibold text-lg text-green-600">Read More...</button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;




