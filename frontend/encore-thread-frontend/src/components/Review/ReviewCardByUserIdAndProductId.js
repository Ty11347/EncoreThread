import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import "./ReviewCard.css";
import EditReviewCard from "./EditReviewCard";

Modal.setAppElement("#root");

function ReviewCardByUserIdAndProductId({ userId, productId }) {
  const [review, setReview] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "gold" : "gray" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const fetchData = async (userId, productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/get/user/product?userId=${userId}&productId=${productId}`
      );

      if (response.ok) {
        const reviewData = await response.json();
        console.log("Review Data:", reviewData);
        setReview(reviewData);

        // Fetch user data for the review
        try {
          const userResponse = await fetch(
            `http://localhost:3000/api/user/${reviewData.userId}`
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
      } else {
        console.error("Failed to fetch review");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(userId, productId);
  }, [userId, productId]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    // Ask for confirmation before proceeding
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/delete?id=${review.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Review deleted successfully");
        alert("Your review has been deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {review && (
        <div className="review-card">
          <div className="review-header">
            <span className="edit-delete-icons">
              <Link to={`/edit/${review.id}`} params={{ reviewId: review.id }}>
                <FaEdit
                  className="icons"
                  color="green"
                  size={35}
                  // onClick={handleEdit}
                />
              </Link>
              <FaTrash
                className="icons"
                color="red"
                size={35}
                onClick={handleDelete}
              />
            </span>
            <div className="user-info">
              {user?.profilepic && user?.profilepic.length > 0 ? (
                <div className="profile-image-container">
                  <img
                    src={`data:image/png;base64,${user?.username}`}
                    alt={`Profile of ${user?.username}`}
                    className="profile-image"
                  />
                </div>
              ) : (
                <div className="default-profile-container">
                  <FaUser size={24} />
                </div>
              )}
              <span className="username">
                {user?.username || "Anonymous User"}
              </span>
              <span className="date">{formatDate(review.commentDate)}</span>
            </div>
          </div>
          <div className="rating">{renderStars(review.rating)}</div>
          <p className="body">{review.comment}</p>
          {review.imageData && review.imageData.length > 0 && (
            <div className="image-list">
              <img
                src={`data:image/png;base64,${review.imageData}`}
                alt={`Image 1`}
                className="review-image"
                onClick={() =>
                  openModal(`data:image/png;base64,${review.imageData}`)
                }
              />
            </div>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Image Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
              content: {
                width: "80%",
                height: "80%",
                margin: "auto",
                border: "none",
                borderRadius: "8px",
                padding: "0",
                background: "none",
                overflow: "hidden",
              },
            }}
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Magnified Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "#fff",
              }}
            >
              &#x2715;
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default ReviewCardByUserIdAndProductId;