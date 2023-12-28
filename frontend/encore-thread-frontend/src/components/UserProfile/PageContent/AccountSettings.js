//import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'
import React from 'react';

const AccountSettings = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="admin" />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="admin@gmail.com" />
      </div>
      <div>
        <label htmlFor="contact">Phone Number</label>
        <input type="text" id="contact" placeholder="0123456789" />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" placeholder="age" />
      </div>
      <div>
        <label htmlFor="roles">Role</label>
        <select id="roles">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <select id="city">
          <option value="california">California</option>
          <option value="washington">Washington</option>
          <option value="toronto">Toronto</option>
          <option value="newyork" selected>
            New York
          </option>
          <option value="london">London</option>
          <option value="netherlands">Netherlands</option>
          <option value="poland">Poland</option>
        </select>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country">
          <option value="america" selected>
            America
          </option>
          <option value="england">England</option>
          <option value="poland">Poland</option>
        </select>
      </div>
    </div>
  );
};

export default AccountSettings