import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Profile</h2>
          <p>Manage your profile details</p>
          <Link to="/profile" className="text-blue-500 hover:underline">
            Go to Profile
          </Link>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p>Configure app preferences</p>
          <Link to="/settings" className="text-blue-500 hover:underline">
            Go to Settings
          </Link>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Logout</h2>
          <p>End your current session</p>
          <Link to="/logout" className="text-red-500 hover:underline">
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
