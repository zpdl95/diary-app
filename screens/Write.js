import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { useDB } from "../context";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: ${"#9c88ff"};
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 18px;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.btnColor};
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const EmotionBtn = styled.TouchableOpacity`
  elevation: 5;
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? colors.btnColor : "white")};
`;

const EmotionText = styled.Text`
  font-size: 18px;
`;

const emotions = ["😊", "😍", "😅", "😭", "🤬", "😱", "😴", "🥱"];

const Write = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");

  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setSelectedEmotion(face);
  const onSubmit = async () => {
    if (feelings === "" || selectedEmotion === null) {
      return Alert.alert("Please complete form");
    }
    realm.write(() => {
      const feeling = realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    /* 전면광고용 ID설정 */
    await AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");
    /* 광고 요청 */
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
    /* 광고 보여주기 */
    await AdMobRewarded.showAdAsync();
    goBack();
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <EmotionBtn
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </EmotionBtn>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
