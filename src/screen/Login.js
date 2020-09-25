import React, { useState } from "react";
import Axios from "axios";
import { envVal } from "../defaults/index.js";
import { useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setLogin = useStoreActions((state) => state.login.setLogin);
  // const logoutStore = useStoreActions((state) => state.login.setLogout);

  const onClickLoginBtn = () => {
    setLoading(true);
    const url = `${envVal.baseURL}/login`; //endpoint url
    const data = {
      mobile: mobile,
      password: password,
    }; //data to send
    Axios.post(url, data)
      .then((res) => {
        //success callback, ie todo after success login
        if (res.data.auth) {
          setLogin(data);
          history.replace("/home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        //failure callback
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card" style={{ margin: "5rem", padding: "5rem" }}>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Mobile"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          className="btn btn-primary"
          type="button"
          value="Login"
          onClick={onClickLoginBtn}
          disabled={loading}
        ></input>
      </form>
    </div>
  );
};

export { Login };
