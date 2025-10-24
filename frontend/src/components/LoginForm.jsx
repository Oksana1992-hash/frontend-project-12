import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import routes from '../routes'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/authSlice'


const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authError, setAuthError] = useState(false)

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        try {
          const responce = await axios.post(routes.loginPath(), values)
          const token = responce.data
          dispatch(loginSuccess({ token }))
          setAuthError(false)
          navigate('/')
        }
        catch (error) {
          console.log(error.message)
          setAuthError(true)
        }

        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h1>Войти</h1>
          {/* Поле для имени пользователя */}
          <div>
            <label htmlFor="username">Имя пользователя</label>
            <Field
              id="username"
              type="text"
              name="username"
              placeholder="Введите имя пользователя"
              autoComplete="username"
            />
          </div>
          {/* Поле для пароля */}
          <div>
            <label htmlFor="password">Пароль</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </div>
          <div hidden={!authError}>Неверные имя пользователя или пароль</div>
          <button type="submit" disabled={isSubmitting}>Войти</button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
