import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const ai = useSelector((state: RootState) => state.aistudio);
  const generateClientToken = async () => {
    try {
      const response = await axios.get(
        '/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9'
      );
      dispatch(setAiStudioClientToken(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const generateToken = async () => {
    try {
      const response = await auth.post('/api/odin/generateToken', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: ai.aistudios.clientToken.token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
      });
      dispatch(setAiStudioToken(response.data.token));
    } catch (error) {
      console.log(error);
    }
  };

  // key -MtgGdOQbcw6jnpzEiMH
  const makeVideo = async () => {
    try {
      const response = await auth.post('/api/odin/makeVideo', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: ai.aistudios.token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
        language: 'ko',
        text: '예솔님 이거 내가 만들었다',
        model: 'ysy',
        clothes: '1',
      });
      dispatch(setAiStudioKey(response.data.data.key));
    } catch (error) {
      console.log(error);
    }
  };

  const findProject = async () => {
    try {
      const response = await auth.post('/api/odin/findProject', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: ai.aistudios.token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
        key: ai.aistudios.key,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // generateClientToken();
    // generateToken();
    // makeVideo();
    findProject();
  }, []);
  return <Flex></Flex>;
};

export default Home;
