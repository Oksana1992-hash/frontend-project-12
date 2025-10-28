import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import routes from '../routes'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../slices/authSlice'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
  console.log('отрисовка LoginForm')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [authError, setAuthError] = useState(false)

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        try {
          const responce = await axios.post(routes.loginPath(), values)
          const userData = responce.data
          dispatch(loginSuccess(userData))
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
        <Form className="col-12 mt-md-0 mt-3">
          <h1 className="text-center mb-4">Войти</h1>
          {/* Поле для имени пользователя */}
          <div className="form-floating mb-3">
            <Field
              id="username"
              type="username"
              name="username"
              placeholder="Введите имя пользователя"
              autoComplete="username"
              required
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">Ваш ник</label>
          </div>
          {/* Поле для пароля */}
          <div className="form-floating mb-4">
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
              required
              className={`form-control ${authError ? 'is-invalid' : ''}`}
            />
            <label htmlFor="password">Пароль</label>
            {authError && <div className='invalid-tooltip'>Неверные имя пользователя или пароль</div>}
          </div>

          <Button type='submit' variant='outline-primary' className="w-100 mb-3" disabled={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
