import React, { useState, useEffect } from "react";
import { FaUser, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "./ReviewCard.css";

const EditReviewCard = ({ match }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [review, setReview] = useState(null);
  const { reviewId } = useParams();
  const navigate  = useNavigate();

  useEffect(() => {
    fetchData(reviewId);
  }, [reviewId]);

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

  const handleUpdateReview = async () => {
    const base64Image = image ? image.split(",")[1] : null;

    const updatedReview = {
      id: reviewId,
      productId: review.productId,
      userId: review.userId,
      rating: rating,
      comment: comment,
      commentDate: new Date(),
      imageData: base64Image,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/reviews/update?id=${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      });

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

  return (
    <div className="edit-review-card">
      <div className="user-info">
        <div
          className="default-profile-container"
          style={{ marginLeft: "10px", marginTop: "15px" }}
        >
          <FaUser size={24} />
        </div>
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
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {image && <img src={image} alt="Preview" className="image-preview" />}
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
