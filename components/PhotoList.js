import React from 'react'
import { getAllPhotos } from '@/app/api/user-action/route'
import PhotoCard from './PhotoCard'
const PhotoList = async () => {
    const photos = await getAllPhotos()
  return (
    
    <div>
      {
        photos.map(photo => {
            return <PhotoCard key={photo?.public_id} url={photo?.secure_url} />
        })
      }
    </div>
  )
}

export default PhotoList
