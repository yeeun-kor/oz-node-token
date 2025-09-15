const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_password");
const loginButton = document.querySelector("#login_button");

const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");
const logoutButton = document.querySelector("#logout_button");

axios.defaults.withCredentials = true;
// 전역에서 관리
let accessToken = "";

form.addEventListener("submit", (e) => e.preventDefault());

function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return axios.post("http://localhost:3000", { userId, userPassword });
}

function logout() {
  return axios.delete("http://localhost:3000");
}

function getUserInfo() {
  return axios.get("http://localhost:3000");
}

function renderUserInfo(user) {
  main.style.display = "block";
  form.style.display = "none";
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

function renderLoginForm() {
  main.style.display = "none";
  form.style.display = "grid"; // UI 변경
  userName.textContent = "";
  userInfo.textContent = "";
}

loginButton.onclick = () => {
  login() // post 요청
    .then(() => getUserInfo()) // get 요청
    .then((res) => renderUserInfo(res.data));
};

logoutButton.onclick = () => {
  logout();
  renderLoginForm();
};
3000;
