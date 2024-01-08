import React, {useEffect, useState} from 'react';
import AccountSettings from './AccountSettings';
import OrderComponent from '../../Order/OrderComponent';
import WishlistComponent from '../../Wishlist/WishlistComponent';
import '../../../App.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Content = () => {
  const [selectedTab, setSelectedTab] = useState('Account Settings');
  const user = useSelector(state => state.user.user);
  const userId = user?.id;
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = async (userId) => {
    try {
      const response = await fetch(
          `http://localhost:8080/api/user/${userId}/role`, {
            method: 'GET',
            headers: {
              'Accept': 'text/plain', // Changed to expect plain text
            }
          }
      );
      if (response.ok) {
        const role = await response.text();
        setIsAdmin(role === 'Admin');
      } else {
        console.error("Failed to fetch user role", response.status);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Account Settings':
        return <AccountSettings/>;
      case 'Order History':
        return <OrderComponent showingHistory={true}/>;
      case 'Wishlist':
        return <WishlistComponent/>;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (user) {
      checkUserRole(userId);
    }
  }, [user, userId]);

  return (
      <div className="content-container">
        <div className="tabs-container">
          <div
              onClick={() => setSelectedTab('Account Settings')}
              className="tab"
          >
            Account Settings
          </div>
          {!isAdmin && (
              <div
                  onClick={() => setSelectedTab('Order History')}
                  className="tab"
              >
                Order History
              </div>
          )}
          {!isAdmin && (
              <div
                  onClick={() => setSelectedTab('Wishlist')}
                  className="tab"
              >
                Wishlist
              </div>
          )}
        </div>

        <div className="content">
          {renderContent()}
        </div>
      </div>
  );
};

export default Content;
