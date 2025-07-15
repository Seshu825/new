import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthContext";
import { Container } from "react-bootstrap";
import DefaultImg from "../Assets/images/1.jpg";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log("user image", user.picture)


  // const { picture, username, email } = user;
  // console.log("picture", picture);
  // console.log("username", username);
  // console.log("email", email);
  return (
    <>

      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <Container>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={user?.picture || DefaultImg}
            alt={user?.username}
            width={120}
            height={120}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            referrerPolicy="no-referrer"
          />
          <h3 className="">{user?.username}</h3>
          <p>{user?.email}</p>
        </div>

      </Container> </>
  );
};

export default Profile;
