# HELLO! 即時通

## 介紹
靈感來自於 1998 年 yahoo 推出的即時通訊軟體，並融入聊天大廳、線上交友等元素，為使用者提供簡單易用的社交環境。

### 專案首頁
![專案首頁](https://i.imgur.com/225hXRx.jpeg)

### ERD
![ERD](https://i.imgur.com/5Z2ZVC8.jpeg)

### 路由清單
[Hello! 即時通路由清單 (Notion)](https://stream-justice-2d7.notion.site/HELLO-738a292b64bd4918b4b071aa7577ad97?pvs=4)

### 測試帳號
+ 管理員
    電子信箱：root@example.com
    帳號：root
    密碼：12345678
+ 使用者（分別為 user1～user5）
    電子信箱：user1@example.com
    帳號：user1
    密碼：12345678

## 功能

### 前台
+ 使用者可以建立個人帳號
+ 使用者可以編輯個人檔案
+ 使用者可以瀏覽他人資料
+ 使用者可以新增聯絡人
+ 使用者可以查看大廳的所有歷史訊息
+ 使用者可以於大廳發送訊息
+ 使用者可以傳送私人訊息給另一位使用者
+ 使用者可以查看所有公告
+ 使用者可以瀏覽特定公告

### 後台
+ 管理員可以查看所有使用者清單
+ 管理員可以更改使用者權限
+ 管理員可以發布公告
+ 管理員可以編輯公告
+ 管理員可以刪除公告

## 開始使用

1. 請先確認有安裝 Node.js 、 npm 、 MySQL 與 MySQL Workbench

2. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   git clone https://github.com/realyutou/messenger.git
   ```
   
3. 安裝相關套件，輸入：

   ```bash
   npm install
   ```

4. 新增 .env 檔案，設定環境變數，詳細內容可參考 .env.example
   
5. 開啟 MySQL Workbench，建立資料庫，輸入：

   ```SQL
   drop database if exists messenger;
   create database messenger;
   ```

6. 開啟終端機，建立資料表，輸入：

   ```bash
   npx sequelize db:migrate
   ```

7. 載入種子資料，輸入：

   ```bash
   npm run seed
   ```
   
8. 執行專案，輸入：

   ```bash
   npm run start
   ```

9. 在終端機看見以下訊息代表順利執行

     ```bash
     Server is running on http://localhost:3000
     ```

10. 終止伺服器
    
     ```bash
     ctrl + c
     ```

## 開發工具

- Node.js v18.16.0
   詳見 [package.json](https://github.com/realyutou/messenger/blob/main/package.json)