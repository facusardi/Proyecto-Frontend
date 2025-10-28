import React from 'react'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff' }}>Linkedsound</Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Parate un cacho que no está listo</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Linkedsound</Footer>
    </Layout>
  )
}

export default Home