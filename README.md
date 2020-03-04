
# 資管營選課系統

學生可以登入填志願序選課並且查詢分發結果，而講師和管理員可以執行自動分發動作以及查詢學生資料。

## Install：
```bash
cd frontend
npm install
npm start

cd backend
npm install
npm start
```
## Testing:
* 測試學生帳號1
-- E-mail: 1234
-- password: 1234
* 測試學生帳號2
-- email: 5678
-- password: 5678

## Description

學生可以透過自己專屬的帳號密碼登入，並且進行選課志願排序，送出之後可以在時間截止前重新提交，管理員可以執行分發程序，會按照一套複雜的演算法分發，並將結果公布於小隊員的個人頁面。
每門課程的講師也可以看到選課結果，管理員可以查詢每個小隊員的資料。
### 分發演算法： 
總共有兩間教室，分別為：
1. 小教室: 最少25 最多32
2. 大教室: 最少36 最多50
#### 分發流程
用第一志願人數排序三門課人氣，最多人填第一志願的課安排到大教室上課。
在人數限制內，全數錄取。超過限制抽簽至第二輪。
將選到第三志願的學生記錄下來，保證之後不會再選到第三志願的課。
若他選的課程超過限制人數，將會以(限制人數/修課人數)的機率錄取第一志願，反之第二志願。
若課程沒超過限制人數直接錄取第一志願。
按照原方法繼續分發。
