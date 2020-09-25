import React from "react";
import { useStoreActions } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";

const HeaderBar = (props) => {
  const setLogin = useStoreActions((state) => state.login.setLogin);
  const history = useHistory();
  const logout = () => {
    setLogin(null);
    history.replace("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/create">
            Add
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { HeaderBar };
