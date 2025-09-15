const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const users = [
  {
    user_id: "test",
    user_password: "1234",
    user_name: "테스트 유저",
    user_info: "테스트 유저입니다",
  },
];

const app = express();
app.use(
  cors({
    origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
    methods: ["OPTIONS", "POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const secretKey = "ozcodingschool";

// 클라이언트에서 post 요청을 받은 경우
app.post("/", (req, res) => {
  const { userId, userPassword } = req.body;
  const userInfo = users.find(
    (el) => el.user_id === userId && el.user_password === userPassword
  );
  if (!userInfo) {
    res.status(401).send("로그인 실패");
  } else {
    const accessToken = jwt.sign({ userId: userInfo.user_id }, secretKey, {
      expiresIn: 1000 * 60 * 10,
    });
    //쿠키에 저장하기
    res.cookie("access", accessToken);
    res.send("토큰생성");
  }
});

// 클라이언트에서 get요청으로 토큰값에 맞는 유저정보(데이터베이스) return해주기
app.get("/", (req, res) => {
  const { accessToken } = req.cookies;
  const payload = jwt.verify(accessToken, secretKey);
  //해당 id값을 비교하여 데이터베이스에서 정보 클라이언트로 보내주기
  const userInfo = users.find((el) => el.user_id === payload.userId);
  return res.json(userInfo);
});

//토큰 삭제( 쿠키종료)
app.delete("/", (req, res) => {
  res.clearCookie("access");
  res.send("쿠키삭제함,토큰종료");
});

app.listen(3000, () => console.log("서버 실행!"));
