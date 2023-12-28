import { useState, useRef } from 'react'

const Profile = ()=>{
    const [userProfile, setUserProfile] = useState(null)
    const[isOpen, setIsOpen] = useState(false);
    const profileImage = useRef(null)
  
    const openChooseImage = () => {
      profileImage.current.click()
    }

    const onOpen = () => {
      setIsOpen(true); // Function to open the modal
    };

    const onClose = () => {
      setIsOpen(false); // Function to close the modal
    };


  const changeProfileImage = event => {
      const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
      const selected = event.target.files[0]
  
      if (selected && ALLOWED_TYPES.includes(selected.type)) {
        let reader = new FileReader()
        reader.onloadend = () => setUserProfile(reader.result)
        return reader.readAsDataURL(selected)
      }
  
      onOpen()
  }

    return (
      <div className="profile-container">
        <div className="avatar-container">
          <img
            className="avatar"
            src={userProfile || '/admin.jpg'}
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