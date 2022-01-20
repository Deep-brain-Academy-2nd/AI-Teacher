import ReactPlayer from 'react-player';
import styled from 'styled-components';
import color from '../../styles/colors';
import { basicWrap } from '../../styles/container';

const Container = styled.div`
  ${basicWrap}
`;

const InfoBox = styled.div`
  border: 1px solid ${color.primary};
  border-radius: 9px;
`;

const ClassDetails = () => {
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
      <InfoBox></InfoBox>
    </Container>
  );
};

export default ClassDetails;
