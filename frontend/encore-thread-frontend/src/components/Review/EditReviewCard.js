import React, { useState, useEffect } from "react";
import { FaUser, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./ReviewCard.css";

const EditReviewCard = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [review, setReview] = useState(null);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData(reviewId);
  }, [reviewId]);

  useEffect(() => {
    if (review) {
      fetchUserData(review.userId);
    }
  }, [review]);

  const fetchData = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/get?id=${reviewId}`
      );

      if (response.ok) {
        const reviewData = await response.json();
        console.log("Review Data:", reviewData);
        setReview(reviewData);

        setComment(reviewData.comment);
        setRating(reviewData.rating);
      } else {
        console.error("Failed to fetch review");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserData = async (userId) => {
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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (event.target.value === "") {
      setImage(null);
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateReview = async () => {
    let updatedImageData = null;

    if (image) {
      updatedImageData = image.split(",")[1];
    } else if (review?.imageData) {
      updatedImageData = review.imageData;
    }

    const updatedReview = {
      id: reviewId,
      productId: review.productId,
      userId: review.userId,
      rating: rating,
      comment: comment,
      commentDate: new Date(),
      imageData: updatedImageData, 
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/update?id=${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        }
      );

      if (response.ok) {
        console.log("Review updated successfully");
        navigate(-1);
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }

    setComment("");
    setRating(0);
    setImage(null);
  };

  const handleRemoveImage = () => {
    if (!image && review?.imageData) {
      setImage(null);
      setReview((prevReview) => ({
        ...prevReview,
        imageData: null,
      }));
    } else {
      setImage(null);
    }
  };

  return (
    <div className="edit-review-card">
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
        style={{ height: "50px", width: "500px", resize: "none" }}
      ></textarea>
      <input
        type="file"
        onChange={handleImageChange}
        onClick={() => setImage(null)} 
        accept="image/*"
      />
      {review?.imageData && !image && (
        <div className="image-container">
          <img
            src={`data:image/jpeg;base64,${review.imageData}`}
            alt="Review"
            className="image-preview"
          />
          <button className="remove-image" onClick={handleRemoveImage}>
            X
          </button>
        </div>
      )}
      {image && (
        <div className="image-container">
          <img src={image} alt="Preview" className="image-preview" />
          <button className="remove-image" onClick={handleRemoveImage}>
            X
          </button>
        </div>
      )}
      <button
        onClick={handleUpdateReview}
        style={{
          width: "auto",
          backgroundColor: "brown",
          borderRadius: "10px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Update Review
      </button>
    </div>
  );
};

export default EditReviewCard;
