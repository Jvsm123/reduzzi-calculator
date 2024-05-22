import { AuthProvider } from './contexts/authContext'
import Routers from './routes'

function App() {
  return (
    <>
      <AuthProvider>
        <Routers/>
      </AuthProvider>
    </>
  )
}

export default App
