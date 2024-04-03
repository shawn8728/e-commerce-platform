import { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'

import { useData } from '@/context/DataContext'

function Home() {
  const { getAllProducts } = useData()
  const [products, setProducts] = useState([])

  async function fetchData() {
      const data = await getAllProducts()
      setProducts(data.products)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-white">
      <ProductList products={products} />
    </div>
  )
}

export default Home
