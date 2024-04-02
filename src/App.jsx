import { Routes, Route } from 'react-router-dom'
import '@/assets/css/App.css'

import Home from '@/pages/Home'
import ProductDetail from '@/components/ProductDetail'
import { CartProvider } from '@/context/CartContext'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App
