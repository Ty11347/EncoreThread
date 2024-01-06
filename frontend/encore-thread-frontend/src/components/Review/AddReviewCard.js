import React, { useEffect, useState } from "react";
import { FaUser, FaStar } from "react-icons/fa";
import "./ReviewCard.css";
import { useParams, useNavigate } from "react-router-dom";

const AddReviewCard = ({ match }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const { userId, productId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (image) {
      setImage(null);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:3000/api/user/${userId}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const formatDate = () => {
    const now = new Date();
    const isoString = now.toISOString();
    return isoString.substring(0, isoString.indexOf("T"));
  };

  const handleAddReview = async () => {
    // Check if the review textarea is empty
    if (!comment.trim()) {
      alert("Please enter your review before submitting.");
      return;
    }
  
    // Convert the image to base64 code before sending
    const base64Image = image ? image.split(",")[1] : null;
  
    const newReview = {
      id: 0,
      productId: productId,
      userId: userId,
      rating,
      comment,
      commentDate: new Date(),
      imageData: base64Image,
    };
  
    // Perform the action with the new review (e.g., submit to the server or update state)
    try {
      const response = await fetch("http://localhost:3000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
  
      if (response.ok) {
        // Handle success
        console.log("Review added successfully");
        navigate(-1);
      } else {
        // Handle error
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  
    // Clear the form after submitting
    setComment("");
    setRating(0);
    setImage(null);
  };

  return (
    <div className="add-review-card">
      <div className="user-info">
        {user?.profilepic && user?.profilepic.length > 0 ? (
          <div className="default-profile-container">
            <img
              src={user?.profilepic}
              alt={`Profile of ${user?.username}`}
              className="profile-image"
            />
          </div>
        ) : (
          <div className="default-profile-container">
            <FaUser size={24} />
          </div>
        )}
        <span className="username">You</span>
      </div>
      <div className="add-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            color={star <= rating ? "gold" : "gray"}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-area"
        style={{ height: "50px", width: "500px", resize: "none" }} // Set the desired height here
      ></textarea>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {image && (
        <div className="image-container">
          <img src={image} alt="Preview" className="image-preview" />
          <button className="remove-image" onClick={handleRemoveImage}>
            X
          </button>
        </div>
      )}      <button
        onClick={handleAddReview}
        style={{
          width: "auto",
          backgroundColor: "brown",
          borderRadius: "10px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff", // Set the text color to white
          padding: "10px", // Add padding for better appearance
          cursor: "pointer", // Set cursor to pointer for better UX
        }}
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReviewCard;
