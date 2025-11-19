import { useState, useEffect } from 'react'
import { Form, Select, Button, message } from 'antd'
import { getTiposIntereses, saveUserIntereses } from '../config/api'

const Intereses = ({ onInteresesUpdated }) => {
  const [intereses, setIntereses] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
      console.log('📥 Obteniendo tipos de intereses desde backend...')
      const response = await getTiposIntereses()
      
      if (response.success) {
        console.log('✅ Tipos de intereses recibidos:', response.data)
        setIntereses(response.data)
      } else {
        throw new Error(response.error || 'Error al cargar intereses')
      }
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

    setSaving(true)

    try {
      console.log('📤 Guardando intereses para usuario:', user.id_User)
      console.log('📤 Intereses seleccionados:', values.intereses)

      const response = await saveUserIntereses(user.id_User, values.intereses)

      if (response.success) {
        console.log('✅ Respuesta del servidor:', response)
        message.success('Intereses guardados correctamente')
        
        setTimeout(() => {
          console.log('🔄 Notificando al padre para refrescar...')
          if (onInteresesUpdated && typeof onInteresesUpdated === 'function') {
            onInteresesUpdated()
          } else {
            console.warn('⚠️ onInteresesUpdated no es una función válida')
          }
        }, 500)
      } else {
        throw new Error(response.error || 'Error al guardar')
      }

    } catch (error) {
      console.error('❌ Error completo al guardar:', error)
      message.error(`Error al guardar intereses: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: 24 }}>Cargando intereses...</div>
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
            disabled={!user || saving}
            size="large"
          />
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          disabled={!user || saving}
          loading={saving}
          size="large"
          block
        >
          {saving ? 'Guardando...' : 'Guardar intereses'}
        </Button>
      </Form>
    </div>
  )
}

export default Intereses