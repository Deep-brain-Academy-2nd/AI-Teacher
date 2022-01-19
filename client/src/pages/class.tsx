import { useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { basicWrap } from '../styles/container';

const Container = styled.div`
  ${basicWrap}
`;
const Class = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <Container>
      <ReactPlayer
        url={
          'https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/ysy_1_b1c95c121eba4ff3619643650ea3b7d3.mp4'
        }
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
        controls
        width='100%'
        height='100%'
      />
    </Container>
  );
};

export default Class;
