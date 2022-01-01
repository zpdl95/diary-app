import React, { useEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from "react-native";
import styled from "styled-components/native";
import { AdMobBanner } from "expo-ads-admob";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
  padding-top: 50px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 39px;
  width: 100%;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 35px;
  right: 35px;
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

/* LayoutAnimation을 사용할때 안드로이드 사용자는 설정해야하는 옵션 */
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  /* 컴포넌트가 마운트됐을때 */
  useEffect(() => {
    const feelings = realm.objects("Feeling");

    /* 변경사항을 볼 수 있는 이벤트 핸들러 */
    feelings.addListener((feelings, changes) => {
      /* state를 변경할때 나타날 layout변화를 animate하고 싶으면 사용 */
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setFeelings(feelings.sorted("_id", true));
    });

    /* 컴포넌트가 언마운트됐을때 */
    return () => {
      feelings.removeAllListeners();
    };
  }, []);

  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Feeling", id);
      realm.delete(feeling);
    });
  };

  return (
    <View>
      <Title>Home</Title>
      <AdMobBanner
        /* ↑ 배너광고컴포넌트 */
        style={{
          backgroundColor: "#9c88ff",
          borderColor: "#291E5F",
          borderWidth: 3,
        }}
        bannerSize="fullBanner"
        /* Test ID, Replace with your-admob-unit-id
        광고의 형태에 따라 운영체제에 따라 사용하는 ID도 다르다 */
        adUnitID="ca-app-pub-3940256099942544/6300978111"
      />
      <FlatList
        style={{ marginVertical: 50, width: "100%" }}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        data={feelings}
        keyExtractor={(feeling) => feeling._id + ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="pencil-sharp" color={"white"} size={30} />
      </Btn>
    </View>
  );
};

export default Home;
