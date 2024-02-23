import React from 'react'

function Button({title, onClick}) {
  return (
    <button onClick={onClick} className='w-[100%] text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600-800 dark:hover:bg-blue-700 dark:focus:ring-blue-700 dark:border-blue-700'>{title}</button>
  )
}

export default Button