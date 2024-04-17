import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/slices/authSlice'
import { Header,Footer } from './components'

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
      <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
        <div className='w-full block'>

          <Header />

          <main>
            {/* <Outlet/> */}
          </main>

          <Footer />

        </div>
      </div>
    )
    : <p>Loading...</p>
}

export default App
