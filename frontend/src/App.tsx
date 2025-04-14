
import { ToastContainer } from 'react-toastify'
import { RoutesContainer } from './routes/Routes';

function App() {

  return (
    <div className="gothamMedium tracking-wide">
      <ToastContainer theme='dark' />
      <RoutesContainer />
    </div >
  )
}

export default App
