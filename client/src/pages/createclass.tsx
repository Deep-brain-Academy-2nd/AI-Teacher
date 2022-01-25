import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import styled from 'styled-components';
import SubmitButton from '../components/atoms/SubmitButton';
import color from '../styles/colors';
import { basicWrap } from '../styles/container';
import { Heading1 } from '../styles/typography';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import auth from '../lib/axios';
import {
  setAiStudioClientToken,
  setAiStudioKey,
  setAiStudioToken,
} from '../redux/modules/aistudio';
import { RootState } from '../redux/store';
import axios from 'axios';

const Container = styled.form`
  ${basicWrap};
`;

const Title = styled(Heading1)`
  color: ${color.primary};
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Createclass = () => {
  const user = useSelector((state: RootState) => state.user);
  const [teacherName, setTeacherName] = useState('');
  const [clothe, setClothe] = useState('');
  const [model, setModel] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [description, setDescription] = useState('');
  const [lectureText, setLectureText] = useState('');
  const [image, setImage] = useState('');
  const [newVideo, setNewVideo] = useState('');

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherName(e.target.value);
  };
  const handleClotheChange = (e: any) => {
    setClothe(e.target.value);
  };
  const handleModelChange = (e: any) => {
    setModel(e.target.value);
  };
  const handleLectureNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleLectureTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureText(e.target.value);
  };

  const dispatch = useDispatch();
  const ai = useSelector((state: RootState) => state.aistudio);
  const generateClientToken = async () => {
    try {
      const response = await axios.get(
        '/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9'
      );
      dispatch(setAiStudioClientToken(response.data));
      await generateToken(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateToken = async (token: any) => {
    try {
      const response = await axios.post('/api/odin/generateToken', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: token.token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
      });
      dispatch(setAiStudioToken(response.data.token));
      await makeVideo(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const makeVideo = async (token: any) => {
    try {
      const response = await axios.post('/api/odin/makeVideo', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
        language: 'ko',
        text: lectureText,
        model: model,
        clothes: clothe,
      });
      dispatch(setAiStudioKey(response.data.data.key));
      await findProject(response.data.data.key, token);
    } catch (error) {
      console.log(error);
    }
  };

  const findProject = useCallback(async (key, token) => {
    try {
      const response = await axios.post('/api/odin/findProject', {
        appId: ai.aistudios.appId,
        platform: 'web',
        isClientToken: true,
        token: token,
        uuid: ai.aistudios.uuid,
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
        key: key,
      });

      if (!response.data.data.video) {
        const timeout = setTimeout(() => {
          findProject(key, token);
          console.log(response.data.data.progress);
        }, 5000);
      }
      if (response.data.data.video) {
        setNewVideo(response.data.data.video);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    generateClientToken();
  };

  const handleCreateClass = async () => {
    if (newVideo) {
      try {
        const response = await auth.post('/api/classes/createclass', {
          name: teacherName,
          model,
          clothe,
          title: lectureName,
          content: lectureText,
          description,
          imageFile: image,
          videoURL: newVideo,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleCreateClass();
  }, [newVideo]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    let reader: any = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>강의 등록</Title>
      <img src={image && image} width={'100px'} />
      <input
        type='file'
        accept='image/jpg,image/png,image/jpeg,image/gif'
        name='profile_img'
        onChange={handleImageUpload}
      ></input>
      <TextField
        id='outlined-basic'
        label='AI 강사 이름 *'
        variant='outlined'
        value={teacherName}
        onChange={handleTeacherChange}
        style={{ margin: '20px 0' }}
      />
      <SelectContainer>
        <FormControl required sx={{ minWidth: '49%' }}>
          <InputLabel id='demo-simple-select-required-label'>
            AI 모델
          </InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            value={model}
            label='AI 모델 *'
            onChange={handleModelChange}
          >
            <MenuItem value={'shaosuki'}>샤오치</MenuItem>
            <MenuItem value={'jonadan_ces'}>조나단</MenuItem>
            <MenuItem value={'mizuki'}>미즈키</MenuItem>
            <MenuItem value={'ysy'}>윤선영</MenuItem>
          </Select>
        </FormControl>
        <FormControl required sx={{ minWidth: '49%' }}>
          <InputLabel id='demo-simple-select-required-label'>AI 옷</InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            value={clothe}
            label='AI 옷 *'
            onChange={handleClotheChange}
          >
            <MenuItem value={1}>1</MenuItem>
          </Select>
        </FormControl>
      </SelectContainer>
      <TextField
        id='outlined-basic'
        label='강의명 *'
        variant='outlined'
        value={lectureName}
        onChange={handleLectureNameChange}
        style={{ margin: '20px 0' }}
      />
      <TextField
        id='outlined-basic'
        label='강의 상세 *'
        variant='outlined'
        value={description}
        onChange={handleDescriptionChange}
        style={{ margin: '20px 0' }}
      />
      <TextField
        id='outlined-textarea'
        label='강의 내용 *'
        multiline
        rows={8}
        value={lectureText}
        onChange={handleLectureTextChange}
        style={{ margin: '20px 0' }}
      />
      <SubmitButton type='submit' label='강의등록' />
    </Container>
  );
};

export default Createclass;
