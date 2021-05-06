<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="https://i.imgur.com/IdDNNF0.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">我的餐廳清單 My Restaurant List</h3>

  <p align="center">
    <br />
    製作自己的美食小天堂，好吃佳餚不怕你收藏
    <br />
    <a href="https://github.com/wlcharlie/My-restaurant-list">前往專案</a>
    <br />
    更新日期：5/6
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">目錄</h2></summary>
  <ol>
    <li>
      <a href="##關於專案">關於專案</a>
      <ul>
        <li><a href="##使用工具">使用工具</a></li>
      </ul>
    </li>
    <li>
      <a href="##開始使用">開始使用</a>
      <ul>
        <li><a href="###準備條件">準備條件</a></li>
        <li><a href="###安裝">安裝</a></li>
      </ul>
    </li>
    <li><a href="##更新紀錄">更新紀錄</a></li>
    <li><a href="##其他資訊">其他資訊</a></li>
    <li><a href="##關於我">關於我</a></li>
  </ol>
</details>


## 關於專案

### 自己的美食自己收藏，一個專屬於自己的餐廳清單

### 特色功能

* 檢視所有餐廳資訊
* 搜尋關鍵字(名字/類別)
* 排序餐廳
* 點入瀏覽更多餐廳詳細資訊(地址/介紹)
* 新增/編輯/刪除餐廳資料
* 預覽新增/編輯時的呈現(尚未完全)


### 專案畫面

#### 5/2 更新首頁
<img src="https://i.imgur.com/IQ9lI1F.png">

#### 舊版餐廳詳細資訊
<img src="https://i.imgur.com/on7FFSq.png">

#### 舊版首頁
<img src="https://i.imgur.com/EFusiKO.png">

## 使用工具

#### 開發/運行環境
* [Node.js (10.15.0)](https://nodejs.org/en/)
* [Express (4.17.1)](https://expressjs.com/zh-tw/)
* [nodemon (2.0.7)](https://www.npmjs.com/package/nodemon)
* [body-parser (1.19.0)](https://i.imgur.com/IQ9lI1F.png)
* [Method-override (3.0.0)](https://www.npmjs.com/package/method-override)
* [handlebars-helpers(0.10.0)](https://www.npmjs.com/package/handlebars-helpers)
* 基本必備：VSC, Gitbash, Fork

#### 介面/版型相關
* [Bootstrap (4.4)](https://getbootstrap.com/)
* [Express-Handlebars (5.3.0)](https://www.npmjs.com/package/express-handlebars)
* [Fontawesome (kit code 5.15.3)](https://fontawesome.com/)

#### 資料庫相關
* [mongodb (4.4)](https://docs.mongodb.com/manual/)
* [mongoose (5.12.7)](https://mongoosejs.com/)

<!-- GETTING STARTED -->
## 開始使用

讓我們開始吧！

### 準備條件

使用專案需有(請先準備好)
* 電腦
* 網路 *(若無Fontawesome的Icon會無法顯示)*
* Git Bash
* nvm & Node.js
* mongoDB

### 安裝

1. 將專案複製到你的電腦上:
   ```sh
   git clone https://github.com/wlcharlie/My-restaurant-list.git
   ```
2. 進入到資料夾:
    ```sh
    cd My-restaurant-list
    ```
3. 用npm安裝套件 *這邊會安裝express/express.handlebars*
   ```sh
   npm install
   ```
4. 安裝(導入)資料 *資料只要導入一次即可*
   ```sh
   npm run seed
   ```
5. 執行
   ```sh
   npm run dev
   ```
6. 確認出現這行提示代表成功：
    ```sh
    IS WORKING! Head to http://localhost:3000
    ```
    於瀏覽器輸入網址：http://localhost:3000
7. 結束
    * 在終端機上按下Crtl + C

## 更新紀錄

5/6
* 專案架構變更：RESTful應用 / 簡化及重新編排程式碼(mongoose + router)
* 新增/編輯頁面重新排版，預先放入了預覽畫面
* 搜尋欄再也不能空白搜尋，而新增瀏覽全部按鈕
* 新增排序選項

5/2
* 關鍵字現在可以搜尋英文店名
* 餐廳的CRUD功能


## 其他資訊
* 此README上方的Icon來源 [flaticon](https://www.flaticon.com/) 
* 此README [參考範本](https://github.com/othneildrew/Best-README-Template/blob/master/BLANK_README.md)


## 關於我
Charlie 
從文組畢業，從Coding再出發。

E-mail: wl00606352@gmail.com


前往專案： https://github.com/wlcharlie/My-restaurant-list
