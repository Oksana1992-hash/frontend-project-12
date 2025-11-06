import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios'
import routes from '../routes'
import { loadChannels } from '../store/slices/channelsSlice.jsx'
import Chat from '../components/chat/Chat.jsx'
import Header from '../components/Header.jsx'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const HomePage = () => {
  console.log('отрисовка HomePage')

  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userId } = useSelector(state => state.auth)
  const token = userId?.token
  console.log('Home Page, token', token)

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.channelsPath(), { headers: { Authorization: `Bearer ${token}` } })
        const channels = response.data // [{id: '1', name: 'general', removable: false}, {id: '2', name: 'random', removable: false}]
        dispatch(loadChannels(channels))
      }
      catch (error) {
        if (error.status === 401) {
          navigate('/login')
          console.log(error.message)
          toast.error(t('errors.authError'))
        }
        else {
          console.log(error.message)
          toast.error(t('errors.loadDataError'))
        }
      }
    }
    fetchData()
  }, [dispatch, navigate, token, userId, t])

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow flex-fill">
        <Row className="h-100 bg-white flex-md-row">
          <Chat />
        </Row>
      </Container>
    </div>
  )
}

export default HomePage
