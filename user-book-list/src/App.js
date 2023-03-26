import React, {useMemo, useState} from "react";
import {Login} from "./components/login/Login";
import {BookList} from "./components/bookList/BookList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserContext} from "./UserContext";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"


const App = () => {
    const [user, setUser] = useState(()=>
        localStorage.getItem('logged_user')
    );

    const value = useMemo(() => ({user, setUser}), [user, setUser]);

    return (
      <BrowserRouter>
          <div id="colorStrip">
              <div className="container">
                  <h1 className="display-3">Book Adding App</h1>
              </div>
          </div>
          <UserContext.Provider value={value}>
              <Routes>
                  <Route path={"/"} element={localStorage.getItem("logged_user") === null? <Login /> : <BookList/>} />
              </Routes>
          </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;


