"use client"
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
const TestRoute = () => {
   return <div>

     <div className='w-[500px] h-[200px] overflow-hidden'>
       <CldVideoPlayer
       
         width="50"
         height="50"
         // Use only the Public ID for the src
         src="YTDown.com_YouTube_GTA-Vice-City-Theme_Media_eB3eXQOUvA8_002_720p_kjkshw"
         // This removes the Cloudinary watermark/logo
         logo={false}
      />
     </div>



   </div>
};

export default TestRoute;