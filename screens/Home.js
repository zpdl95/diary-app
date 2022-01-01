import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList } from "react-native";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
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
  elevation: 5;
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
`;

const Emotion = styled.Text`
  font-size: 20px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 20px;
`;

const Separator = styled.View`
  height: 15px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  /* 컴포넌트가 마운트됐을때 */
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    setFeelings(feelings);

    /* 변경사항을 볼 수 있는 이벤트 핸들러 */
    feelings.addListener(() => {
      const feelings = realm.objects("Feeling");
      setFeelings(feelings);
    });

    /* 컴포넌트가 언마운트됐을때 */
    return () => {
      feelings.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Title>Home</Title>
      <FlatList
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        data={feelings}
        keyExtractor={(feeling) => feeling._id}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="pencil-sharp" color={"white"} size={30} />
      </Btn>
    </View>
  );
};

export default Home;
