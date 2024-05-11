import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slidercomp.css";
import "../../images/banner1.webp";
import "../../images/banner2.avif";
import "../../images/banner3.webp";
import "../../images/banner4.jpeg";
export default function Slidercomp() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="slider_container">
      <Slider {...settings}>
        <div className="banner banner1 relative">
          <div className="bannerdetails flex justify-start items-center absolute">
            <div>
              <p className="text-2xl mb-2 text-c4">
                Women new-Collection 2024{" "}
              </p>
              <h2 className="text-7xl mb-5">New season</h2>
              <button className="btncta">shop now</button>
            </div>
          </div>
        </div>
        <div className="banner banner2 relative">
          <div className="bannerdetails flex justify-start items-center absolute">
            <div>
              <p className="text-2xl mb-2 text-c4">
                best electronic collection 2024
              </p>
              <h2 className="text-7xl mb-5">New arrivals</h2>
              <button className="btncta">shop now</button>
            </div>
          </div>
        </div>
        <div className="banner banner3 relative">
          <div className="bannerdetails flex justify-start items-center absolute">
            <div>
              <p className="text-2xl mb-2 text-c4">men new-Collection 2024 </p>
              <h2 className="text-7xl mb-5">New season</h2>
              <button className="btncta">shop now</button>
            </div>
          </div>
        </div>
        <div className="banner banner4 relative">
          <div className="bannerdetails flex justify-start items-center absolute">
            <div>
              <p className="text-2xl mb-2 text-c4">
                best books collection 2024
              </p>
              <h2 className="text-7xl mb-5">New arrivals</h2>
              <button className="btncta">shop now</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
