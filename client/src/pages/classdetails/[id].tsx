import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import auth from "../../lib/axios";
import color from "../../styles/colors";
import { basicWrap } from "../../styles/container";
import { mediaQuery, pxToVw } from "../../styles/media";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ClassInfo } from "../../@types/classInfo";
import Review from "../../components/molecules/Review";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${pxToVw(66)} ${pxToVw(24)};
  margin: 0 auto;
  ${mediaQuery(640)} {
    padding: 66px 24px;
    width: 1080px;
    margin: 0 auto;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  ${mediaQuery(640)} {
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;

  ${mediaQuery(640)} {
    width: 40%;
    height: 100%;
  }
  /* ${mediaQuery(1080)} {
    width: 30%;
  } */
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${pxToVw(3)};
  box-shadow: rgb(41 42 43 / 16%) 0px 2px 6px -2px;
  border: 1px solid rgb(255, 255, 255);
  margin-top: ${pxToVw(12)};
  color: ${color.grayscale.gray02};
  ${mediaQuery(640)} {
    margin-top: 0px;
    width: 40%;
    margin-left: 50px;
    border: 1px solid rgb(255, 255, 255);
    margin-bottom: 12px;
  }
  /* 
  ${mediaQuery(1080)} {
    width: 30%;
  } */
`;

const InfoImage = styled.img`
  width: 100%;
  border-radius: 9px;
`;

const InfoPadding = styled.div`
  padding: 16px;
`;

const InfoName = styled.div`
  font-size: ${pxToVw(14)};
  margin: ${pxToVw(4)} 0 ${pxToVw(8)} 0;

  ${mediaQuery(640)} {
    font-size: 14px;
    margin: 4px 0 8px 0;
  }
`;

const InfoTitle = styled.div`
  font-size: ${pxToVw(20)};
  font-weight: 600;
  margin: ${pxToVw(4)} 0 ${pxToVw(8)} 0;
  ${mediaQuery(640)} {
    font-size: 20px;
    margin: 4px 0 8px 0;
  }
`;

const InfoDescription = styled.div`
  font-size: ${pxToVw(16)};
  margin: ${pxToVw(4)} 0 ${pxToVw(8)} 0;
  height: ${pxToVw(30)};
  ${mediaQuery(640)} {
    font-size: 16px;
    margin: 4px 0 8px 0;
    height: 40px;
  }
`;

const InfoModel = styled.div`
  font-size: ${pxToVw(12)};
  font-weight: 600;
  margin: ${pxToVw(4)} 0 ${pxToVw(8)} 0;
  color: ${color.grayscale.gray04};
  ${mediaQuery(640)} {
    font-size: 12px;
    margin: 4px 0 8px 0;
  }
`;

const InfoContentTitle = styled.div`
  font-size: ${pxToVw(20)};
  font-weight: 600;
  color: ${color.white};
  background-color: ${color.primary};
  border-radius: 2px;
  padding: 5px;
  margin: ${pxToVw(20)} 0 ${pxToVw(8)} 0;
  ${mediaQuery(640)} {
    font-size: 20px;
    margin: 20px 0 8px 0;
  }
`;

const InfoContent = styled.div`
  height: 300px;
  overflow-y: auto;
`;

const LikeButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassDetails = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const classId = router.query.id;
  const [classData, setClassData] = useState<any>([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    getClass();
  }, [router.isReady]);

  const getClass = async () => {
    try {
      const response = await auth.get(`/api/classes/getclass?id=${classId}`);
      setClassData(response.data.data);
    } catch (error) {}
  };

  const Like = async () => {
    if (!user.token) {
      alert("로그인이 필요한 서비스입니다.");
    }
    if (user.token) {
      try {
        const response = await auth.post("/api/like/like", {
          lectureId: classId,
        });
        setStatus(response);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getClass();
  }, [status]);

  return (
    <Container>
      <TopContainer>
        <VideoContainer>
          <ReactPlayer
            url={classData.videoURL}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
            controls
            width="100%"
            height="100%"
          />
        </VideoContainer>

        <InfoBox>
          <InfoImage src={classData.imageFile} />
          <InfoPadding>
            <InfoName>{classData.name}</InfoName>

            <InfoTitle>{classData.title}</InfoTitle>
            <InfoContentTitle>강의 소개</InfoContentTitle>
            <InfoDescription>{classData.description}</InfoDescription>

            <InfoContentTitle>강의 대본</InfoContentTitle>
            <InfoContent>{classData.content}</InfoContent>
            <BottomInfo>
              <LikeButton onClick={Like}>
                {classData.likeUser &&
                classData.likeUser.includes(user.userId) ? (
                  <AiFillHeart
                    style={{
                      width: 22,
                      height: 22,
                      color: color.primary,
                      marginRight: 8,
                    }}
                  />
                ) : (
                  <AiOutlineHeart
                    style={{
                      width: 22,
                      height: 22,
                      color: color.primary,
                      marginRight: 8,
                    }}
                  />
                )}
                <InfoModel>{classData.like}</InfoModel>
              </LikeButton>
              <InfoModel>{`AI 모델 : ${classData.model}`}</InfoModel>
            </BottomInfo>
          </InfoPadding>
        </InfoBox>
      </TopContainer>
      <Review />
    </Container>
  );
};

export default ClassDetails;
