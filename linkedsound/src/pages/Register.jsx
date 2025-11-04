import { useNavigate } from 'react-router-dom'
import {Form, Input, Button, Card, Typography} from "antd"

const {Title}= Typography
const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  // Recibe los valores desde el antd Form
  const handleSubmit = (values) =>{
    const { username, password, email, confirmPassword, lastname, nickname} = values;
    if (username === "" || password === "" || email === "" || confirmPassword === "" || lastname === "" || nickname === ""){
       alert("La cuenta registrada esta incorrecta, intentalo nuevamente")
    }else{
      if (typeof onRegister === 'function') onRegister();
      navigate("/login");
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