import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions/users";

const AddUser = () => {
  const initialUserState = {
    id: null,
    userName: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    //voibolla tekitab probleeme, sest ma ei mõista veel seda meetodit
    //peale kommentaaride on see meetod originaalsel kujul
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    const { title, description } = user;

    dispatch(createUser(title, description))
      .then(data => {
        setUser({
          id: data.id,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              required
              value={user.userName}
              onChange={handleInputChange}
              name="userName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={user.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={user.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;