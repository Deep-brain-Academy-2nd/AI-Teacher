import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/molecules/Card';
import auth from '../lib/axios';
import { basicWrap } from '../styles/container';
import { mediaQuery, pxToVw } from '../styles/media';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${pxToVw(66)} ${pxToVw(24)};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  ${mediaQuery(640)} {
    width: 100%;
    margin: 0 auto;
    padding: 66px 24px;
  }
`;

// 강의 리스트 라우터
const Class = () => {
  const [card, setCard] = useState([]);
  const [like, setLike] = useState(false);

  // getclasses api에서 강의 리스트를 받아와서 card에 저장해둡니다.
  const getClassList = async () => {
    try {
      const response = await auth.get('/api/classes/getclasses');
      setCard(response.data.data);
    } catch (error) {}
  };

  // 좋아요 상태 변경 감지 함수
  const handleLike = () => {
    setLike(!like);
  };

  // 좋아요 상태가 변할 때마다 getClassList를 다시 호출해줍니다.
  useEffect(() => {
    getClassList();
  }, [like]);

  return (
    <Container>
      {card?.map((item) => {
        /* @ts-ignore */
        return <Card key={item._id} {...item} handleLike={handleLike} />;
      })}
    </Container>
  );
};

export default Class;
