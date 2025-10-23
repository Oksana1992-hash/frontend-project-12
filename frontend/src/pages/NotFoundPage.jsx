import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div>
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <p>Запрашиваемая страница не существует</p>
    <Link to="/">Вернуться на главную</Link>
  </div>
)

export default NotFoundPage
