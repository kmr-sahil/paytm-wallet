import React from 'react'

function Input({label, placeholder, onChange}) {
  return (
    <div className='flex flex-col gap-[0.5rem] w-[100%]'>
        <label>{label}</label>
        <input className='outline outline-offset-2 outline-[0.5px] rounded-[2px] px-[0.5rem] py-[0.2rem] outline-zinc-400'
               onChange={onChange}
               type='text' 
               placeholder={placeholder} />
    </div>
  )
}

export default Input