import React, { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { HeaderBar } from "../component/HeaderBar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { envVal } from "../defaults/index";
import Axios from "axios";

const ContactsEdit = (props) => {
  const { id, index } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const setContact = useStoreActions((action) => action.contacts.set);
  const contacts = useStoreState((state) => state.contacts.contacts);

  const findById = (id) => {
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].id == id) {
        return contacts[i];
      }
    }
  };

  const onUpdate = () => {
    var contact = {
      id: parseInt(id),
      name: name,
      email: email,
      phone: phone,
    };
    Axios.patch(`${envVal.baseURL}/contacts`, contact)
      .then((res) => {
        var temp = [...contacts];
        temp[index] = contact;
        setContact(temp);
        alert("Saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //its called when this component invoked or onLoad
    let edit = findById(id);
    setName(edit.name);
    setEmail(edit.email);
    setPhone(edit.phone);
    // eslint-disable-next-line
  }, []);

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
            value="update"
            onClick={onUpdate}
          ></input>
        </form>
      </div>
    </div>
  );
};
export { ContactsEdit };
