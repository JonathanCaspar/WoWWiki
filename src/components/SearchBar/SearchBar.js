import React, { useState } from 'react'

function SearchBar({ onChangeCallback }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
    if (onChangeCallback) onChangeCallback(e.target.value.toLowerCase())
  }

  return (
    <div className="search-bar">
      <form>
        <input type="text" value={query} onChange={handleChange} />
      </form>
    </div>
  )
}

export default SearchBar
