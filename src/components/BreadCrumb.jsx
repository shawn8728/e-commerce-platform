import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb(props) {
  const { breadCrumbs, productName } = props

  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        {breadCrumbs && breadCrumbs.map((element) => (
          <li key={`breadcrumbs-${element.id}`}>
            <div className="flex items-center">
              <Link
                to={`/${element.id}`}
                className="text-sm font-medium text-gray-900 hover:text-gray-600 capitalize"
              >
                {element.name}
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                className="mx-2 h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
        ))}
        <li className="text-sm">
          <a
            // href={product.href}
            aria-current="page"
            className="font-medium text-gray-500"
          >
            {productName}
          </a>
        </li>
      </ol>
    </nav>
  )
}

export default BreadCrumb
