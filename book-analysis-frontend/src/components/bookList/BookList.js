import React, {useContext, useEffect, useState} from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import "./BookList.css";
import {UserContext} from "../../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Table} from "react-bootstrap";
import axios from "axios";


export const BookList = () => {
    const {setUser} = useContext(UserContext);
    const [isLoading, setIsLoading]= useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadInfo = async () => {
            setIsLoading(true);
            const currentLoggedUser = localStorage.getItem('logged_user');
            const fetchedBooks = await fetchBookListFromDB(currentLoggedUser);
            setBooks(fetchedBooks);
            setIsLoading(false);
        };
        loadInfo();
    }, []);

    async function fetchBookListFromDB() {
        return await axios.get("http://localhost:3001/api/get-analyzed-books").then((result) => {
            return result.data;
        }).catch((e) => {
            console.log(e)
            window.alert("Failed to fetch books from database, please try refreshing later")
            return [];
        });
    }

    async function handleLogOut(e) {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem('logged_user');
        window.location.reload();
    }

    return (
        <div className="app-container">
            <form><Button id={'logout'} onClick={(e) => handleLogOut(e)}> Log out </Button></form>
            <form>
                { isLoading? (
                    <div id={"loading"} className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    ) : (
                <Table>
                    <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Average Rating</th>
                        <th>Total Reads</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <React.Fragment key={book._id}>
                            {(
                                <ReadOnlyRow book={book} />
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </Table> )
                    }
            </form>
        </div>
    )
}

