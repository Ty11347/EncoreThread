import Content from './PageContent/Content';
import Sidebar from './Sidebar/Sidebar';
import React from 'react';

const MainProfile=()=> {
  return (
    <div className="main-container">
      <Sidebar/>
      <Content/>
    </div>
  );
};
export default MainProfile;