import { Routes, Route } from 'react-router-dom'
import '@/assets/css/App.css'

import Home from '@/pages/Home'
import ProductDetail from '@/components/ProductDetail'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
  )
}

export default App
