import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SubmitButton from '../components/atoms/SubmitButton';
import { RootState } from '../redux/store';
import color from '../styles/colors';
import { basicWrap } from '../styles/container';
import { Heading1 } from '../styles/typography';

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
  const [lectureText, setLectureText] = useState('');

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherName(e.target.value);
  };
  const handleClotheChange = (e) => {
    setClothe(e.target.value);
  };
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };
  const handleLectureNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureName(e.target.value);
  };
  const handleLectureTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureText(e.target.value);
  };

  const handleOnSubmit = () => {
    console.log(clothe, model);
    if (!user.token) {
      alert('로그인이 필요합니다.');
    }
  };
  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>강의 등록</Title>
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
