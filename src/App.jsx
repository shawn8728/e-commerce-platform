import { Routes, Route } from 'react-router-dom'
import '@/assets/css/App.css'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import ProductDetail from '@/components/ProductDetail'
import Header from '@/components/Header'
import { CartProvider } from '@/context/CartContext'
import Search from '@/pages/Search'

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products">
          <Route path='search' element={<Search />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </CartProvider>
  )
}

export default App
