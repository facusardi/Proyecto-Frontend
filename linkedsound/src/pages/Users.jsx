import React, { useEffect, useState } from "react";
import { List, Card, message } from "antd";
import api from "../config/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/usuarios");
      setUsers(data);
    } catch (err) {
      message.error("Error al cargar usuarios");
    }
  };

  useEffect(() => { fetchUsers() }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Usuarios</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card title={user.Apodo || user.Nombre}>
              <div><strong>Nombre:</strong> {user.Nombre}</div>
              <div><strong>Email:</strong> {user.Email}</div>
              <div><strong>Rol:</strong> {user.Rol_User}</div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Users;