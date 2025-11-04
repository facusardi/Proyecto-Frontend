import { useState } from "react";
import { List, Card, Typography, Button, Input, Modal } from "antd";

const { Title, Text } = Typography;
const { Search } = Input;


const Colabs = () => {
  // Datos hardcodeados
  const [publicaciones, setPublicaciones] = useState([{
      titulo: "Busco productor para nueva canción",
      descripcion:
        "Soy artista independiente y busco productor con experiencia en música urbana.",
      fecha_publicacion: "2025-11-03",
      usuario: "Juan Pérez",
    },
    {
      titulo: "Ofrezco servicios de mezcla y masterización",
      descripcion:
        "Tengo estudio propio y experiencia trabajando con artistas locales.",
      fecha_publicacion: "2025-10-28",
      usuario: "María López",
    },
    {
      titulo: "Busco colaboración para videoclip",
      descripcion:
        "Estoy filmando un videoclip y necesito un fotógrafo o videógrafo interesado.",
      fecha_publicacion: "2025-10-25",
      usuario: "Carlos Gómez",
    },]);
const[isModalOpen, setIsModalOpen]= useState(false)
const showModal =()=>{
  setIsModalOpen(true);
}

const handleOk =()=>{
  setIsModalOpen(false);
}
const handleCancel =()=>{
  setIsModalOpen(false);
}



  // Estado de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Filtrar publicaciones según el texto ingresado
  const publicacionesFiltradas = publicaciones.filter((pub) =>
    [pub.titulo, pub.descripcion, pub.usuario]
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "0 auto" }}>
      <Title level={2}>Publicaciones de Colaboración</Title>
      {/* Barra de búsqueda */}
      <div style={{ display: "flex", justifyContent: "space-between", gap:'20px',margin: 30,}}>
        <Search
        placeholder="Buscar por título, descripción o usuario..."
        allowClear
        enterButton="Buscar"
        size="large"
        onChange={(e) => setBusqueda(e.target.value)}
        style={{flex:1 }}
      />
      
     <Button onClick={showModal} style={{height: "40px"}}>Crear colaboracion</Button>
      <Modal title="Crear nueva colaboración" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Título" style={{ marginBottom: 10 }} />
        <Input.TextArea placeholder="Descripción" rows={4} style={{ marginBottom: 10 }} />
        <Input placeholder="Usuario" style={{ marginBottom: 10 }} />
      </Modal> 
      </div>
      
      
      

      {/* Lista de publicaciones */}
      <List
        itemLayout="vertical"
        dataSource={publicacionesFiltradas}
        locale={{ emptyText: "No se encontraron publicaciones." }}
        renderItem={(item) => (
          <Card
            style={{
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={4}>{item.titulo}</Title>
            <Text type="secondary">
              Publicado por {item.usuario} el {item.fecha_publicacion}
            </Text>
            <p style={{ marginTop: "10px" }}>{item.descripcion}</p>
            <div style={{ marginTop: "10px" }}>
              <Button type="primary">Contactar</Button>
            </div>
          </Card>
        )}
      />
    </div>
  );
};

export default Colabs;
