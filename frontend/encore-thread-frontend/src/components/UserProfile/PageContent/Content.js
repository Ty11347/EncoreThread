import React, { useState } from 'react';
import AccountSettings from './AccountSettings';
import OrderComponent from '../../Order/OrderComponent';
import WishlistComponent from '../../Wishlist/WishlistComponent';
import '../../../App.css';

const Content = () => {
  const [selectedTab, setSelectedTab] = useState('Account Settings');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Account Settings':
        return <AccountSettings />;
      case 'Order History':
        return <OrderComponent  />;
      case 'Wishlist':
        return <WishlistComponent  />;
      default:
        return null;
    }
  };

  return (
    <div className="content-container">
      <div className="tabs-container">
        <div
          onClick={() => setSelectedTab('Account Settings')}
          className="tab"
        >
          Account Settings
        </div>
        <div
          onClick={() => setSelectedTab('Order History')}
          className="tab"
        >
          Order History
        </div>
        <div
          onClick={() => setSelectedTab('Wishlist')}
          className="tab"
        >
          Wishlist
        </div>
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Content;