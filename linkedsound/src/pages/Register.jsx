import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import api from '../config/api'

const { Title } = Typography

const Register = ({ onRegister }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      console.log('Register form values:', values)

      // Mapear valores del form a payload con keys correctas (mayúsculas)
      const payload = {
        Nombre: values.nombre || '',
        Apellido: values.apellido || '',
        Apodo: values.apodo || '',
        Email: values.email || '',
        Password: values.password || ''
      }

      console.log('Register payload:', payload)
      const res = await api.post('/auth/register', payload)
      console.log('Register response:', res.data)

      message.success('Registro exitoso')
      form.resetFields()
      navigate('/login')
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message)
      const text = err.response?.data?.message || err.message || 'Error al registrar'
      message.error(text)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      background: "linear-gradient(135deg, #001529 , #0c48a1)",
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 30 }}>
          Registrarse
        </Title>
        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
          >
            <Input placeholder="Ingrese su nombre" />
          </Form.Item>

          <Form.Item
            label="Apellido"
            name="apellido"
            rules={[{ required: true, message: 'Por favor ingrese su apellido' }]}
          >
            <Input placeholder="Ingrese su apellido" />
          </Form.Item>

          <Form.Item
            label="Apodo"
            name="apodo"
            rules={[{ required: true, message: 'Por favor ingrese su apodo' }]}
          >
            <Input placeholder="Ingrese su apodo" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor ingrese su email' },
              { type: 'email', message: 'Email inválido' }
            ]}
          >
            <Input placeholder="Ingrese su email" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>

          <Form.Item
            label="Confirmar Contraseña"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Por favor confirme su contraseña' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirme su contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Registrarse
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          ¿Ya tienes una cuenta? <a onClick={() => navigate('/login')}>Inicia sesión aquí</a>
        </div>
      </Card>
    </div>
  )
}

export default Register