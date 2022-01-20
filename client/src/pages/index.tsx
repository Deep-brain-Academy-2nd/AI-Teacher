import axios from 'axios';
import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from 'rebass';
import auth from '../lib/axios';
import {
  setAiStudioClientToken,
  setAiStudioKey,
  setAiStudioToken,
} from '../redux/modules/aistudio';
import { RootState } from '../redux/store';

const Home: NextPage = () => {
  return <Flex></Flex>;
};

export default Home;
