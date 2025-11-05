import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Typography, message } from "antd"
import { supabase } from '../config/supabase'
const { Title } = Typography

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      if (typeof onLogin === 'function') onLogin();
      message.success('Inicio de sesión exitoso')
      navigate("/");
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      height: "100vh",
      background: "#f0f2f5",
    }}>
      <Card style={{ width: 350, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Iniciar sesión
        </Title>
        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login