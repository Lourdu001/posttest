import React, { useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:3001/users").then((res) => {
      setUsers(res.data);
    });
  };

  const handleAddUser = () => {
    if (!name || !email) return alert("Enter name and email");

    axios
      .post("http://localhost:3001/users", { name, email })
      .then(() => {
        alert("User added!");
        setName("");
        setEmail("");
        fetchUsers(); // refresh user list
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding user");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        style={{ marginLeft: 10 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={{ marginLeft: 10 }} onClick={handleAddUser}>
        Add
      </button>

      <h2 style={{ marginTop: 30 }}>Users</h2>
      <button onClick={fetchUsers}>Load Users</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
