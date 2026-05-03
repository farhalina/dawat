import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Host from './pages/Host'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Host />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
