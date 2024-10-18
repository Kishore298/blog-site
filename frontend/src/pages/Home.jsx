import React, { useEffect, useState } from "react";     
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";
import { motion } from "framer-motion"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const cat = useLocation().search; 

  useEffect(() => {
    console.log("Category:", cat);
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-site-870t.onrender.com/api/posts${cat}`);
        console.log("Response data:", res.data);
        setPosts(res.data);

        if (res.data.length === 0) {
          setToast({ message: "No posts yet!", type: "info" });
        } else {
          setToast({ message: "Posts fetched successfully!", type: "success" });
        }
      } catch (err) {
        setToast({ message: "Failed to fetch posts.", type: "error" });
        console.error("Error fetching posts:", err); 
      }
    };

    fetchData();
  }, [cat]);

  return (
    <div className="container mx-auto">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Recent Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-xl font-bold text-gray-600">No posts to show...</h2>
          <Link
            to="/write"
            className="inline-block underline text-blue-600 py-2 px-4 rounded-lg mt-4"
          >
            You Can Try Adding Posts Here...
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
          {posts.map((post) => (
            <motion.div 
              key={post._id} 
              className="flex flex-col place-items-center bg-white p-4 rounded-lg shadow" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}   
              transition={{ duration: 2.5 }}    
            >
              <img src={post.img} alt={post.title} className="w-full h-2/3 mt-3 mb-4" />
              <h2 className="text-black text-xl text-center mt-3">{post.title}</h2>
              <div className="text-gray-500 text-sm text-center mt-3 mb-3">
                Posted by <span className="font-semibold text-blue-600">{post.uid?.username}</span> on {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <p className="text-green-600 mb-5 text-center">
                {post.desc.length > 150 ? (
                  <span dangerouslySetInnerHTML={{ __html: `${post.desc.slice(0, 150)}...` }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: post.desc }} />
                )}
              </p>
              {post.desc.length > 150 && (
                <Link to={`/posts/${post._id}`} className="bg-black text-green-600 py-2 px-4 mt-2 rounded-lg">
                  Read More
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;













