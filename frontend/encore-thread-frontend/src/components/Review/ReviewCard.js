import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa"; // Import the edit and delete icons
import Modal from "react-modal";
import "./ReviewCard.css";

// Helper function to generate star icons based on rating
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

Modal.setAppElement("#root"); // Set the root element for accessibility

function ReviewCard({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchData = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reviews/get/product?productId=${productId}`
      );

      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData);

        // Fetch user data for each review
        const userPromises = reviewsData.map(async (review) => {
          try {
            const userResponse = await fetch(
              `http://localhost:3000/api/user/${review.userId}`
            );

            if (userResponse.ok) {
              const userData = await userResponse.json();
              return userData;
            } else {
              console.error("Failed to fetch user");
              return null;
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            return null;
          }
        });

        // Wait for all user data promises to resolve
        const usersData = await Promise.all(userPromises);
        setUser(usersData);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(productId);
  }, [productId]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  const handleEdit = (reviewId) => {
    // Implement the edit functionality as needed
    console.log(`Editing review with ID ${reviewId}`);
  };

  const handleDelete = (reviewId) => {
    // Implement the delete functionality as needed
    console.log(`Deleting review with ID ${reviewId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            {/* <span className="edit-delete-icons">
              <FaEdit
                className="icons"
                color="green"
                size={35}
                onClick={() => handleEdit(review.id)}
              />
              <FaTrash
                className="icons"
                color="red"
                size={35}
                onClick={() => handleDelete(review.id)}
              />
            </span> */}
            <div className="user-info">
              {user[index]?.profilepic && user[index]?.profilepic.length > 0 ? (
                <div className="profile-image-container">
                  <img
                    src={`data:image/png;base64,${user[index]?.username}`}
                    alt={`Profile of ${user[index]?.username}`}
                    className="profile-image"
                  />
                </div>
              ) : (
                <div className="default-profile-container">
                  <FaUser size={24} />
                </div>
              )}
              <span className="username">
                {user[index]?.username || "Anonymous User"}
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
      ))}
    </div>
  );
}

export default ReviewCard;