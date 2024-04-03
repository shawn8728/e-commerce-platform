import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '@/components/ProductList'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQueue = searchParams.get('q')

  const [products, setProducts] = useState([])

  async function fetchData() {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchQueue}`)
      const data = await response.json()
      setProducts(data.products)
      console.log('Products:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchParams])

  return (
    <div className="bg-white">
      <ProductList products={products} />
    </div>
  )
}

export default Search
