import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer'
import RoutesComponent from './components/routes/Routes'
import 'animate.css'

import { logout } from './api/users'
import { useMutation, useQuery } from 'react-query'

import Navigation from './components/Navigation'

const App = () => {
  const { mutateAsync } = useMutation(logout, () => {})
  useQuery('userInfo', () => {})

  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (userInfo) mutateAsync({})
    })
    window.addEventListener('click', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)

        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
    window.addEventListener('focus', () => {
      if (userInfo) {
        const decoded = jwt_decode(userInfo && userInfo)
        if (decoded.exp * 1000 < Date.now()) mutateAsync({})
      }
    })
  }, [mutateAsync, userInfo])

  return (
    <BrowserRouter>
      <Navigation />
      <main className='container pt-2'>
        <RoutesComponent />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
