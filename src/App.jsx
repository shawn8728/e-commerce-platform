import { Routes, Route, Navigate } from 'react-router-dom'
import '@/assets/css/App.css'

import Header from '@/components/Header'
import ProductDetail from '@/components/ProductDetail'
import NotFound from '@/components/NotFound'
import Home from '@/pages/Home'
import Search from '@/pages/Search'

import { CartProvider } from '@/context/CartContext'

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products">
          <Route index element={<Navigate to="/" />} />
          <Route path="search" element={<Search />} />
          <Route path="product">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path=":categoryId" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  )
}

export default App
