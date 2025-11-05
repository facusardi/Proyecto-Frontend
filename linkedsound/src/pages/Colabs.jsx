import React, { useState, useEffect } from 'react'
import { Form, Input, DatePicker, Button, Table, message } from 'antd'
import { supabase } from '../config/supabase'

function Colabs() {
  const [colabs, setColabs] = useState([])

  useEffect(() => {
    fetchColabs()
  }, [])

  const fetchColabs = async () => {
    try {
      const { data, error } = await supabase
        .from('Aviso_Colabro')
        .select(`
          *,
          Usuario:id_User (Nombre, Apodo)
        `)
      
      if (error) throw error
      setColabs(data)
    } catch (error) {
      message.error('Error al cargar colaboraciones')
    }
  }

  const handleSubmit = async (values) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('Aviso_Colabro')
        .insert({
          id_User: user.id,
          Descripcion: values.descripcion,
          Fecha: values.fecha.toISOString(),
          Ubi: values.ubicacion
        })

      if (error) throw error
      message.success('Colaboración publicada correctamente')
      fetchColabs()
    } catch (error) {
      message.error('Error al publicar colaboración')
    }
  }

  const columns = [
    {
      title: 'Usuario',
      dataIndex: ['Usuario', 'Apodo'],
      key: 'usuario'
    },
    {
      title: 'Descripción',
      dataIndex: 'Descripcion',
      key: 'descripcion'
    },
    {
      title: 'Ubicación',
      dataIndex: 'Ubi',
      key: 'ubicacion'
    },
    {
      title: 'Fecha',
      dataIndex: 'Fecha',
      key: 'fecha',
      render: (text) => new Date(text).toLocaleDateString()
    }
  ]

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <h1>Colaboraciones</h1>
      
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="ubicacion"
          label="Ubicación"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fecha"
          label="Fecha"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Publicar colaboración
        </Button>
      </Form>

      <Table 
        dataSource={colabs} 
        columns={columns}
        style={{ marginTop: 24 }}
        rowKey="id_Avi"
      />
    </div>
  )
}

export default Colabs