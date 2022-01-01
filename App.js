import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Navigator from "./navigator";
import Realm from "realm";
import AppLoading from "expo-app-loading";
import { DBContext } from "./context";

/* DB의 형태인 Schema 생성 */
const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async () => {
    /* realm DB에 연결 */
    const connection = await Realm.open({
      path: "nomadDiaryDB",
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };
  const onFinish = () => setReady(true);
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
/* Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할 */
