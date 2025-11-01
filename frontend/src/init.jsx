import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
import store from './store.js'
import { addMessage } from './slices/messagesSlice.jsx'
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.jsx'
import App from './App.jsx'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import { toast } from 'react-toastify'
import resources from './locales/rus.js'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: false,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

filter.add(filter.getDictionary('ru'))
filter.add(filter.getDictionary('en'))

const socket = io()

socket.on('connect', () => {
  console.log('Соединение с сервером установлено')
})

socket.on('disconnect', () => {
  console.log('Соединение с сервером потеряно')
  toast.error(i18next.t('errors.serverNotConnection'))
})

socket.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload))
})

socket.on('newChannel', (payload) => {
  store.dispatch(addChannel(payload))
})

socket.on('removeChannel', (payload) => {
  store.dispatch(removeChannel(payload.id))
})

socket.on('renameChannel', (payload) => {
  store.dispatch(renameChannel(payload))
})

const rollbarConfig = {
  accessToken: '344c4bf6bb18767df735e86f3b05d749',
  environment: 'development',
}

const init = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default init
