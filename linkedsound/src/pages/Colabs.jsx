import React, { useEffect, useState } from 'react';
import { Table, Form, Input, DatePicker, Button, message, Modal, List, Card, Avatar, Space, Typography } from 'antd';
import api from '../config/api';

const Colabs = () => {
  const [colabs, setColabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");   // <-- NUEVO
  const { Paragraph, Text } = Typography;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const fetchColabs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/colabs');
      setColabs(data);
    } catch (err) {
      message.error('Error al cargar colaboraciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchColabs() }, []);

  const onFinish = async (values) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
      const payload = {
        id_User: currentUser?.id_User || null,
        Descripcion: values.descripcion,
        Fecha: values.fecha ? values.fecha.toISOString() : null,
        Ubi: values.ubicacion
      };
      const resp = await api.post('/colabs', payload);
      if (resp.status === 201) {
        message.success('Colaboración creada');
        fetchColabs();
      }
      setIsModalOpen(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Error al crear colaboración');
    }
  };

  // 🔍 FILTRO
  const filteredColabs = colabs.filter(c =>
    c.Descripcion?.toLowerCase().includes(search.toLowerCase()) ||
    c.Ubi?.toLowerCase().includes(search.toLowerCase()) ||
    c.Usuario?.Apodo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      
      {/* HEADER: BUSCADOR + BOTÓN */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Input.Search
          placeholder="Buscar colaboraciones..."
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />

        <Button type='primary' onClick={showModal}>
          Publicar colaboración
        </Button>
      </div>

      <Modal
        title="Publicar colaboración"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="descripcion" label="Descripción" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="ubicacion" label="Ubicación" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="fecha" label="Fecha">
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publicar colaboración
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <List
        style={{ marginTop: 24 }}
        loading={loading}
        dataSource={filteredColabs}
        renderItem={(item) => (
          <Card
            style={{
              marginBottom: 16,
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Space align="start">
              <Avatar style={{ backgroundColor: "#1677ff" }}>
                {item.Usuario?.Apodo?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>

              <div>
                <Text strong style={{ display: "block", fontSize: 16 }}>
                  {item.Usuario?.Apodo || "Anónimo"}
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.Fecha ? new Date(item.Fecha).toLocaleDateString() : ""}
                </Text>
              </div>
            </Space>

            <Paragraph style={{ marginTop: 12, fontSize: 15 }}>
              {item.Descripcion}
            </Paragraph>

            <Text type="secondary">
              📍 {item.Ubi}
            </Text>
          </Card>
        )}
      />

    </div>
  );
};

export default Colabs;
