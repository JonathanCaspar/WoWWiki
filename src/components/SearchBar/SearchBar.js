import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

function SearchBar({ onChange }) {
  const [query, setQuery] = useState('')
  const { t } = useTranslation('common')

  const handleChange = (e) => {
    setQuery(e.target.value)
    if (onChange) onChange(e.target.value.toLowerCase())
  }

  return (
    <TextField
      className="search-bar"
      label={t('common.search')}
      type="text"
      value={query}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{ width: '100%' }}
    />
  )
}

export default SearchBar
