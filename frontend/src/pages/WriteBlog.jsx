import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Toast from "../components/Toast";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [imgUrl, setImgUrl] = useState(state?.img || ""); 
  const [cat, setCat] = useState(state?.cat || "");
  const [toast, setToast] = useState({ message: "", type: "" });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef(null);

const handleClick = async (e) => {
  e.preventDefault();


  if (!title || !value || !cat || !imgUrl) {
      setError("All fields are required.");
      setToast({ message: "All fields are required.", type: "error" });
      return;
  }

  const postData = {
      title,
      desc: value,
      cat,
      img: imgUrl,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) {
      console.error("No token found. User may not be authenticated.");
      setError("You must be logged in to create a post.");
      setToast({ message: "You must be logged in to create a post.", type: "error" });
      return;
  }

  try {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      if (state && state._id) {
          await axios.put(
              `http://localhost:5000/api/posts/${state._id}`,
              postData,
              config
          );
          setToast({ message: "Post updated successfully!", type: "success" });
      } else {
          await axios.post(
              "http://localhost:5000/api/posts",
              postData,
              config
          );
          setToast({ message: "Post created successfully!", type: "success" });
      }

      setTimeout(() => {
          navigate("/");
      }, 2000);
      
  } catch (err) {
      console.error("Error posting blog:", err.response || err);
      setError("Failed to publish post. Please try again.");
      setToast({ message: "Failed to publish post.", type: "error" });
  }
};
  
  return (
    <div className="h-fit-content flex flex-col items-center justify-center">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
      <h2 className="text-3xl font-bold mb-6">Write New Blog</h2>
      <form
        className="max-w-2xl w-full bg-green-600 p-6 rounded-lg shadow-md"
        onSubmit={handleClick}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4 ">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)} 
            placeholder="Image URL"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
        <div className="mb-4">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Cinema">Cinema</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Science">Science</option>
          </select>
        </div>

        <button
  type="submit"
  className="bg-black text-green-600 py-2 px-4 rounded"
>
  {state && state.id ? "Edit" : "Publish"}
</button>

      </form>
      {imgUrl && (
        <div className="mt-4">
          <img
            src={imgUrl} 
            alt="Uploaded"
            className="w-48 h-auto mb-5"
          />
        </div>
      )}
    </div>
  );
};

export default Write;


