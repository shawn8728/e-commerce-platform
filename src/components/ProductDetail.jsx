import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'

import { useCart } from '@/context/CartContext'
import { useData } from '@/context/DataContext'

import BreadCrumb from '@/components/BreadCrumb'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductDetail() {
  const { addToCart } = useCart()
  const { getSingleProduct } = useData()

  const { id } = useParams()
  const [product, setProduct] = useState({})

  const [active, setActive] = useState('')

  async function fetchData() {
    const data = await getSingleProduct(id)
    setProduct(data)
    setActive(data.images[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* {console.log('Product:', product.images[0])} */}
        <BreadCrumb
          breadCrumbs={[
            { id: '', name: 'Home' },
            { id: product.category, name: product.category },
          ]}
          productName={product.title}
        />

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-screen-xl lg:gap-x-8 lg:px-10">
          <div className="flex flex-col gap-10">
            <div className="flex justify-center">
              <img
                className="h-auto w-full max-w-fit rounded-lg object-cover justify-center md:h-[480px]"
                src={active}
                alt=""
              />
            </div>
            <div className="flex flex-row justify-between">
              {Array.isArray(product.images) &&
                product.images.map((url, index) => (
                  <div key={index}>
                    <img
                      onClick={() => setActive(url)}
                      src={url}
                      className="h-40 w-40 max-w-fit cursor-pointer rounded-lg object-cover object-center"
                      alt="gallery-image"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {product.discountPercentage !== 0 && (
              <p className="text-3xl tracking-tight text-gray-400 line-through">
                ${product.price}
              </p>
            )}
            <p className="text-3xl tracking-tight text-gray-900">
              $
              {Math.floor(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating >= rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <h1 href="#" className="ml-6 text-sm font-medium text-gray-900">
                  {product.rating} Stars
                </h1>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => {
                  addToCart(product)
                }}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              {/* <h3 className="text-sm font-medium text-gray-900">Highlights</h3> */}

              {/* <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div> */}
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Brand</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.brand}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
