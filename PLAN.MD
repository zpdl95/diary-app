1. npx create-react-native-app 으로 앱생성
2. npm install @react-navigation/native -> 리액트네비게이션 설치
3. expo install react-native-screens react-native-safe-area-context -> create-react-native-app으로 생성했기때문에 expo프로젝트에도 리엑트네비게이션을 사용할것이라고 알려줘야한다
4. npx pod-install ios -> 맥북으로 개발중이라면 설치해야한다(새로운 컴포넌트를 설치한뒤 매번 실행)
5. npm install @react-navigation/native-stack -> 네이티브스택네비게이션 설치
6. npm install styled-components -> css스타일을 사용하기위해 설치. 사용하기 쉽고 prop에 접근가능한 스타일 컴포넌트
7. npm i @types/styled-components @types/styled-components-react-native -> 타입스크립트 없이 자동완성을 시켜줌
8. npm i realm -> Realm은 모바일에 최적화된 크로스 플랫폼 모바일 데이터베이스로, SQLite 및 Core Data의 대안. `https://docs.mongodb.com/realm/sdk/node/quick-start-local/`,`https://docs.mongodb.com/realm-sdks/js/latest/Realm.Collection.html#sorted` 설치후 전부다 끄고 앱을 리빌딩해야함
9. expo install expo-app-loading -> 앱이 실행되기전에 필요한것들을 미리 로딩하는 방법 <AppLoading>컴포넌트를 설치
