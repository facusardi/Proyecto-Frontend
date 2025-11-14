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
      console.log('✅ Intereses disponibles:', data)
      setIntereses(data)
    } catch (error) {
      console.error('❌ Error al cargar intereses:', error)
      message.error('Error al cargar intereses')
    }
  }

  const handleSubmit = async (values) => {
    if (!user || !user.id_User) {
      message.error('Debes iniciar sesión para guardar intereses')
      console.error('❌ Usuario no válido:', user)
      return
    }

    try {
      console.log('📤 Guardando intereses para usuario:', user.id_User)
      console.log('📤 Intereses seleccionados:', values.intereses)

      // Elimina intereses anteriores
      const { error: deleteError } = await supabase
        .from('Intereses')
        .delete()
        .eq('id_User', user.id_User)
      
      if (deleteError) {
        console.error('❌ Error al eliminar intereses antiguos:', deleteError)
        throw deleteError
      }

      console.log('✅ Intereses antiguos eliminados')
      
      // Inserta nuevos intereses
      const interesesToInsert = values.intereses.map(interes_id => ({
        id_User: user.id_User,
        Intereses_ID: interes_id
      }))

      console.log('📤 Insertando intereses:', interesesToInsert)

      const { data: insertData, error: insertError } = await supabase
        .from('Intereses')
        .insert(interesesToInsert)
        .select()

      if (insertError) {
        console.error('❌ Error al insertar:', insertError)
        throw insertError
      }

      console.log('✅ Intereses insertados:', insertData)
      message.success('Intereses guardados correctamente')
    } catch (error) {
      console.error('❌ Error completo al guardar:', error)
      message.error(`Error al guardar intereses: ${error.message}`)
    }
  }

  if (loading) {
    return <div style={{ padding: 24 }}>Cargando intereses...</div>
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Selecciona tus intereses</h2>
      {!user && (
        <p style={{ color: 'orange' }}>
          ⚠️ Debes iniciar sesión para guardar intereses
        </p>
      )}
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="intereses"
          rules={[{ required: true, message: 'Selecciona al menos un interés' }]}
        >
          <Select
            mode="multiple"
            placeholder="Selecciona tus intereses"
            options={intereses.map(i => ({ 
              label: i.Nombre, 
              value: i.Intereses_ID 
            }))}
            disabled={!user}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={!user}>
          Guardar intereses
        </Button>
      </Form>
    </div>
  )
}

export default Intereses