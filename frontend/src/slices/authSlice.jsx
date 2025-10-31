import { createSlice } from '@reduxjs/toolkit'

// Получаем сохранённые данные о пользователе
let storedUserData
try {
  const stored = localStorage.getItem('userId')
  storedUserData = stored ? JSON.parse(stored) : null
} catch (e) {
  console.error('Ошибка парсинга userId из localStorage:', e)
  storedUserData = null
}

const initialState = {
  userId: storedUserData, // здесь хранится объект или null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const userData = action.payload
      state.userId = userData
      localStorage.setItem('userId', JSON.stringify(userData))
    },
    logOut: (state) => {
      state.userId = null
      localStorage.removeItem('userId')
    },
    signUp: (state, action) => {
      const userData = action.payload
      state.userId = userData
      localStorage.setItem('userId', JSON.stringify(userData))
    },
  },
})

export const { loginSuccess, logOut, signUp } = authSlice.actions
export default authSlice.reducer
