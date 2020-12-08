import React, { useReducer, useState,useEffect } from 'react';
import { Context } from './Store/store'
import themes from './Components/Themes/Themes';
import { ContextContainer } from './Components/ContextContainer';
import { useSwitch } from './SelfHooks/useSwitch';

const reducer = (state, action) => {

  switch (action.type) {
    case "ThemeDafault":
      return themes.defaultTheme;
    case "ThemeOther":
      return themes.otherTheme;
    case "ThemeCustom":
      return 0;
    default:
      return "處理Theme失敗";
  }
}

function App() {

  const [Theme, setTheme] = useReducer(reducer, themes.defaultTheme);
  const [APIUrl, setAPIUrl] = useState("http://aso.1966.org.tw:20020/");
  const [Value, Switch, Open, Close] = useSwitch();//控制重新渲染路由

//   useEffect(() => {
//     localStorage.setItem('Auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
// }, [])

  return (
    <>
      < Context.Provider value={{ APIUrl, Theme, setTheme, Switch }}>
        <ContextContainer />
      </Context.Provider>
    </>
  );
}

export default App;
