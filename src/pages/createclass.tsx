import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import SubmitButton from "../components/atoms/SubmitButton";
import color from "../styles/colors";
import { basicWrap } from "../styles/container";
import { Heading1 } from "../styles/typography";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import auth from "../lib/axios";
import {
  setAiStudioClientToken,
  setAiStudioKey,
  setAiStudioToken,
} from "../redux/modules/aistudio";
import { RootState } from "../redux/store";
import axios from "axios";
import { useRouter } from "next/router";
import ProgressModal from "../components/molecules/ProgressModal";

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

// 강의 생성 라우터
const Createclass = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // AI 스튜디오 api 호출에 필요한 스토어 상태들
  const ai = useSelector((state: RootState) => state.aistudio);

  // 강사 이름
  const [teacherName, setTeacherName] = useState("");
  // AI 옷 옵션
  const [clothe, setClothe] = useState("");

  // AI 모델 옵션
  const [model, setModel] = useState("");

  // 강의 명
  const [lectureName, setLectureName] = useState("");

  // 강의 상세
  const [description, setDescription] = useState("");

  // 강의 스크립트
  const [lectureText, setLectureText] = useState("");

  // 이미지 저장
  const [image, setImage] = useState("");

  // 비디오 저장
  const [newVideo, setNewVideo] = useState("");

  // 진행도 저장
  const [progress, setProgress] = useState(0);
  const [isUploadDone, setIsUploadDone] = useState(false);

  // 인풋값 핸들링 함수들
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

  // AI Studio 클라이언트 토큰 발급받는 함수
  const generateClientToken = async () => {
    try {
      setIsUploadDone(true);
      const response = await axios.get(
        "/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9"
      );
      dispatch(setAiStudioClientToken(response.data));
      // 발급 받은 뒤 토큰 발행되는 함수 호출.
      await generateToken(response.data);
    } catch (error) {
      console.error(error);
      setIsUploadDone(false);
      alert("강의등록에 실패했습니다.");
    }
  };

  // AI 토큰 발행하는 함수
  const generateToken = async (token: any) => {
    try {
      const response = await axios.post("/api/odin/generateToken", {
        appId: ai.aistudios.appId,
        platform: "web",
        isClientToken: true,
        token: token.token,
        uuid: ai.aistudios.uuid,
        sdk_v: "1.0",
        clientHostname: "aistudios.com",
      });
      dispatch(setAiStudioToken(response.data.token));
      // 토큰 발행 이후 그 값을 가지고 비디오를 만드는 함수 호출
      await makeVideo(response.data.token);
    } catch (error) {
      console.error(error);
      setIsUploadDone(false);
      alert("강의등록에 실패했습니다.");
    }
  };

  // 저장된 모델 , 옷, 텍스트를 가지고 makevideo API 호출
  const makeVideo = async (token: any) => {
    try {
      const response = await axios.post("/api/odin/makeVideo", {
        appId: ai.aistudios.appId,
        platform: "web",
        isClientToken: true,
        token: token,
        uuid: ai.aistudios.uuid,
        sdk_v: "1.0",
        clientHostname: "aistudios.com",
        language: "ko",
        text: lectureText,
        model: model,
        clothes: clothe,
      });
      dispatch(setAiStudioKey(response.data.data.key));
      // 현재 비디오 진행 상태를 확인하기 위해 findProject 호출
      await findProject(response.data.data.key, token);
    } catch (error) {
      console.error(error);
      setIsUploadDone(false);
      alert("강의등록에 실패했습니다.");
    }
  };

  const findProject = useCallback(async (key, token) => {
    try {
      const response = await axios.post("/api/odin/findProject", {
        appId: ai.aistudios.appId,
        platform: "web",
        isClientToken: true,
        token: token,
        uuid: ai.aistudios.uuid,
        sdk_v: "1.0",
        clientHostname: "aistudios.com",
        key: key,
      });

      // 받아온 response에 video 값이 생길 때까지 지속적으로 호출해줍니다.
      if (!response.data.data.video) {
        const timeout = setTimeout(() => {
          findProject(key, token);
        }, 2000);
      }
      setProgress(
        response.data.data.progress !== "waiting"
          ? response.data.data.progress
          : 0
      );
      // 비디오가 생성이 완룐되면 newVideo 에 저장합니다
      if (response.data.data.video) {
        setNewVideo(response.data.data.video);
      }
    } catch (error) {
      console.error(error);
      setIsUploadDone(false);
      alert("강의등록에 실패했습니다.");
    }
  }, []);

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    generateClientToken();
  };

  // 비디오가 생성된걸 감지하면 createclass api를 호출해서 데이터베이스에 값을 저장해둡니다.
  const handleCreateClass = async () => {
    if (newVideo) {
      try {
        await auth.post("/api/classes/createclass", {
          name: teacherName,
          model,
          clothe,
          title: lectureName,
          content: lectureText,
          description,
          imageFile: image,
          videoURL: newVideo,
        });

        setIsUploadDone(false);
        alert("강의 등록이 완료되었습니다.");
        router.push("/");
      } catch (error) {
        console.error(error);
        setIsUploadDone(false);
        alert("강의등록에 실패했습니다.");
      }
    }
  };

  // 비디오가 업로드되었다는것을 감지할 수 있게 디펜덴시 값으로 newVideo를 넣었습니다.
  useEffect(() => {
    handleCreateClass();
  }, [newVideo]);

  // 첨부 이미지 받아서 티코딩 해주는 함수
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    let reader: any = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container onSubmit={handleOnSubmit}>
        <Title>강의 등록</Title>
        <img src={image && image} width={"100px"} />
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={handleImageUpload}
        ></input>
        <TextField
          id="outlined-basic"
          label="AI 강사 이름 *"
          variant="outlined"
          value={teacherName}
          onChange={handleTeacherChange}
          style={{ margin: "20px 0" }}
        />
        <SelectContainer>
          <FormControl required sx={{ minWidth: "49%" }}>
            <InputLabel id="demo-simple-select-required-label">
              AI 모델
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={model}
              label="AI 모델 *"
              onChange={handleModelChange}
            >
              <MenuItem value={"shaosuki"}>샤오치</MenuItem>
              <MenuItem value={"jonadan_ces"}>조나단</MenuItem>
              <MenuItem value={"mizuki"}>미즈키</MenuItem>
              <MenuItem value={"ysy"}>윤선영</MenuItem>
            </Select>
          </FormControl>
          <FormControl required sx={{ minWidth: "49%" }}>
            <InputLabel id="demo-simple-select-required-label">
              AI 옷
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={clothe}
              label="AI 옷 *"
              onChange={handleClotheChange}
            >
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
        </SelectContainer>
        <TextField
          id="outlined-basic"
          label="강의명 *"
          variant="outlined"
          value={lectureName}
          onChange={handleLectureNameChange}
          style={{ margin: "20px 0" }}
        />
        <TextField
          id="outlined-basic"
          label="강의 상세 *"
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
          style={{ margin: "20px 0" }}
        />
        <TextField
          id="outlined-textarea"
          label="강의 내용 *"
          multiline
          rows={8}
          value={lectureText}
          onChange={handleLectureTextChange}
          style={{ margin: "20px 0" }}
        />
        {isUploadDone ? <ProgressModal value={progress} /> : null}
        <SubmitButton type="submit" label="강의등록" />
      </Container>
    </>
  );
};

export default Createclass;
