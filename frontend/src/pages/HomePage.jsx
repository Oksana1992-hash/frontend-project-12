import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import routes from '../routes'

const HomePage = () => {
  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.token)
  const token = userId?.token

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }
    const fetchData = async () => {
      try {
        const responce = await axios.get(routes.getChannelsPath(), { headers: { Authorization: `Bearer ${token}`, } })
        console.log('responce Главная страница', responce.data)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [navigate, token, userId])

  return (
    <Container className="mt-5">
      <h1>Главная страница</h1>
    </Container>
  )
}

export default HomePage
