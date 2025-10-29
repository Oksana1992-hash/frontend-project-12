import Header from "../components/Header"

const NotFoundPage = () => (
  <div className='h-100 d-flex flex-column'>
    <Header />
    <div className="text-center">
      <img src="https://frontend-chat-ru.hexlet.app/assets/404-D_FLHmTM.svg" alt='notFoundPage.altText' className="img-fluid h-25" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className='text-muted'>
        Но вы можете перейти
        <a href="/"> на главную страницу</a>
      </p>
    </div>
  </div>
)

export default NotFoundPage
