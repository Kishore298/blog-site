import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
  className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-3 rounded shadow-lg ${
    type === "success" ? "bg-green-500 text-white" : "bg-black text-red-600"
  }`}
>
  {message}
</div>

  );
};

export default Toast;


