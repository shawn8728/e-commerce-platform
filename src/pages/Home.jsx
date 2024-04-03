import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from '@/components/ProductList'

import { useData } from '@/context/DataContext'
import NotFound from '@/components/NotFound'

function Home() {
  const { getAllProducts, getCategoryProducts } = useData()
  const { categoryId } = useParams()
  
  const [products, setProducts] = useState([])

  async function fetchAllData() {
      const data = await getAllProducts()
      setProducts(data.products)
  }

  async function fetchCategoryData() {
    const data = await getCategoryProducts(categoryId)
    setProducts(data)
}

  useEffect(() => {
    categoryId ? fetchCategoryData() : fetchAllData()
  }, [categoryId])

  return (
    <div className="bg-white">
      <ProductList products={products} />
      {products.length === 0 && <NotFound />}
    </div>
  )
}

export default Home
