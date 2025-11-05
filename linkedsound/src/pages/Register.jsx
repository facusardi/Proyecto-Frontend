
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from "antd"
import { useState } from 'react'

const { Title } = Typography

const Register = ({ onRegister }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    const { username, password, email, confirmPassword, lastname, nickname } = values

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      message.error("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      // Realizar la petición al backend para registrar el usuario
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: username,
          apellido: lastname,
          apodo: nickname,
          email: email,
          password: password,
          rol_User: 'usuario' // Por defecto, puedes cambiarlo según tu lógica
        })
      })

      const data = await response.json()

      if (response.ok) {
        message.success('¡Registro exitoso! Ahora puedes iniciar sesión')
        if (typeof onRegister === 'function') onRegister()
        
        // Redirigir al login después de 1.5 segundos
        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        message.error(data.message || 'Error al registrarse')
      }
    } catch (error) {
      console.error('Error al registrar:', error)
      message.error('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: "100vh",
        background: "linear-gradient(135deg, #001529 , #0c48a1)"
      }}
    >
      <Card style={{ width: 350, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Registrarse
        </Title>
        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Nombre"
            name="username"
            rules={[{ required: true, message: "Por favor ingrese su nombre" }]}
          >
            <Input placeholder="Ingrese su nombre" />
          </Form.Item>
          
          <Form.Item
            label="Apellido"
            name="lastname"
            rules={[{ required: true, message: "Por favor ingrese su apellido" }]}
          >
            <Input placeholder="Ingrese su apellido" />
          </Form.Item>

            <Form.Item
            label="Nombre de Usuario"
            name="nickname"
            rules={[{ required: true, message: "Por favor ingrese su nombre de usuario" }]}
          >
            <Input placeholder="Ingrese su nombre de usuario" />
          </Form.Item>


        <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Por favor ingrese su email" }]}
          >
            <Input placeholder="Ingrese su email" />
          </Form.Item>


          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>

          <Form.Item
            label="Confirmar Contraseña"
            name="confirmPassword"
            rules={[{ required: true, message: "Por favor confirme su contraseña" }]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>

          <Form.Item style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Button type="primary" htmlType="submit" block>
              Registrarse
            </Button>

            <p>Ya tienes una cuenta? Inicia sesión  <a onClick={() => navigate('/login')}>aquí</a></p>

          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register