import axios from 'axios';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from 'swiper';
import color from '../styles/colors';
import { mediaQuery, pxToVw } from '../styles/media';
import SwiperItem from '../components/molecules/SwiperItem';
import HomeItem from '../components/molecules/HomeItem';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

const Container = styled.div`
  width: 100%;
  height: 450px;
`;

const Home: NextPage = () => {
  const [card, setCard] = useState([]);
  const tags = ['인기 강의', '신규 강의', '취-뽀! 성공', '추천 강의'];
  const user = useSelector((state: RootState) => state.user);
  console.log(user.token);
  const getClassList = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/classes/getclasses`
      );
      const result = response.data.data;

      const newResult = result.map((item: any) => {
        let obj = { ...item };
        obj.tag = ['인기 강의', '신규 강의', '취-뽀! 성공', '지식 공유'];
        obj.color = [color.primary, '#1d2025', '#00c471'];

        return obj;
      });

      setCard(newResult);
    } catch (error) {}
  };

  useEffect(() => {
    getClassList();
  }, []);

  return (
    <Container>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          type: 'progressbar',
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {card.map((items, idx) => (
          <SwiperSlide key={idx}>
            <SwiperItem {...items} />
          </SwiperSlide>
        ))}
      </Swiper>
      {tags.map((item, idx) => (
        <HomeItem key={idx} card={card} item={item} />
      ))}
    </Container>
  );
};

export default Home;
