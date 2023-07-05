import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Detail from './pages/ProductDetails'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Home />} />
        <Route path='/search/:search' element={<SearchResults />} />
        <Route path='product/detail/:id' element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
