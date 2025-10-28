import React from 'react'
import { useState } from 'react'
import { Layout, Menu } from 'antd'

const items = [
  {
    key: '1',
    label: 'Home',
  },
  {
    key: '2',
    label: 'About',
  },
  {
    key: '3',
    label: 'Contact',
  },
]

const { Header, Content, Footer } = Layout

const Home = () => {
  const [current, setCurrent] = useState('1')
  const onclick = (e) => {
    setCurrent(e.key)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', display: 'flex', alignItems: 'center' }}>
        {/* Usar la ruta desde la carpeta public: '/img/...' (Vite sirve public/ en la raíz) */}
        <img
          src="/img/logoheader.png"
          alt="LinkedSound"
          style={{ height: '200px', marginRight: '16px', marginLeft: '-80px' }}
        />
          <Menu onClick={onclick} selectedKeys={[current]} style={{ width: '100%' }} theme="dark" mode="horizontal" items={items}>

        </Menu>
        

      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Parate un cacho que no está listo</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Linkedsound</Footer>
    </Layout>
  )
}

export default Home