import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./gallery.css";
import Masonry from 'react-masonry-css';
// import './MasonryGallery.css'; // for custom styling if needed
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Helmet } from "react-helmet";
import FallingShapes from "./Fallingshapes";
import heic2any from "heic2any";

// Load all images from a folder
const importAllImages = (r) => r.keys().map(r);
const rawFiles = importAllImages(
  // require.context('../Assets/images/Photos-001', false, /\.(png|jpe?g|JPG|MP4|HEIC|svg)$/)
  require.context('../Assets/images/Photos-001', false, /\.(png|jpe?g|JPG|MP4|svg)$/)
)
  // .sort()
  // sort by images




  ;

// console.log("images", rawFiles);
const ImageGallery = () => {
  const currentVideoRef = useRef(null);
  const [Hovered, setHovered] = useState(null);
  const [GalleryItem, setGalleryItem] = useState([]);


  const handleVideoClick = (event) => {
    const clickedVideo = event.target;
    // Pause the previously playing video if it's different
    if (currentVideoRef.current && currentVideoRef.current !== clickedVideo) {
      currentVideoRef.current.pause();
    }

    // Set new current video and play
    currentVideoRef.current = clickedVideo;
    clickedVideo.play();
  };
  // ⭐ Automatically convert .heic files to .jpg and load rest
  useEffect(() => {
    const loadImages = async () => {
      const finalImages = [];
      for (const files of rawFiles) {
        const isHeic = files.toLowerCase().endsWith(".heic");
        if (isHeic) {
          try {
            const res = await fetch(files);
            const blob = await res.blob();
            const jpgblob = await heic2any({
              blob,
              toType: "image/jpeg",
              quality: 0.9,
            })
            finalImages.push(URL.createObjectURL(jpgblob));
            // const imageBlob = new Blob([blob], { type: "image/jpeg" });
            // finalImages.push(imageBlob);
            // finalImages.push(URL.createObjectURL(imageBlob));
          } catch (error) {
            console.error("Error loading HEIC file:", error);
          }
        } else {
          finalImages.push(files);
        }
      }
      const sorted = finalImages.sort((a, b) => {
        const isVideoA = a.toLowerCase().endsWith(".mp4");
        const isVideoB = b.toLowerCase().endsWith(".mp4");
        // console.log("a",a)
        // console.log("b",b)
        if (isVideoA && !isVideoB) return 1;
        if (!isVideoA && isVideoB) return -1;
        return 0;
      });
      setGalleryItem(sorted)
    }
    loadImages();
  }, [])
  
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  if (!GalleryItem || !Array.isArray(GalleryItem)) return <div className="loading">Loading......</div>;

  return (
    <>

      <Helmet>
        <title>My Gallery</title>
      </Helmet>
      <div className="container">
        <FallingShapes />
        <div className="heading"><h2 className="text-center">My Gallery</h2></div>
        <div className="p-4">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {GalleryItem.map((src, index) => {
              const isVideo = src.toLowerCase().endsWith(".mp4");

              return isVideo ? (
                <div className="video-container"
                  key={index}>
                  <video
                    src={src}
                    // onLoadedMetadata={(e) => handleMetadataLoaded(e, index)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    controls={Hovered === index}
                    onPlay={handleVideoClick}
                    // poster={ videoPosters[index] || "https://placehold.co/400x300?text=Video+Preview"} 
                    controlsList="nodownload"
                    muted
                    loop
                    // autoPlay
                    preload="metadata"
                    style={{
                      position: "relative",
                      width: "100%",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      backgroundColor: "#000",
                    }}
                  /><span className="videotag">video</span></div>
              ) : (
                <LazyLoadImage
                  key={index}
                  alt={`Gallery ${index}`}
                  src={src}
                  placeholderSrc="https://placehold.co/400x300?text=Loading..."
                  effect="opacity"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    display: "block",
                    backgroundColor: "#eaeaea",
                  }}
                />
              );
            })}
          </Masonry>
        </div>
      </div>
    </>
  );
};


export default ImageGallery;

