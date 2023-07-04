import React from 'react'
import { useGetAllProductsQuery } from './Features/storeApi'


const App = () => {
const {isLoading, isError, error, data} = useGetAllProductsQuery()
console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default App
