import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/spinner";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const handleFetch = () => {

  useEffect(() => {
    setIsLoading(true);
    fetch("https://reqres.in/api/users?page=0")
      .then((respose) => respose.json())
      .then((respose) => {
        setUsers(respose.data);
        setIsLoading(true);
        // Optional code to simulate delay
        setTimeout(() => {
          setUsers(respose.data);
          setIsLoading(false);
        }, 5000);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch user list");
        setIsLoading(false);
      });
  }, []);

  // };
  const renderUser = (
    <div className="userlist-container">
      {users.map((user) => (
        <div className="user-container" key={user.id}>
          <img src={user.avatar} alt="" />
          <div className="userDetail">
            <div className="first-name">{`${user.first_name}                
                                   ${user.last_name}`}</div>
            <div className="last-name">{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="App">
      {isLoading ? <LoadingSpinner /> : renderUser}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {/* <button onClick={handleFetch} disabled={isLoading}>
        Fetch Users
      </button> */}
    </div>
  );
}
