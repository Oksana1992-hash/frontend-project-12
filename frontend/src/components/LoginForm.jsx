import { Formik, Form, Field } from 'formik'

const LoginForm = () => {
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={(values) => {
      console.log('Форма отправлена', values)
    }}
  >
    {() => (
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
          />
        </div>
        <button type="submit">Войти</button>
      </Form>
    )}
  </Formik>
}

export default LoginForm
