import { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'

function Home() {
  const [products, setProducts] = useState([])

  async function fetchData() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      setProducts(data.products)
      console.log('Products:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
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
