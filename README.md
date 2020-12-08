# {專案名}說明文件

[toc]

## 起專案步驟

```tex
$ npm install
	install 若有發生錯誤，請執行
	$ npm cache clean --force

$ npm start

acc:admin
pwd:1qaz@WSX
```

## 專案資料夾架構分配

- src 開發資料夾
  - Components 放置組件 (其下可以專案複雜度調整各組件資料夾)
    - Buttons.js (表不只一種按紐)
    - Containers.js (表不只一種按紐)
    - Themes (樣式控管資料夾，按分工拆分各檔案，以利版控協作)
      - DefaultTheme
        - Buttons.js (包含按鈕的樣式)
        - Container.js (包含容器的樣式)
        - DefaultTheme.js (樣式檔案，導入)
      - OtherTheme
        - Buttons.js (包含按鈕的樣式)
        - Container.js (包含容器的樣式)
        - OtherTheme.js (樣式檔案，導入)
      - Themes.js (樣式控管檔案，導入)
    - MediaQuery.js (RWD斷點設置)
  - Handler (一些常用輔助方法封裝)
    - LocalStorageHandler.js
    - SomethingHandler.js
  - Mappings 映射資料夾 ( 放置各種對應關系)
    - Mappings.js
  - Pages 對應路由畫面
    - MainPages (可供工程師分別開發各頁面)
      - Login.js
      - Home.js
      - Page1.js 
      - Page2.js
    - ErrorPages
      - 404.js
      - 403.js
  - Routers 集中管理路由
    - Routers.js
  - SelfHooks (自訂義Hooks，集中管理，需上註解)
    - useFrom.js
    - useAsync.js
  - Store (Context放置)
    - Store.js
