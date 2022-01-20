import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { basicWrap } from '../styles/container';

const Container = styled.div`
  ${basicWrap}
`;
const Class = () => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push('/classdetails/1')}>클래스</Container>
  );
};

export default Class;
