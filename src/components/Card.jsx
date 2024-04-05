import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  const { product } = props

  return (
    <Link
      key={product.id}
      to={`/products/product/${product.id}`}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      {product.discountPercentage == 0 ? (
        <p className="mt-1 text-lg font-medium text-gray-900">
          ${product.price}
        </p>
      ) : (
        <>
          <p className="mt-1 text-lg font-medium text-gray-500 line-through">
            ${product.price}
          </p>
          <p className="mt-1 text-lg font-medium text-red-700">
            $
            {Math.floor(
              product.price - (product.price * product.discountPercentage) / 100
            )}
          </p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {Math.floor(product.discountPercentage)}% off
          </p>
        </>
      )}
    </Link>
  )
}

export default Card
