import React, { useEffect, useState, useContext, createContext } from 'react'

const DataContext = createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }) {
  async function getSingleProduct(productId) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function getCategoryProducts(categoryId) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${categoryId}`
      )
      const data = await response.json()
      return data.products
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function getAllCategories() {
    try {
      const response = await fetch('https://dummyjson.com/products/categories')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function getAllProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function searchProducts(searchQueue) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchQueue}`
      )
      const data = await response.json()
      return data.products
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const value = {
    getAllProducts,
    getSingleProduct,
    getCategoryProducts,
    getAllCategories,
    searchProducts,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
