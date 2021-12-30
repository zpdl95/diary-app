import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

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

const Write = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");

  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setSelectedEmotion(face);
  const onSubmit = () => {
    if (feelings === "" || selectedEmotion === null) {
      return Alert.alert("Please complete form");
    }
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
