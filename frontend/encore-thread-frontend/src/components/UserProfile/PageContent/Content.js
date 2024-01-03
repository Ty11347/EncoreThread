import React, { useState } from 'react';
import AccountSettings from './AccountSettings';
import OrderHistory from './OrderHistory';
import Actions from './Actions';
import OrderComponent from '../../Order/OrderComponent';
import WishlistComponent from '../../Wishlist/WishlistComponent';

const Content = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState('Account Settings');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Account Settings':
        return <AccountSettings userId={userId}/>;
      case 'Order History':
        return <OrderComponent userId={userId} />;
      case 'Wishlist':
        return <WishlistComponent userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <div className="content-container">
      <div className="tabs-container">
        <div
          onClick={() => setSelectedTab('Account Settings')}
          style={{ cursor: 'pointer', marginRight: '10px', fontWeight: selectedTab === 'Account Settings' ? 'semibold' : 'normal' }}
        >
          Account Settings
        </div>
        <div
          onClick={() => setSelectedTab('Order History')}
          style={{ cursor: 'pointer', fontWeight: selectedTab === 'Order History' ? 'semibold' : 'normal' }}
        >
          Order History
        </div>
        <div
          onClick={() => setSelectedTab('Wishlist')}
          style={{ cursor: 'pointer', fontWeight: selectedTab === 'Wishlist' ? 'semibold' : 'normal' }}
        >
          Wishlist
        </div>
      </div>

      <div className="content">
        {renderContent()}
      </div>

      {/* <div>
        <Actions />
      </div> */}
    </div>
  );
};

export default Content;