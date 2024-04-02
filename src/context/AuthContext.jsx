import React, { useEffect, useState, useContext, createContext } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  // username: kminchelle
  // password: 0lelplR

  async function login(username, password) {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 3, // optional, defaults to 60
        }),
      })

      const res = await response.json()

      if (res.message === 'Invalid credentials') {
        throw error
      } else {
        setCurrentUser(res)
        console.log('Logged in successfully!')
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  const value = {
    currentUser,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
