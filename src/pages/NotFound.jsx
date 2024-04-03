import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-32 lg:px-6">
      <div className="mx-auto max-w-screen-lg text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          Something's missing.
        </p>
        <p className="mb-10 text-lg font-light text-gray-500">
          Sorry, We can't find the page you are looking for.{' '}
        </p>
        <Link
          to={'/'}
          className="rounded-md bg-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}

export default NotFound
