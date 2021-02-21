import { useState,useCallback } from 'react';


export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url,method = 'GET', body = null, headers = {}) => {
    setLoading(true)
      try {
        const respons = await fetch(url,{method,body,headers})
        const data = await respons.json()

        if(!respons.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }
        setLoading(false)
        return data;
      } catch (error) {
        setLoading(true)
        setError(error.message)
        throw error
      }
  })

const clearError = () => setError(null)

  return {
    loading,
    error,
    request,
    clearError
  }
}