import { TextField } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { basicWrap } from '../styles/container';

const Container = styled.div`
  ${basicWrap}
`;

const Submit = styled.button``;

const Createclass = () => {
  const [teacherName, setTeacherName] = useState('');
  const [category, setCategory] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [lectureText, setLectureText] = useState('');

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherName(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handleLectureNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureName(e.target.value);
  };
  const handleLectureTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLectureText(e.target.value);
  };

  return (
    <Container>
      <TextField
        id='outlined-basic'
        label='강사 이름'
        variant='outlined'
        value={teacherName}
        onChange={handleTeacherChange}
      />
      <TextField
        id='outlined-basic'
        label='카테고리'
        variant='outlined'
        value={category}
        onChange={handleCategoryChange}
      />
      <TextField
        id='outlined-basic'
        label='강좌명'
        variant='outlined'
        value={lectureName}
        onChange={handleLectureNameChange}
      />
      <TextField
        id='outlined-textarea'
        label='강의 내용'
        placeholder='Placeholder'
        multiline
        rows={8}
        value={lectureText}
        onChange={handleLectureTextChange}
      />
      <Submit>강의등록</Submit>
    </Container>
  );
};

export default Createclass;
