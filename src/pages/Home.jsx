import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from '@/components/ProductList'

import { useData } from '@/context/DataContext'

import NotFound from '@/components/NotFound'
import BreadCrumb from '@/components/BreadCrumb'

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
      <div className="pt-6">
        {categoryId && (
          <BreadCrumb
            breadCrumbs={[{ id: '', name: 'Home' }]}
            productName={categoryId}
          />
        )}
        <h1 className="text-2xl text-center mt-4 capitalize">{categoryId}</h1>
        <ProductList products={products} />
        {products.length === 0 && <NotFound />}
      </div>
    </div>
  )
}

export default Home
