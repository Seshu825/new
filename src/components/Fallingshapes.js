// import React, { useEffect, useState } from 'react';

// const SHAPES = ['square', 'circle', 'pentagon', 'star', 'triangle', 'hexagon'];
// const COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];

// const generateShape = () => {
//   const size = Math.floor(Math.random() * 20) + 10;
//   return {
//     id: Math.random().toString(36).substring(7),
//     shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
//     color: COLORS[Math.floor(Math.random() * COLORS.length)],
//     left: Math.random() * 100, // in percent
//     size,
//     duration: Math.random() * 5 + 5, // 5s to 10s
//   };
// };

// const FallingShapes = () => {
//   const [shapes, setShapes] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShapes((prev) => [...prev, generateShape()]);
//     }, 300); // spawn every 300ms

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="falling-container">
//       {shapes.map((shape) => (
//         <div
//           key={shape.id}
//           className={`falling-shape ${shape.shape}`}
//           style={{
//             backgroundColor: shape.shape === 'pentagon' ? 'transparent' : shape.color,
//             color: shape.color,
//             left: `${shape.left}%`,
//             width: shape.size,
//             height: shape.size,
//             animationDuration: `${shape.duration}s`,
//           }}
//         >
//           {shape.shape === 'pentagon' && <Pentagon color={shape.color} />}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Pentagon = ({ color }) => (
//   <svg width="100%" height="100%" viewBox="0 0 100 100">
//     <polygon
//       points="50,0 100,38 81,100 19,100 0,38"
//       fill={color}
//     />
//   </svg>
// );

// export default FallingShapes;

import React, { useEffect, useState } from 'react';

const SHAPES = ['square', 'circle', 'pentagon', 'star', 'triangle', 'hexagon'];
const COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];

const generateShape = () => {
  const size = Math.floor(Math.random() * 20) + 10;
  return {
    id: Math.random().toString(36).substring(7),
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    left: Math.random() * 100,
    size,
    duration: Math.random() * 5 + 5,
  };
};

const FallingShapes = () => {
  const [shapes, setShapes] = useState([]);
// console.log(shapes)
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prev) => [...prev, generateShape()]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-container">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`falling-shape ${shape.shape}`}
          style={{
            backgroundColor:
              ['star', 'pentagon', 'triangle', 'hexagon'].includes(shape.shape)
                ? 'transparent'
                : shape.color,
            color: shape.color,
            left: `${shape.left}%`,
            width: shape.size,
            height: shape.size,
            animationDuration: `${shape.duration}s`,
          }}
        >
          {['pentagon', 'star', 'triangle', 'hexagon'].includes(shape.shape) && (
            <ShapeSVG type={shape.shape} color={shape.color} />
          )}
        </div>
      ))}
    </div>
  );
};

const ShapeSVG = ({ type, color }) => {
  const shapeMap = {
    pentagon: '50,0 100,38 81,100 19,100 0,38',
    star: '50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35',
    triangle: '50,0 100,100 0,100',
    hexagon: '50,0 93,25 93,75 50,100 7,75 7,25',
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <polygon points={shapeMap[type]} fill={color} />
    </svg>
  );
};

export default FallingShapes;
