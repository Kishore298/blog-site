import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Toast from "../components/Toast";
import { motion } from "framer-motion"; 

const Single = () => {
  const [post, setPost] = useState({});
  const [toast, setToast] = useState({ message: "", type: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
        setToast({ message: "Post loaded successfully!", type: "success" });
      } catch (err) {
        setToast({ message: "Failed to load post.", type: "error" });
        console.error("Failed to fetch post data:", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`);
        setToast({ message: "Post deleted successfully!", type: "success" });
        navigate("/");
      } catch (err) {
        setToast({ message: "Failed to delete post.", type: "error" });
        console.error("Failed to delete post:", err);
      }
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const splitTextIntoParagraphs = (text, wordLimit = 100) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = [];
    let currentParagraph = "";
    for (let sentence of sentences) {
      const newParagraph = currentParagraph
        ? currentParagraph + " " + sentence
        : sentence;
      const wordCount = newParagraph.split(" ").length;

      if (wordCount <= wordLimit) {
        currentParagraph = newParagraph;
      } else {
        if (currentParagraph) {
          paragraphs.push(currentParagraph.trim());
        }
        currentParagraph = sentence;
      }
    }
    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim());
    }
    return paragraphs;
  };

  return (
    <div className="single container mx-auto p-4">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
      <h1 className="text-3xl font-bold mt-5">{post.title}</h1>
      <div className="author-date">
        <span className="text-gray-500">
          {post.uid?.username} on {moment(post.createdAt).format("MMMM Do YYYY")}
        </span>
      </div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }} 
      >
        <img src={post.img} alt={post.title} className="w-full h-96 object-cover rounded mt-5" />
        <div className="content mt-5 mb-5">
          {splitTextIntoParagraphs(getText(post.desc)).map((para, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}  
              transition={{ duration: 2.5 }}    
              className="mb-4"
            >
              {para}
            </motion.p>
          ))}
        </div>
        {currentUser && currentUser._id === post.uid?._id && (
          <div className="actions">
            <Link to={`/write?edit=${postId}`} className="text-blue-600 font-bold">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </Link>
            <button onClick={handleDelete} className="text-red-600 font-bold ml-4">
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </motion.div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;

