import { useState, useEffect, useContext, createContext } from 'react'
import Cart from '@/components/Cart'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id)
    
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const decrementQuantity = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id)
    
    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      )
    }
  }

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id))
  }

  useEffect(() => {
    console.log('Cart Items:', cartItems)
  }, [cartItems])

  const value = {
    cartItems,
    cartQuantity,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    decrementQuantity,
    removeFromCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
