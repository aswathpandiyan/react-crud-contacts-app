import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";
import { HeaderBar } from "../component/HeaderBar";
import { envVal } from "../defaults/index.js";
import { LoadingIndicator } from "../component/LoadingIndicator";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  const [loading, setLoading] = useState(false);
  const contacts = useStoreState((state) => state.contacts.contacts);
  const setContacts = useStoreActions((action) => action.contacts.set);
  const remove = useStoreActions((action) => action.contacts.remove);

  const onRemove = (id, index) => {
    Axios.delete(`${envVal.baseURL}/contacts/${id}`)
      .then((res) => {
        remove(index);
      })
      .catch((err) => console.log(err));
  };
  const getContacts = () => {
    setLoading(true);
    Axios.get(`${envVal.baseURL}/contacts`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(contacts);
        setLoading(false);
      });
  };

  useEffect(() => {
    //get contacts before render
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderBar />
      {loading && <LoadingIndicator />}
      {!loading && contacts && (
        <div style={{ padding: "5rem", margin: "5rem" }}>
          {contacts.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts &&
                  contacts.map((contact, index) => {
                    return (
                      <tr key={index}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                          <Link
                            className="btn"
                            to={"/edit/" + contact.id + "/" + index}
                          >
                            edit
                          </Link>
                          <button
                            className="btn"
                            onClick={() => onRemove(contact.id, index)}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {contacts.length <= 0 && <h1>No contacts found</h1>}
        </div>
      )}
    </>
  );
};

export { ContactList };
