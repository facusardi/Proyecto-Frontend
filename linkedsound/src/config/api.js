import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

// ========== FUNCIONES DE INTERESES ==========

/**
 * Obtener los intereses de un usuario
 * @param {string|number} userId - ID del usuario
 * @returns {Promise<{success: boolean, data: string[]}>}
 */
export const getUserIntereses = async (userId) => {
  try {
    console.log('[API] Getting intereses for user:', userId);
    const response = await api.get(`/intereses/user/${userId}`);
    console.log('[API] Intereses received:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error getting user intereses:', error);
    throw error;
  }
}

/**
 * Guardar los intereses de un usuario
 * @param {string|number} userId - ID del usuario
 * @param {number[]} interesesIds - Array de IDs de intereses
 * @returns {Promise<{success: boolean, data: any, message: string}>}
 */
export const saveUserIntereses = async (userId, interesesIds) => {
  try {
    console.log('[API] Saving intereses for user:', userId);
    console.log('[API] Intereses IDs:', interesesIds);
    
    const response = await api.post(`/intereses/user/${userId}`, {
      intereses: interesesIds
    });
    
    console.log('[API] Save response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error saving user intereses:', error);
    throw error;
  }
}

/**
 * Obtener todos los tipos de intereses disponibles
 * @returns {Promise<{success: boolean, data: any[]}>}
 */
export const getTiposIntereses = async () => {
  try {
    console.log('[API] Getting tipos de intereses');
    const response = await api.get('/intereses/tipos');
    console.log('[API] Tipos received:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] Error getting tipos de intereses:', error);
    throw error;
  }
}

export default api