import React, { useState, useEffect } from 'react'
import Intereses from './Interests'
import { getUserIntereses } from '../config/api'

const Home = () => {
  const [userIntereses, setUserIntereses] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    if (user?.id_User && refreshKey > 0) {
      fetchUserIntereses(user.id_User)
    }
  }, [refreshKey])

  const checkSession = () => {
    const storedUser = localStorage.getItem('user')
    console.log('🔍 Raw localStorage user:', storedUser)
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        console.log('🔍 Usuario parseado en Home:', userData)
        console.log('🔍 Propiedades del usuario:', Object.keys(userData))
        console.log('🔍 id_User:', userData.id_User)
        
        setUser(userData)
        
        if (userData.id_User) {
          fetchUserIntereses(userData.id_User)
        } else {
          console.error('❌ El usuario no tiene id_User')
          setLoading(false)
        }
      } catch (error) {
        console.error('❌ Error al parsear usuario:', error)
        setLoading(false)
      }
    } else {
      console.log('❌ No hay usuario en localStorage')
      setLoading(false)
    }
  }

  const fetchUserIntereses = async (userId) => {
    try {
      console.log('📥 Buscando intereses para usuario:', userId)
      
      const response = await getUserIntereses(userId)
      
      if (response.success) {
        console.log('✅ Intereses recibidos:', response.data)
        setUserIntereses(response.data)
      } else {
        console.error('❌ Error en respuesta:', response.error)
        setUserIntereses([])
      }
    } catch (error) {
      console.error('❌ Error al cargar intereses del usuario:', error)
      setUserIntereses([])
    } finally {
      setLoading(false)
    }
  }

  const handleInteresesUpdated = () => {
    console.log('🔄 Refrescando intereses después de guardar...')
    setRefreshKey(prev => prev + 1)
  }

  if (loading) {
    return <div style={{ padding: 24 }}>Cargando...</div>
  }

  if (!user) {
    return (
      <div style={{ padding: 24 }}>
        <p>Debes iniciar sesión para acceder a esta página.</p>
        <a href="/login">Ir a login</a>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 8 }}>Home</h1>
      
      <div style={{ marginBottom: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
        <p>Bienvenido, <strong>{user.Apodo}</strong>!</p>
        <p><strong>Email:</strong> {user.Email}</p>
        
        <div style={{ marginTop: 16 }}>
          <strong>Intereses ({userIntereses.length}):</strong>
          {userIntereses.length > 0 ? (
            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              {userIntereses.map((interes, index) => (
                <li key={index}>{interes}</li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#888' }}>
              No has seleccionado intereses aún. ¡Agrega algunos abajo!
            </p>
          )}
        </div>
      </div>

      <Intereses 
        key={refreshKey} 
        onInteresesUpdated={handleInteresesUpdated} 
      />
    </div>
  )
}

export default Home