import { useNavigate } from 'react-router-dom'
import {Form, Input, Button, Card, Typography} from "antd"
import Register from './Register'

const {Title}= Typography
const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  // Recibe los valores desde el antd Form
  const handleSubmit = (values) =>{
    const { apodo, password } = values;
    if (apodo === "elduko" && password === "eskere"){
      if (typeof onLogin === 'function') onLogin();
      navigate("/");
    }else{
      alert("contraseña o usuario incorrecto")
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
          Iniciar sesión
        </Title>
        <Form
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="apodo"
            name="apodo"
            rules={[{ required: true, message: "Por favor ingrese su apodo" }]}
          >
            <Input placeholder="Ingrese su Apodo" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}
          >
            <Input.Password placeholder="Ingrese su contraseña" />
          </Form.Item>

          <Form.Item style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Button type="primary" htmlType="submit" block>
              Iniciar sesión
            </Button>

           <p>No tienes una cuenta? Regístrate  <a onClick={() => navigate('/register')}>aquí</a></p>

          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login