import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  // const location = useLocation();

  // const fromPage = location.state?.from || "/";
  // console.log("previusepath", fromPage);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(prev => prev - 1);
    }, 1000); // Redirect after 5 seconds
    if (count === 0) {
      navigate("/"); // Go back to previous page

    }
    return () => clearTimeout(timer);
  }, [navigate, count]);
  return (
    <>

      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="d-flex flex-col align-items-center justify-content-center h-screen vw-100 vh-100 position-fixed text-gray-700">
        <div className="content">

          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl">Page Not Found</p>
          <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-lg shadow">Go to Home</a><br></br>
          <p className="text-xl mt-4">or You will be redirectd to Previous page in {count} second{count !== 1 ? '\'s' : ""}</p>
        </div>

      </div>
    </>
  );
};

export default NotFound;