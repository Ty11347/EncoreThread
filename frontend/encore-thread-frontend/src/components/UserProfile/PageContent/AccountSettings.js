import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './profile.css';

const AccountSettings = () => {
  const user = useSelector(state => state.user.user);
  const userId = user?.id;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [profilepic, setProfilepic] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    contact: '',
    age: '',
    roles: '',
    address: '',
  });

  const [updatedUserData, setUpdatedUserData] = useState({
    username: '',
    email: '',
    contact: '',
    address: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const deleteUser = async()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if(confirmDelete){
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/delete`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          // Redirect to register page
          navigate("/register");
        } else {
          console.error("Failed to delete user account", response.status);
        }
      }catch(error){
        console.error("Error deleting user account:", error);
      }
    }
  }

  const updateUserInfo = async(updatedUserData)=>{
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userId}/update`,{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //setUserData(data);
        setUpdatedUserData(data);
        setEditMode(false);
      } else {
        console.error("Failed to update user info", response.status);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }

  const fetchUserInfo = async()=>{
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/${userId}`,{
          headers: {
            'Accept': 'application/json' // Explicitly ask for JSON response
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setUpdatedUserData(data);
      } else {
        console.error("Failed to fetch user info", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordUpdate = async() =>{
    if(passwordData.newPassword !== passwordData.confirmPassword){
      alert("New passwords do not match.");
      return;
    }
    try{
      const response = await fetch(`http://localhost:8080/api/user/${userId}/changePw`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
      });
      if(response.ok){
        alert("Password changed successfully!");
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      }else{
        console.error("Failed to change password", response.status);
      }
    }catch(error){
      console.error("Error changing password: ", error);
    }
  };

  useEffect(()=>{
    if (userId) {
      fetchUserInfo();
    } else {
      console.error("No userId provided");
    }
  },[userId]);      

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" id="username" value={editMode ? updatedUserData.username : userData.username} onChange={handleInputChange} readOnly={!editMode}/>
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input name="email" type="email" id="email" value={editMode ? updatedUserData.email : userData.email} onChange={handleInputChange} readOnly={!editMode}/>
      </div>
      <div>
        <label htmlFor="contact">Phone Number</label>
        <input name="contact" type="text" id="contact" value={editMode ? updatedUserData.contact : userData.contact} onChange={handleInputChange} readOnly={!editMode}/>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input name="address" type="text" id="address" value={editMode ? updatedUserData.address : userData.address} onChange={handleInputChange} readOnly={!editMode}/>
      </div>
      <div>
      <label htmlFor="roles">Role</label>
          <input 
            name="roles" 
            type="text" 
            id="roles" 
            value={userData.roles} 
            readOnly
          />
      </div>
      <br/>
      <div className="button_container">
        <button className="button" onClick={toggleEditMode}>{editMode ? 'Cancel' : 'Edit'}</button>
        <button className="button" onClick={() => updateUserInfo(updatedUserData)}>Update</button>
        <button className="button" onClick={deleteUser}>Delete</button>
      </div>

      {editMode&&(
        <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              id="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="newPassword">New Password</label>
            <input
              name="newPassword"
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',    
            marginTop: '5px', 
            paddingTop: '5px', 
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }} onClick={handlePasswordUpdate}>Change Password</button>
        </div>
      )}
    </div>
  );
};

export default AccountSettings