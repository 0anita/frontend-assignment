import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


const Footer = () => {

  const navs = [
    {
      name: 'Popular',
      path: '/movie/popular'
    }
  ]

  const location = useLocation();


  return (
    <div>

      <div className='flex md:flex-row flex-col md:gap-10  justify-center text-center p-5 text-white bg-slate-800'>
        {navs.map(nav => (
          <NavLink
            to={nav.path}
            key={nav.name}
            className={`hover:font-bold hover:text-red-600 duration-100 ${location.pathname === nav.path ? 'font-bold' : ''}`}
          >
            {nav.name}
          </NavLink>
        ))}
        {/* navbar using react router dom and map when size is above MD*/}



      </div>
    </div>
  )
}

export default Footer