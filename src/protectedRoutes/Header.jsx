import React from 'react';
import { useNavigate } from 'react-router-dom';

import { handleSignout } from '../lib/Auth';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useAuth();

  const signOut = async () => {
    try {
      await handleSignout();
      setUserState({
        user: '',
        idToken: '',
        accessToken: '',
        refreshToken: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          Dashboard
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">
            {userState?.user?.email}
          </span>
          <button 
            onClick={signOut} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
