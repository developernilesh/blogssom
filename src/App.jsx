import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/slices/authSlice'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch(()=> console.error("Error occurred while fetching current user data:", error))
    .finally(() => setLoading(false))
  }, [])

  return !loading ? 
    (
      <div className='min-h-screen flex flex-wrap content-between app-bg'>
        <div className='w-full block'>

          <Header />

          <main className='min-h-[65vmin]'>
            <Outlet/>
          </main>

          <Footer />

        </div>
      </div>
    )
    : <p className='text-center p-20'>Loading...</p>
}

export default App
