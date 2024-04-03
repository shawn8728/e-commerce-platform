import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useData } from '@/context/DataContext'

import ProductList from '@/components/ProductList'
import BreadCrumb from '@/components/BreadCrumb'

function Search() {
  const { searchProducts } = useData()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQueue = searchParams.get('q')

  const [products, setProducts] = useState([])

  async function fetchData() {
    const products = await searchProducts(searchQueue)
    console.log(products)
    setProducts(products)
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
