import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { confirmAlert } from "react-confirm-alert"
import { toast } from "react-toastify";
import 'react-confirm-alert/src/react-confirm-alert.css';

import DefaultImg from "../Assets/images/1.jpg";
// import {useMediaQuery} from "react-responsive"
// import { useTheme } from '@mui/material/styles';


const Navbar = () => {
  // const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  //   return (
  //     <div>
  //       {isDesktop && <ThemeToggle />}
  //     </div>
  //   );
  // const [width, setWidth] = useState(window.innerWidth);
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [menuItems, setmenuItems] = useState([]);
  const handleLogout = () => {
    // const confirmed = window.confirm("Are you sure you want to logout?");
    const options = {
      title: 'Confirm to Logout',
      message: 'Are you sure want to logout',
      buttons: [
        {
          label: 'Yes Logout',
          onClick: () => {
            // alert('Click Yes')
            // localStorage.removeItem('jwt');
            logout();
            toast.success("Logged out successfully!");

          }
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => { },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options);

  };
  //display menu and check path exists or not
  const items = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Gallery', path: '/gallery' }
    // Add more menu items as needed
  ]
  //checking page exists ot not
  const checkPageExistance = async (path) => {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false
    }
  }
  // disable menu items
  // useEffect(() => {
  //   const checkMenuItems = async () => {
  //     const updateMenuItems = await Promise.all(items.map(async (item) => {
  //       const exists = await checkPageExistance(item.path);
  //       // console.log(...item, exists);
  //       return { ...item, disabled: !exists };
  //     }))

  //     setmenuItems(updateMenuItems);
  //   };
  //   checkMenuItems();
  // }, [])
  useEffect(() => {
    // const checkPages = async () => {
    //   const updatedMenuItems = await Promise.all(
    //     items.map(async (item) => {
    //       try {
    //         const response = await fetch(item.path, { method: 'HEAD' });
    //         console.log("response", response)
    //         if (response.ok){
    //         return { ...item, disabled: false };
    //         }else{
    //           return { ...item, disabled: true};
    //         }
    //       } catch (error) {
    //         return { ...item, disabled: true };
    //       }
    //     })
    //   );
    //   setmenuItems(updatedMenuItems);
    // };
    // checkPages();
    setmenuItems(items);
  }, []);


  // useEffect(() => {
  //   const handleResize = () => setWidth(window.innerWidth);
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);



  return (
    <nav className="navbar container navbar-expand-lg navbar-custom bg-custom fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {user ? <span title={user?.username} className="user_image"><img alt={user?.username} src={user.picture ? user.picture : DefaultImg} width={25}
                  height={25}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  referrerPolicy="no-referrer"></img></span> : "Mybrand"}
        </NavLink>
        <div className="button-section">
          {/* <span>{width < 992 && <ThemeToggle />}</span> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            {
              menuItems.map((item, index) =>
                <li key={index} className="nav-item">
                  {/* {console.log(item.label, item.disabled)} */}
                  <NavLink to={item.path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    {item.label}
                  </NavLink>
                </li>
              )
            }
            {/* <li className="nav-item"> */}
            {/* {width > 990 && <ThemeToggle />} </li>*/}
            {isLoggedIn ? (
              <li className="nav-item" style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                <NavLink to="/Profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  <span title={user?.username} className="user_image">heyy, <img alt={user?.username} src={user.picture ? user.picture : DefaultImg} width={20}
                  height={20}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  referrerPolicy="no-referrer"></img></span>
                </NavLink>
                {/* <span className="user_image"><img alt={user?.username} src={user.picture ? user.picture : DefaultImg} width={20}
                  height={20}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  referrerPolicy="no-referrer"></img></span> */}
                {/* {!user.picture ? "empty picture" :
                } */}
              </li>
            ) : ""}
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Login
                </NavLink>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;


// const Nav = () => {
//     return (
//         <div className="nav">
//             <div className="first"
//                 style={{
//                     display: "flex",
//                     padding: "5px 0 5px 5px",
//                     fontSize: "20px",
//                 }}
//             >
//                 <div style={{ margin: "10px" }}>
//                     <NavLink
//                         to="/"
//                         replace={false}
//                         style={({ isActive }) => ({
//                             color: isActive ? "greenyellow" : "white",
//                         })}
//                     >
//                         Home
//                     </NavLink>
//                 </div>
//                 <div style={{ margin: "10px" }}>
//                     <NavLink
//                         to="/about"
//                         style={({ isActive }) => ({
//                             color: isActive ? "greenyellow" : "white",
//                         })}
//                     >
//                         About
//                     </NavLink>
//                 </div>
//                 <div style={{ margin: "10px" }}>
//                     <NavLink
//                         to="/contact"
//                         style={({ isActive }) => ({
//                             color: isActive ? "greenyellow" : "white",
//                         })}
//                     >
//                         Contact
//                     </NavLink>
//                 </div>
//                 {/* <div style={{ margin: "10px" }}>
//                     <NavLink
//                         to="/Login"
//                         // replace={false}
//                         style={({ isActive }) => ({
//                             color: isActive ? "greenyellow" : "white",
//                         })}
//                     >
//                         Login
//                     </NavLink>
//                 </div> */}
//             </div>
//             <div className="second" style={{
//                     display: "flex",
//                     padding: "5px 0 5px 5px",
//                     fontSize: "20px",
//                 }}>
//                     <div style={{ margin: "10px" }}>
//                         <ThemeToggle/>
//                     </div>
//                 <div className="second__item" style={{ margin: "10px" }}>
//                     <NavLink
//                     to="/Login"
//                     replace={false}
//                     style={({ isActive }) => ({
//                         color: isActive ? "greenyellow" : "white",
//                         })}
//                         >
//                             Login
//                         </NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Nav;
