import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser } from "../Services/apiService";
import UserForm from "./UserForm";
import UserTableRow from "./UserTableRow";
import ErrorBanner from "./ErrorBanner";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to load users. Please try again."));
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => setError("Failed to delete the user. Please try again."));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser) => {
    updateUser(updatedUser.id, updatedUser)
      .then(() => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null); // Reset editing state
      })
      .catch(() => setError("Failed to update the user. Please try again."));
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="user-list-container">
      <h1>User Management</h1>
      {error && <ErrorBanner message={error} />}

      <UserForm
        user={editingUser}
        onSubmit={(newUser) => {
          if (editingUser) {
            handleUpdate(newUser);
          } else {
            setUsers([...users, { ...newUser, id: users.length + 1 }]);
          }
        }}
        onCancel={() => setEditingUser(null)}
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => changePage(page + 1)}
            className={page + 1 === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
