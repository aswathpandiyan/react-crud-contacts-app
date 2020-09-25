import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { HeaderBar } from "../component/HeaderBar";
import { envVal } from "../defaults/index";
import Axios from "axios";

const getUniqueID = () => {
  return new Date().getTime();
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const save = useStoreActions((action) => action.contacts.add);

  const onSave = () => {
    setLoading(true);
    var contact = {
      id: getUniqueID(),
      name: name,
      email: email,
      phone: phone,
    };
    const url = `${envVal.baseURL}/contacts`;
    Axios.post(url, contact)
      .then((res) => {
        save(contact);
        alert("Saved");
        clear();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const clear = () => {
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <div>
      <HeaderBar />
      <div className="card" style={{ margin: "5rem", padding: "5rem" }}>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            className="btn btn-primary"
            type="button"
            value="save"
            disabled={loading}
            onClick={onSave}
          ></input>
        </form>
      </div>
    </div>
  );
};
export { ContactForm };
