import React from "react";
import { Helmet } from "react-helmet";
import image2 from "../Assets/images/image2.png";
import add from "../Assets/images/add.svg"
import { Link } from "react-router-dom";

const Home = () => {
  const getStarted = () => {

  }



  return (
    <>
      {/*to cchange the title on webages start here*/}
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {/*to cchange the title on webages ends here*/}
      <main>
        {/*Hero Section Starts*/}
        <section className="hero-section">
          <div className="container-lg container container-xl container-md section">
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xl-6">
                <div className="hero-content-left">
                  <h1 className="hero-title">Build your <br></br>Awesome<br></br> website</h1>
                  <p className="hero-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br></br>Sed
                    sit amet nulla auctor,<br></br> vestibulum magna sed, convallis ex.</p>
                  <Link to={"/contact"}>
                    <button className="btn btn-primary" style={{ width: "150px", height: "50px" }}>Get Started <span className="btn-svg"><svg width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.17263 0.964197C2.17263 0.597651 2.46977 0.300507 2.83632 0.300507L8.14584 0.300507C8.51239 0.300507 8.80953 0.597651 8.80953 0.964197V6.27372C8.80953 6.64027 8.51239 6.93741 8.14584 6.93741C7.77929 6.93741 7.48215 6.64027 7.48215 6.27372V2.56649L1.97824 8.0704C1.71905 8.32959 1.29882 8.32959 1.03964 8.0704C0.780449 7.81121 0.780449 7.39099 1.03964 7.1318L6.54355 1.62789L2.83632 1.62789C2.46977 1.62789 2.17263 1.33074 2.17263 0.964197Z" fill="white" />
                    </svg></span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xl-6">
                <div className="hero-content-right">
                  <div className="hero-image">
                    <img src={image2} alt="hero-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Hero section Ends*/}
        <section className="About-section">
          <div className="container-lg container-xl container-md section">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12">
                <div className="card1">
                  <div className="card-body">
                    <img src={add} className="card-image" alt="add" />
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make
                      up the bulk of the card's content.</p>
                    <button className="btn btn-primary" onClick={getStarted}>Get Started</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12">
                <div className="card1">
                  <div className="card-body">
                    <img src={add} className="card-image" alt="add" />
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make
                      up the bulk of the card's content.</p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12">
                <div className="card1">
                  <div className="card-body">
                    <img src={add} className="card-image" alt="add" />
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make
                      up the bulk of the card's content.</p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3 col-sm-12">
                <div className="card1">
                  <div className="card-body">
                    <img src={add} className="card-image" alt="add" />
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make
                      up the bulk of the card's content.</p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section3">

        </section>
      </main>
      <footer>
        <section className="footer-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-xl-3 col-sm-6">
                <h2>some content 1</h2>
              </div>
              <div className="col-md-4 col-xl-3 col-sm-6">
                <h2>some content 2</h2>
              </div>
              <div className="col-md-4 col-xl-3 col-sm-6">
                <h2>some content 3</h2>
              </div>

              <div className="col-md-4 col-xl-3 col-sm-6">
                <h2>some content 4</h2>
              </div>
            </div>
          </div>
        </section>
      </footer>
      {/* <div class="container-lg container-md container-xl">100% wide until large breakpoint</div> */}
    </>
  );
};

export default Home;
