import React from 'react'
import { useNavigate } from 'react-router-dom'


const ViewProducts = ({ isLoading, isError, error, sdata }) => {

  const nav = useNavigate();


  if (isLoading) {
    return <div className='w-[32%] mx-auto mt-14'>
      <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_t9gkkhz4.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }


  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-10 gap-5'>
        {
          sdata && sdata.map((itemNumber) => {
            return <div
              className=' border border-gray-300
              hover:shadow-lg
              hover:scale-105
              duration-150
              cursor-pointer
              p-5'
              key={itemNumber.id}
              onClick={() => nav(`/product/detail/${itemNumber.ud}`, { state: itemNumber })}>
              <div className='grid grid-row-3'>
                <div className='flex justify-center'>
                  <img src={itemNumber.image} alt=""
                    className='h-28 w-auto object-contain' />
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


export default ViewProducts