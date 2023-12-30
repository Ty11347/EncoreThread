import React, { useState, useEffect } from 'react';

const AccountSettings = ({ userId }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    contact: '',
    age: '',
    roles: '',
    address: '',
    // profilePic: '', 
  });
  //const { userId } = useParams();

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
      } else {
        console.error("Failed to fetch user info", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

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
        <input type="text" id="username" value={userData.username} readOnly/>
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" value={userData.email} readOnly/>
      </div>
      <div>
        <label htmlFor="contact">Phone Number</label>
        <input type="text" id="contact" value={userData.contact} readOnly/>
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" value={userData.age} readOnly/>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" value={userData.address} readOnly/>
      </div>
      <div>
        <label htmlFor="roles">Role</label>
        <select id="roles" value={userData.roles} readOnly>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
    </div>
  );
};

export default AccountSettings