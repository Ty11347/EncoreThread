import Content from './PageContent/Content';
import Sidebar from './Sidebar/Sidebar';
import React from 'react';
import { useParams } from 'react-router-dom';

const MainProfile=()=> {
  let { userId } = useParams();

  return (
    <div className="main-container">
      <Sidebar userId={userId}/>
      <Content userId={userId}/>
    </div>
  );
};
export default MainProfile;