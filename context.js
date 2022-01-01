import React, { useContext } from "react";

/* context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공 */
/* Context객체 생성 */
export const DBContext = React.createContext();

/* useDB를 만드는 이유는 context를 사용할때마다 DBContext와 useContext를 매번 import 하지않기 위함 */
export const useDB = () => {
  /* context를 사용하는 hook */
  return useContext(DBContext);
};
