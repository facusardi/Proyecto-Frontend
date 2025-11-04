import React, { useState } from "react";
import { Card, Typography, Tag, Row, Col, Avatar, Space, Input } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Users = () => {
  // Datos hardcodeados con intereses
  const usuarios = [
    {
      id_User: 1,
      Nombre: "Mauro",
      Apellido: " Lombardo",
      Apodo: "elduko",
      Rol_User: "Artista",
      Intereses: ["Producción musical", "Composición", "Freestyle"],
    },
    {
      id_User: 2,
      Nombre: "María",
      Apellido: "López",
      Apodo: "marybeats",
      Rol_User: "Productor",
      Intereses: ["Masterización", "Grabación", "Beatmaking"],
    },
    {
      id_User: 3,
      Nombre: "Juan",
      Apellido: "Pérez",
      Apodo: "jperez",
      Rol_User: "Artista",
      Intereses: ["Videoclips", "Composición", "Edición audiovisual"],
    },
  ];

  const [busqueda, setBusqueda] = useState("");

  // Filtrado por nombre, apellido o apodo
  const usuariosFiltrados = usuarios.filter((user) =>
    `${user.Nombre} ${user.Apellido} ${user.Apodo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
        background: "linear-gradient(to bottom, #f0f2f5, #ffffff)",
        borderRadius: 8,
        
      }}
    >
      <Title
        level={2}
        style={{
          color: "#111",
          marginBottom: 10,
          textShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        <UserOutlined style={{ color: "black" }} /> Perfiles de Usuarios
      </Title>

      <Input
        placeholder="Buscar por nombre, apellido o apodo..."
        prefix={<SearchOutlined />}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "90%",
          
          marginBottom: 30,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%", maxWidth: 1200 }}>
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((user) => (
            <Col xs={24} sm={12} md={8} key={user.id_User}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  padding: 10,
                }}
              >
                <Space direction="vertical" style={{ width: "100%", alignItems: "center" }}>
                  <Avatar
                    size={80}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                  />
                  <Title level={4}>
                    {user.Nombre} {user.Apellido}
                  </Title>
                  <Text type="secondary">@{user.Apodo}</Text>

                  <Tag color={user.Rol_User === "Artista" ? "blue" : "green"}>
                    {user.Rol_User}
                  </Tag>

                  <div style={{ marginTop: 10, textAlign: "center" }}>
                    <Text strong>Intereses:</Text>
                    <div style={{ marginTop: 8 }}>
                      {user.Intereses.map((interes, index) => (
                        <Tag key={index} color="geekblue">
                          {interes}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          ))
        ) : (
          <Text type="secondary" style={{ marginTop: 40 }}>
            No se encontraron usuarios que coincidan con la búsqueda.
          </Text>
        )}
      </Row>
    </div>
  );
};

export default Users;


