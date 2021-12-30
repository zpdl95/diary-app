import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 50px;
  padding-top: 50px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 39px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 60px;
  width: 60px;
  border-radius: 40px;
  background-color: ${colors.btnColor};
  justify-content: center;
  align-items: center;
  elevation: 7;
`;

const Home = ({ navigation: { navigate } }) => (
  <View>
    <Title>Home</Title>
    <Btn onPress={() => navigate("Write")}>
      <Ionicons name="pencil-sharp" color={"white"} size={30} />
    </Btn>
  </View>
);

export default Home;
