import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import auth from '../../lib/axios';
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
  const router = useRouter();
  const classId = router.query.id;
  const [classData, setClassData] = useState([]);

  const getClass = async () => {
    try {
      const response = await auth.get(`/api/classes/getclass?id=${classId}`);
      setClassData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getClass();
  }, []);

  return (
    <Container>
      <ReactPlayer
        url={classData.videoURL}
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
