import React, { useReducer } from 'react';
import { Context } from './Store/store'
import themes from './Components/Themes/Themes';
import { ContextContainer } from './Components/ContextContainer';

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

  return (
    <>
      < Context.Provider value={{ Theme, setTheme }}>
        <ContextContainer />
      </Context.Provider>
    </>
  );
}

export default App;
