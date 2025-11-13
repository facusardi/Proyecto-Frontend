import React, { useEffect, useState } from 'react';
import { Table, Form, Input, DatePicker, Button, message } from 'antd';
import api from '../config/api';

const Colabs = () => {
  const [colabs, setColabs] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
      const payload = {
        id_User: currentUser?.id_User || null,
        Descripcion: values.descripcion,
        Fecha: values.fecha ? values.fecha.toISOString() : null,
        Ubi: values.ubicacion
      }
      await api.post('/colabs', payload)
      message.success('Colaboración creada')
      fetchColabs()
    } catch (err) {
      message.error(err.response?.data?.message || 'Error al crear colaboración')
    }
  };

  const columns = [
    { title: 'Usuario', dataIndex: ['Usuario','Apodo'], key: 'usuario', render: (_, record) => record.Usuario?.Apodo || 'Anónimo' },
    { title: 'Descripción', dataIndex: 'Descripcion', key: 'descripcion' },
    { title: 'Ubicación', dataIndex: 'Ubi', key: 'ubi' },
    { title: 'Fecha', dataIndex: 'Fecha', key: 'fecha', render: (d) => d ? new Date(d).toLocaleDateString() : '' }
  ]

  return (
    <div style={{ padding: 24 }}>
      <h1>Colaboraciones</h1>

      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 700 }}>
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
          <Button type="primary" htmlType="submit">Publicar colaboración</Button>
        </Form.Item>
      </Form>

      <Table dataSource={colabs} columns={columns} rowKey="id_Avi" loading={loading} style={{ marginTop: 24 }} />
    </div>
  )
}

export default Colabs