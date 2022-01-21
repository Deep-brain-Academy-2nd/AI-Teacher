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
const Class = () => {
  const [card, setCard] = useState([]);

  const getClassList = async () => {
    try {
      const response = await auth.get('/api/classes/getclasses');
      setCard(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getClassList();
  }, []);

  return (
    <Container>
      {card?.map((item) => {
        return <Card key={item._id} {...item} />;
      })}
    </Container>
  );
};

export default Class;
