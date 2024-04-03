import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '@/components/ProductList'
import BreadCrumb from '../components/BreadCrumb'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQueue = searchParams.get('q')

  const [products, setProducts] = useState([])

  async function fetchData() {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQueue}`
      )
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
      <div className="pt-6">
        <BreadCrumb
          breadCrumbs={[{ id: '', name: 'Home' }]}
          productName={`Search results for "${searchQueue}"`}
        />
        <h1 className="text-base text-center mt-4">
            {products.length} Products
        </h1>
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default Search
