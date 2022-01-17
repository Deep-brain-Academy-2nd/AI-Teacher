import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Flex } from "rebass";

const Home: NextPage = () => {
  const generateClientToken = async () => {
    try {
      const response = await axios.get(
        "/getToken/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9"
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateClientToken();
  }, []);
  return <Flex></Flex>;
};

export default Home;
