import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import './App.css'

const App = () => {

  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(products.length/PAGE_SIZE)
  const start = currentPage*PAGE_SIZE;
  const end = start+PAGE_SIZE


  useEffect(()=>{
    fetchProducts()
  },[])

  const fetchProducts = async () => {
    try{
      const res = await fetch("https://dummyjson.com/products?limit=500")
      const jsonData = await res.json();
      setProducts(jsonData.products)
    }
    catch(err){
      console.log("error", err);
    }
    setIsLoading(false)
  }


  return isLoading? <>
      loading....
  </>: products.length ? 
  <>
  <div className='products-container' >
    {products.slice(start,end).map(product => 
      <ProductCard key={product.id} image={product.thumbnail} title={product.title} />
    )}
  </div>
  <div className='pagination-container' >
    <button className='arrow page-number' disabled={currentPage===0} onClick={()=>{setCurrentPage(currentPage-1)}} >Prev</button>
    {Array.from({length:totalPages},(v,ind)=><span className={'page-number '+(currentPage===ind?'selected':'')} onClick={()=>{setCurrentPage(ind)}} >{ind+1}</span>)}
    <button className='arrow page-number' disabled={currentPage===totalPages-1} onClick={()=>{setCurrentPage(currentPage+1)}} >Next</button>
  </div>
  </>
  : <> No Products found </>
}

export default App