import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import Intereses from './Interests'

const Home = () => {
  const [userIntereses, setUserIntereses] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verifica la sesión inicial
    checkSession()
  }, [])

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
    const { data, error } = await supabase
      .from('Intereses')
      .select(`
        Intereses_ID,
        Tipo_De_Intereses (
          Nombre
        )
      `)
      .eq('id_User', userId)  // ⚠️ Minúscula: id_User

    if (error) throw error

    const interesesNombres = data
      .map(item => item.Tipo_De_Intereses?.Nombre)
      .filter(Boolean)
    
    setUserIntereses(interesesNombres)
  } catch (error) {
    console.error('Error al cargar intereses del usuario:', error)
  } finally {
    setLoading(false)
  }
}

  if (loading) {
    return <div style={{ padding: 24 }}>Cargando...</div>
  }

  if (!user) {
    return <div style={{ padding: 24 }}>Debes iniciar sesión para acceder a esta página. <a href="/login">Ir a login</a></div>
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: '3rem', marginBottom: 8 }}>Home</h1>
      
      <div style={{ marginBottom: 24 }}>
        <h2>Tus intereses actuales:</h2>
        {userIntereses.length > 0 ? (
          <ul>
            {userIntereses.map((interes, index) => (
              <li key={index}>{interes}</li>
            ))}
          </ul>
        ) : (
          <p>No has seleccionado intereses aún. ¡Agrega algunos abajo!</p>
        )}
      </div>

      <Intereses />
    </div>
  )
}

export default Home