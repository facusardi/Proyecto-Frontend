import React, { useState, useEffect } from 'react'
import { Form, Select, Button, message } from 'antd'
import { supabase } from '../config/supabase'

const Intereses = () => {
  const [intereses, setIntereses] = useState([])
  
  useEffect(() => {
    fetchIntereses()
  }, [])

  const fetchIntereses = async () => {
    try {
      const { data, error } = await supabase
        .from('Tipo_de_Intereses')
        .select('*')
      
      if (error) throw error
      setIntereses(data)
    } catch (error) {
      message.error('Error al cargar intereses')
    }
  }

  const handleSubmit = async (values) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('Intereses')
        .insert(values.intereses.map(interes_id => ({
          id_User: user.id,
          Intereses_ID: interes_id
        })))

      if (error) throw error
      message.success('Intereses guardados correctamente')
    } catch (error) {
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