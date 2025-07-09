import React, { useRef, useState } from 'react'
import './App.css'
import { debounceFunction } from './utils'

const App = () => {

  // const searchTerm = useRef('');
  const [suggestions, setSuggestions] = useState([])
  const fetchSuggestions = async (searchTerm) =>{
    console.log(searchTerm);
    const res= await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=100`);
    const jsonData = await res.json();
    setSuggestions(jsonData?.products ?? [])
  }

  const debouncedFetchSuggestions = debounceFunction(fetchSuggestions, 500)
  const handleSearch = (event) => {
    const searchTerm = event.target.value
    if(searchTerm){
      console.log(searchTerm);
      
      debouncedFetchSuggestions(searchTerm)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className='search-container'>
      <input className='search-input' placeholder='search' onKeyUp={handleSearch} />
      {suggestions.length!==0 && <ul className='suggestions-container' >
        {suggestions.map( item => <li key={item.id} className='suggestion-item'>{item?.title}</li> )}
      </ul>}
    </div>
  )
}

export default App