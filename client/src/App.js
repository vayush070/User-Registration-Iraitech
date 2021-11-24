import "./App.css";
import Header from "./components/header/header";
import { useDispatch, useSelector } from "react-redux";
import LoginUser from "./components/user/LoginUser";
import RegisterUser from "./components/admin/RegisterUser";
import User from "./components/user/User";
import Alert from "./components/Alert/Alert";
import { alertActions } from "./store";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const whichPage = useSelector((state) => state.page.page);
  const alert = useSelector((state) => state.alert.alert);
  return (
    <div className="App">
      <Header />
      {alert.length ? <Alert /> : <div></div>}

      {isAuth ? <User /> : whichPage === 1 ? <LoginUser /> : <RegisterUser />}
    </div>
  );
}

export default App;
