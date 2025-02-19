import React from 'react';
import Header from './Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        {/* Your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;