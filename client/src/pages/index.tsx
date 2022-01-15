import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Flex } from 'rebass';

const Home: NextPage = () => {
  const generateClientToken = async () => {
    try {
      const response = await axios.get('/api/getToken');
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    generateClientToken();
  }, []);
  return <Flex>HOME</Flex>;
};

export default Home;
