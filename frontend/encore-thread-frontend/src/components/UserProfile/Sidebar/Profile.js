import { useState, useRef, useEffect  } from 'react'
import { useSelector } from 'react-redux';

const Profile = ()=>{
  const [userProfile, setUserProfile] = useState(null)
  const[isOpen, setIsOpen] = useState(false);
  const profileImage = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null);
  const [previousProfilepic, setPreviousProfilepic] = useState(null);
  const userId= useSelector(state => state.user.user.id);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.profilepic) {
            setUserProfile(data.profilepic);
            setPreviousProfilepic(data.profilepic);
          }
        } else {
          console.error('Failed to fetch user profile', response.status);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const onOpen = () => {
    setIsOpen(true); 
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const changeProfileImage = event => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        const base64Image = reader.result;
        setUserProfile(base64Image);
        setSelectedImage(base64Image);
      };
      reader.readAsDataURL(selected);
    }else{
      setPreviousProfilepic(userProfile);
      onOpen();
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      uploadImage(selectedImage);
    } else {
      // Handle the case where no image is selected
      console.error("No image selected for upload");
    }
  };

  const uploadImage = async (base64Image) => {
    const imageData = {
      profilepic: base64Image
    };

    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/update/profilepic`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });

      if (response.ok) {
        console.log("Image updated successfully");
      } else {
        console.error("Failed to update image", response.status);
        setUserProfile(previousProfilepic);
      }
    } catch (error) {
      console.error("Error updating image:", error);
      setUserProfile(previousProfilepic);
    }
  };

  return (
    <div className="profile-container">
      <div className="avatar-container">
        <img
            className="avatar"
            src={userProfile}
            alt="Admin"
            onClick={() => profileImage.current.click()}
        />
      </div>
      <input
        hidden
        type="file"
        ref={profileImage}
        onChange={changeProfileImage}
      />
      <button onClick={handleUpload}>Upload Image</button>
      <div className={`modal ${isOpen ? 'show' : ''}`}>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Something went wrong</h2>
            <button onClick={onClose} className="modal-close-button">X</button>
          </div>
          <div className="modal-body">
            <p>File not supported!</p>
            <div className="badge-container">
              <span className="badge">PNG</span>
              <span className="badge">JPG</span>
              <span className="badge">JPEG</span>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
