import React from 'react';
import Profile from './Profile'

const Sidebar=({ userId })=> {
  return (
    <aside className="sidebar">
      <Profile userId = {userId}/>
    </aside>
  );
};

export default Sidebar;