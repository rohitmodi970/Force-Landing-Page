import React from 'react'
import Image from 'next/image'
const PhotoCard = ({ url, onClick }) => {

  return (
    <>
      <div className="flex  flex-col">
        <div>
          <Image src={url} alt='image' width={200} height={100} priority />
        </div>
        <button onClick={onClick} className='bg-red-600 px-6 py-1 rounded-lg' type='button'>Delete</button>
      </div>
    </>
  )
}

export default PhotoCard
