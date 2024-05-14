import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

export default function ProductDetailsSlider({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container">
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {images?.map((image, idx) => {
          return (
            <div key={idx}>
              <img src={image} className="w-100 rounded-xl" alt="" />
            </div>
          );
        })}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {images?.map((image, idx) => {
          return (
            <div key={idx}>
              <img src={image} className="w-100 rounded-xl" alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
