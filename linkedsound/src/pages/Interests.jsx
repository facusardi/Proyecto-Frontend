import { useState, useEffect } from 'react'
import { Form, Select, Button, message } from 'antd'
import { supabase } from '../config/supabase'

const Intereses = () => {
  const [intereses, setIntereses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIntereses()
    checkSession()
  }, [])

  const checkSession = () => {
  const storedUser = localStorage.getItem('user')
  console.log('🔍 Raw localStorage user en Intereses:', storedUser)
  
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser)
      console.log('🔍 Usuario parseado en Intereses:', userData)
      console.log('🔍 id_User en Intereses:', userData.id_User)
      setUser(userData)
    } catch (error) {
      console.error('❌ Error al parsear usuario en Intereses:', error)
    }
  }
  setLoading(false)
}

  const fetchIntereses = async () => {
    try {
      const { data, error } = await supabase
        .from('Tipo_De_Intereses')
        .select('*')
      
      if (error) throw error
      setIntereses(data)
    } catch (error) {
      message.error('Error al cargar intereses')
    }
  }

  const handleSubmit = async (values) => {
  if (!user) {
    message.error('Debes iniciar sesión para guardar intereses')
    return
  }

  try {
    // Elimina intereses anteriores
    await supabase
      .from('Intereses')
      .delete()
      .eq('id_User', user.id_User)  // ⚠️ Minúscula: id_User
    
    // Inserta nuevos intereses
    const { error } = await supabase
      .from('Intereses')
      .insert(values.intereses.map(interes_id => ({
        id_User: user.id_User,  // ⚠️ Minúscula: id_User
        Intereses_ID: interes_id
      })))

    if (error) throw error
    message.success('Intereses guardados correctamente')
  } catch (error) {
    console.error('Error al guardar:', error)
    message.error('Error al guardar intereses')
  }
}

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Selecciona tus intereses</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="intereses"
          rules={[{ required: true, message: 'Selecciona al menos un interés' }]}
        >
          <Select
            mode="multiple"
            placeholder="Selecciona tus intereses"
            options={intereses.map(i => ({ label: i.Nombre, value: i.Intereses_ID }))}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar intereses
        </Button>
      </Form>
    </div>
  )
}

export default Intereses