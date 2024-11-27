import React from "react";

const UserTableRow = ({ user, onEdit, onDelete }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>{user.department}</td>
    <td>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </td>
  </tr>
);

export default UserTableRow;
