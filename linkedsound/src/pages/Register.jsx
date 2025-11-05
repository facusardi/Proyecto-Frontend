import api from '../config/axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/auth/register', values);
      if (response.data) {
        message.success('Registro exitoso');
        navigate('/login');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;