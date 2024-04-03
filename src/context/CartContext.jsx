import { useState, useEffect, useContext, createContext } from 'react'
import Cart from '@/components/Cart'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState(getInitialCart)

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function getInitialCart() {
    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      return JSON.parse(savedCartItems)
    }
    return []
  }

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  function addToCart(product) {
    const existingProduct = cartItems.find((item) => item.id === product.id)

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  function decrementQuantity(product) {
    const existingProduct = cartItems.find((item) => item.id === product.id)

    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    }
  }

  function removeFromCart(product) {
    setCartItems(cartItems.filter((item) => item.id !== product.id))
  }

  useEffect(() => {
    // Save cart items to local storage on change
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
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
