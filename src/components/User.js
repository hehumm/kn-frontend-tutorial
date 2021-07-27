import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserService from "../services/UserService";

const User = (props) => {
  const initialUserState = {
    id: null,
    userName: "",
    firstName: "",
    lastName: "",
    email: ""
  };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getUser = id => {
        UserService.get(id)
        .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    /*const updateStatus = status => {
        const data = {
            id: currentUser.id,
            title: currentUser.title,
            description: currentUser.description,
            published: status
        };

        dispatch(updateUser(currentUser.id, data))
        .then(response => {
            console.log(response);
            setCurrentUser({ ...currentUser, published: status });
            setMessage("The status was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };*/

    const updateContent = () => {
        dispatch(updateUser(currentUser.id, currentUser))
        .then(response => {
            console.log(response);
            setMessage("The user was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const removeUser = () => {
    dispatch(deleteUser(currentUser.id))
        .then(() => {
        props.history.push("/tutorials");//kõik props.history.pushid vaja ära muuta!!!
        })
        .catch(e => {
        console.log(e);
        });
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        value={currentUser.userName}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={currentUser.firstName}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={currentUser.lastName}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                        />
                    </div>

                    {/*<div className="form-group">
                        <label>
                        <strong>Status:</strong>
                        </label>
                        {currentUser.published ? "Published" : "Pending"}
                    </div>*/}
                    </form>
                    {/*
                    {currentUser.published ? (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => updateStatus(false)}
                    >
                        UnPublish
                    </button>
                    ) : (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => updateStatus(true)}
                    >
                        Publish
                    </button>
                    )}
                    */}
                    <button className="badge badge-danger mr-2" onClick={removeUser}>
                    Delete
                    </button>
        
                    <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateContent}
                    >
                    Update
                    </button>
                    <p>{message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
      </div>
  
    );
};

export default User;