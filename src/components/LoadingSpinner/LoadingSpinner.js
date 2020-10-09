import React from 'react'
import Loader from 'react-loader-spinner'
import './LoadingSpinner.css'

const LoadingSpinner = ({ text }) => {
  return (
    <div className="loader">
      <span>{text} </span>
      <Loader
        className="loader-spinner"
        type="Oval"
        color="#00BFFF"
        height={15}
        width={15}
      />
    </div>
  )
}

export default LoadingSpinner
