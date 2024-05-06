// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "./style.scss";

import "swiper/css/effect-fade";

export const MySwiper = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect="fade"
      pagination={{ clickable: true }}
      navigation
    //   autoplay   
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className="slide">
        <img src="./mov-1.jpeg" className="slide__img" alt="Постер фильма" />
        <p>Slide 1</p>
      </SwiperSlide>
      <SwiperSlide className="slide">
        <img src="./mov-2.jpeg" className="slide__img" alt="Постер фильма" />
        <p>Slide 2</p>
      </SwiperSlide>
      <SwiperSlide className="slide">Slide 3</SwiperSlide>
      <SwiperSlide className="slide">Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};
