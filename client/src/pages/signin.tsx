import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { basicWrap } from "../styles/container";

const Container = styled.div`
  ${basicWrap}
`;

const data = {
  name: "gi",
  email: "dani323ddd@doe.com",
  password: "123123",
  auth: "admin",
};

const Signin = () => {
  const getSignUp = async () => {
    try {
      const response = await axios.post("/api/auth/signup", data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSignUp();
  }, []);

  return <Container>로그인</Container>;
};

export default Signin;
