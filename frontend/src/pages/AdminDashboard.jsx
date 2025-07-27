import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import DashboardStats from "../components/DashboardStats";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";
import { initialUsers, initialStores, initialRatings } from "../data/data";

const AdminDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [stores, setStores] = useState(initialStores);
  const [ratings, setRatings] = useState(initialRatings);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const addUser = (user) => {
    setUsers([...users, { id: users.length + 1, ...user }]);
  };

  const addStore = (store) => {
    setStores([
      ...stores,
      {
        id: stores.length + 1,
        ...store,
        rating: parseFloat(store.rating) || 0,
      },
    ]);
  };

  const setRating = (storeId, newRating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, rating: newRating } : store
      )
    );
    setRatings([...ratings, { storeId, rating: newRating }]);
  };

  const handleToggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white text-gray-800">
      <div className="p-4 md:p-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-down">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-800 mb-1 hover:scale-105 transition-transform duration-300">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-sm font-medium italic">
              Welcome to the System Administrator Panel
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleToggleProfile}
              className="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-300"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-6 mt-4 text-sm font-semibold">
          {[
            { id: "dashboard", label: "Dashboard Stats" },
            { id: "add", label: "Add User/Store" },
            { id: "tables", label: "User & Store List" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showProfile && (
          <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
            <ProfileCard
              userId={1}
              name="Admin"
              email="admin@example.com"
              role="Admin"
              onSuccess={() => alert("Password updated successfully.")}
              onError={(msg) => alert(msg)}
            />
          </div>
        )}

        {/* Dashboard Stats */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in-up">
            <DashboardStats users={users} stores={stores} ratings={ratings} />
          </div>
        )}

        {/* Add User / Store Section */}
        {activeTab === "add" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Add New User
              </h2>
              <AddUserForm addUser={addUser} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Add New Store
              </h2>
              <AddStoreForm addStore={addStore} />
            </div>
          </section>
        )}

        {/* Users & Stores Tables */}
        {activeTab === "tables" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-auto hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                User List
              </h2>
              <UserTable users={users} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-auto hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Store List
              </h2>
              <StoreTable stores={stores} setRating={setRating} />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Admin System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
