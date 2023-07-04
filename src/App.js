import React from 'react'
import { useGetAllProductsQuery } from './Features/storeApi'


const App = () => {
const {isLoading, isError, error, data} = useGetAllProductsQuery()
console.log(data)
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 gap-5'>
        {
          data && data.map((itemNumber) => {
            return <div 
            className=' border border-gray-300 hover:shadow-lg p-5'
            key={itemNumber.id}>
              <div className='grid grid-row-3'>
              <div className='flex justify-center'>
                <img src={itemNumber.image} alt="" 
              className='h-28 w-auto object-contain'/>
              </div>
          
              <div className='h-16 py-4'>
            <p className='line-clamp-2'>
              {itemNumber.title}
            </p>
            </div>
            <div className='py-3'>
            <p className='text-xl text-cyan-900'>
              ${itemNumber.price}
            </p>
            <p className='text-sm text-gray-500'>Rating: {itemNumber.rating.rate}({itemNumber.rating.count})</p>
            </div>
            </div>
            </div>
              
          })
        }
      </div>
    </div>
  )
}

export default App
