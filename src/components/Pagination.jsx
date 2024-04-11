import React from 'react'

function Pagination({page,handlePrev, handleNext}) {
  return (
    <div className='bg-gray-400 p-4 mt-8 flex justify-center'>
        <div className='px-8 hover:cursor-pointer' onClick={handlePrev}><i className="fa-solid fa-caret-left"></i></div>
        <div className='font-bold'>{page}</div>
        <div className='px-8' onClick={handleNext}><i className="fa-solid fa-caret-right"></i></div>
    </div>
  )
}

export default Pagination