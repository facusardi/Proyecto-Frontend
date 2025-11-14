import React, { useEffect, useState } from "react"
import { List, Card, message, Spin, Empty, Tag, Divider } from "antd"
import { UserOutlined, MailOutlined, HeartOutlined } from '@ant-design/icons'
import api from "../config/api"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      console.log('📥 Obteniendo usuarios desde:', api.defaults.baseURL + '/usuarios')
      const response = await api.get("/usuarios")
      console.log('✅ Usuarios recibidos (raw):', response.data)
      
      // Debug: ver estructura de cada usuario
      response.data?.forEach((user, index) => {
        console.log(`Usuario ${index + 1}:`, {
          nombre: user.Nombre,
          apodo: user.Apodo,
          intereses: user.intereses,
          tieneIntereses: Array.isArray(user.intereses),
          cantidadIntereses: user.intereses?.length
        })
      })
      
      setUsers(response.data || [])
    } catch (err) {
      console.error('❌ Error al cargar usuarios:', err)
      console.error('❌ Error response:', err.response)
      console.error('❌ Error message:', err.message)
      message.error(`Error al cargar usuarios: ${err.response?.data?.message || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchUsers() 
  }, [])

  if (loading) {
    return (
      <div style={{ 
        padding: 24, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px' 
      }}>
        <Spin size="large" tip="Cargando usuarios..." />
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 24 }}>Usuarios</h1>
      
      {users.length === 0 ? (
        <Empty 
          description="No hay usuarios registrados"
          style={{ marginTop: 48 }}
        />
      ) : (
        <>
          <p style={{ marginBottom: 16, color: '#888' }}>
            Total de usuarios: <strong>{users.length}</strong>
          </p>
          <List
            grid={{ 
              gutter: 16, 
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4
            }}
            dataSource={users}
            renderItem={(user) => {
              // Debug para cada tarjeta
              console.log('Renderizando usuario:', user.Apodo, 'con intereses:', user.intereses)
              
              return (
                <List.Item>
                  <Card 
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <UserOutlined />
                        {user.Apodo || user.Nombre || 'Sin nombre'}
                      </div>
                    }
                    extra={
                      <Tag color={user.Rol_User === 'admin' ? 'gold' : 'blue'}>
                        {user.Rol_User || 'user'}
                      </Tag>
                    }
                    hoverable
                    style={{ 
                      height: '100%',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    bodyStyle={{ minHeight: '180px' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {user.Nombre && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <UserOutlined style={{ color: '#1890ff' }} />
                          <span><strong>Nombre:</strong> {user.Nombre} {user.Apellido || ''}</span>
                        </div>
                      )}
                      
                      {user.Email && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 8,
                          wordBreak: 'break-all'
                        }}>
                          <MailOutlined style={{ color: '#52c41a' }} />
                          <span><strong>Email:</strong> {user.Email}</span>
                        </div>
                      )}
                      
                      {user.Apodo && user.Nombre && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong>Apodo:</strong> {user.Apodo}
                        </div>
                      )}

                      {/* Mostrar intereses */}
                      <Divider style={{ margin: '8px 0' }} />
                      
                      {user.intereses && Array.isArray(user.intereses) && user.intereses.length > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <HeartOutlined style={{ color: '#ff4d4f', marginTop: 4 }} />
                          <div style={{ flex: 1 }}>
                            <strong>Intereses ({user.intereses.length}):</strong>
                            <div style={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: 6, 
                              marginTop: 6 
                            }}>
                              {user.intereses.map((interes, index) => (
                                <Tag 
                                  key={`${user.id_User}-${interes}-${index}`}
                                  color="magenta"
                                  style={{ margin: 0 }}
                                >
                                  {interes}
                                </Tag>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 8,
                          color: '#999',
                          fontStyle: 'italic'
                        }}>
                          <HeartOutlined />
                          <span>Sin intereses registrados</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </List.Item>
              )
            }}
          />
        </>
      )}
    </div>
  )
}

export default Users