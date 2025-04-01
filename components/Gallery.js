import React from 'react'
import Masonry from './ui/Masonry'
import Stack from './ui/Stack';
import CircularGallery from './ui/CircularGallery';
import InfiniteMenu from './ui/InfiniteMenu';
import GalleryCarausel from './ui/GalleryCarausel';
import FlyingPosters from './ui/FlyingPosters';
const GalleryComponent = () => {
  const data = [
    { id: 1, image: '/pics/IMG1.jpg', height: 400 },
    { id: 2, image: '/pics/img2.jpg', height: 300 },
    { id: 3, image: '/pics/img4.jpg', height: 300 },
    { id: 4, image: '/pics/img13.jpg', height: 300 },
    { id: 5, image: '/pics/img11.jpg', height: 300 },
    { id: 6, image: '/pics/img6.jpg', height: 300 },
    { id: 7, image: '/pics/img12.jpg', height: 200 },
    { id: 8, image: '/pics/img8.jpg', height: 300 },
    { id: 9, image: '/pics/img9.jpg', height: 200 },
    { id: 10, image: '/pics/img11.jpg', height: 400 }
  ];

  // stack
  const images = [
    { id: 1, img: "/pics/IMG1.jpg" },
    { id: 2, img: "/pics/img2.jpg" },
    { id: 3, img: "/pics/img4.jpg" },
    { id: 4, img: "/pics/img13.jpg" },
    { id: 5, img: "/pics/img11.jpg" },
    { id: 6, img: "/pics/img6.jpg" },
    { id: 7, img: "/pics/img12.jpg" },
    { id: 8, img: "/pics/img8.jpg" },
    { id: 9, img: "/pics/img9.jpg" },
    { id: 10, img: "/pics/img11.jpg" }
  ];
  // infinite Menu
  const items = [
    {
      image: '/pics/IMG1.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img2.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img4.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img13.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img11.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img6.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img12.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img8.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img9.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    },
    {
      image: '/pics/img11.jpg',
      link: 'https://force.com/',
      title: '',
      description: 'This is pretty cool, right?'
    }
  ];


  const items1 = [
      "/pics/IMG1.jpg" ,
      "/pics/img2.jpg" ,
      "/pics/img4.jpg" ,
      "/pics/img13.jpg" ,
      "/pics/img11.jpg" ,
      "/pics/img6.jpg" ,
      "/pics/img12.jpg" ,
      "/pics/img8.jpg" ,
      "/pics/img9.jpg" ,
      "/pics/img11.jpg"  
  ];
  return (
    <div className="bg-white min-h-screen max-w-screen">
      <h1 className="text-center text-2xl font-bold">Gallery</h1>

      {/* Masonry Section */}
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Masonry</h2>
        <Masonry data={data} />
      </section>

      {/* Stack Section */}
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Stack</h2>
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 600, height: 600 }}
          cardsData={images}
        />
      </section>

      {/* Circular Gallery Section */}
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Circular Gallery</h2>
        <div style={{ height: "110vh", position: "relative" }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>
      </section>

      {/* Infinite Gallery Section */}
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Infinite Gallery</h2>
        <div style={{ height: "80vh", position: "relative" }}>
          <InfiniteMenu items={items} />
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Gallery Carousel</h2>
        <GalleryCarausel />
      </section>
      <section className="my-8">
        <h2 className="text-center text-xl font-semibold">Flying Posters</h2>
        <div style={{ height: '600px', position: 'relative' }}>
          {/* <FlyingPosters items={items1} /> */}
          <FlyingPosters items={items1} />
        </div>
      </section>
    </div>
  );
}

export default GalleryComponent
