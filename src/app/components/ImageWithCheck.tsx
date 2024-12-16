import Image from "next/image";
import { useEffect, useState } from "react";

const ImageWithCheck = ({ src, alt, height, width } : {src:string, alt:string, height:number, width:number}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    useEffect(() => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(false);
    }, [src]);
  
    return imageLoaded && src ? (
      <Image src={src} alt={alt} height={height} width={width} className="m-auto"/>
    ) : (
      <div className={`flex m-auto w-[${width}px] h-[${height}px] bg-gray-300`}>
        <p className="m-auto text-center">ไม่สามารถแสดงภาพ...</p>
      </div>
    );
  };
  export default ImageWithCheck