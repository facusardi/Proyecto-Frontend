import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import Intereses from './Interests'

const Home = () => {
  const [userIntereses, setUserIntereses] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0) // 🔄 Contador para forzar refresh

  useEffect(() => {
    checkSession()
  }, [])

  // 🔄 Re-fetch cuando cambia refreshKey
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
      
      const { data, error } = await supabase
        .from('Intereses')
        .select(`
          Intereses_ID,
          id_User,
          Tipo_De_Intereses (
            Intereses_ID,
            Nombre
          )
        `)
        .eq('id_User', userId)

      if (error) {
        console.error('❌ Error en consulta de intereses:', error)
        throw error
      }

      console.log('📥 Datos recibidos:', data)

      const interesesNombres = data
        .map(item => item.Tipo_De_Intereses?.Nombre)
        .filter(Boolean)
      
      console.log('✅ Intereses procesados:', interesesNombres)
      setUserIntereses(interesesNombres)
    } catch (error) {
      console.error('❌ Error al cargar intereses del usuario:', error)
    } finally {
      setLoading(false)
    }
  }

  // 🔄 Función para incrementar el contador y forzar refresh
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
        <p>Bienvenido, <strong>{user.Nombre || user.Apodo}</strong>!</p>
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

      {/* Key prop fuerza a React a recrear el componente cuando cambia */}
      <Intereses 
        key={refreshKey} 
        onInteresesUpdated={handleInteresesUpdated} 
      />
    </div>
  )
}

export default Home