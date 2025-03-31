'use client';
import { useRouter } from 'next/navigation';
import { useState,useEffect } from "react";
import DiaryEntryPage from "@/components/EntryPage";
import BlurText from '@/components/ui/BlurText';

// const handleAnimationComplete = () => {
//   console.log('Animation completed!');
// };
export default function Home() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  const handleEnterClick = () => {
    // Display the video
    setShowVideo(true);
  };

  useEffect(() => {
    // Redirect to /home when the component mounts
    router.push('/home');
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen">
      
        <>
          {/* Initial Screen with Diary Entry Page and Enter Button */}
          {/* <DiaryEntryPage /> */}
          <button
            onClick={handleEnterClick}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 
                        rounded-full font-medium shadow-lg hover:shadow-xl transition-all 
                        duration-200 hover:scale-125 z-50 absolute bottom-10 transform -translate-x-1/2 flex gap-10  items-center text-lg">
            Enter <img className='w-10 h-10' src="/pics/pen.gif" alt="" />
          </button>
        </>
      
        
    


    </div>
  );
}
