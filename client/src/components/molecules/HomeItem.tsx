import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper";

import HomeCard from "./HomeCard";
import { mediaQuery, pxToVw } from "../../styles/media";
SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);
const Container = styled.div`
  padding: 16px;

  ${mediaQuery(640)} {
    padding: 32px;
  }
`;

const ItemTitle = styled.div`
  padding-bottom: 16px;
  font-size: ${pxToVw(24)};
  font-weight: 700;
  ${mediaQuery(640)} {
    padding-bottom: 32px;
    font-size: 24px;
  }
`;

const HomeItem = ({ card, item }: any) => {
  const filtered =
    item === "인기 강의" || item === "추천 강의"
      ? card.filter((items) => items.title.includes("한글 맞춤법 잘 알기"))
      : card.filter((items) => !items.title.includes("한글 맞춤법 잘 알기"));
  return (
    <Container>
      <ItemTitle>{item}</ItemTitle>
      <Swiper
        breakpoints={{
          "375": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "640": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "768": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          "1024": {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {filtered?.map((items, idx) => (
          <SwiperSlide key={idx}>
            <HomeCard {...items} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default HomeItem;
