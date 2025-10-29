import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

const AppLayout = () => {
  const [current, setCurrent] = useState('1')
  const handleClick = (e) => setCurrent(e.key)

  const menuItems = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/colaboraciones">Colaboraciones</Link> },
    { key: '3', label: <Link to="/usuarios">Usuarios</Link> },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', display: 'flex', alignItems: 'center' }}>
        <img src="/img/logoheader.png" alt="LinkedSound" style={{ height: '200px', marginRight: '16px', marginLeft: '-80px' }} />
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          style={{ flex: 1 }}
          items={menuItems} // <-- usar items en lugar de children
        />
      </Header>

      {/* Forzar fondo claro en Content y centrar el contenedor de las páginas */}
      <Content style={{ padding: '24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', background: 'transparent' }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Linkedsound</Footer>
    </Layout>
  )
}

export default AppLayout
