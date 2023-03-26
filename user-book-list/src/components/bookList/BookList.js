import React, {useContext, useEffect, useState} from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import "./BookList.css";
import {v1 as uuid} from "uuid";
import {UserContext} from "../../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Table} from "react-bootstrap";
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import axios from "axios";
import optionData from './mock-book-titles.json'


export const BookList = () => {
    const {setUser} = useContext(UserContext);
    const [isLoading, setIsLoading]= useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadInfo = async () => {
            setIsLoading(true);
            const currentLoggedUser = localStorage.getItem('logged_user');
            document.getElementById("welcomeMessage").innerHTML = "Welcome back! " + currentLoggedUser + ", add books to your list";
            const fetchedBooks = await getBooksFromDbByUsername(currentLoggedUser);
            setBooks(fetchedBooks);
            setIsLoading(false);
        };
        loadInfo();
    }, []);

    async function getBooksFromDbByUsername(username) {
        return await axios.post("http://localhost:3001/api/get", {username: username}).then((result) => {
            return result.data;
        }).catch((e) => {
            console.log(e)
            window.alert("Failed to fetch books from database, please try refreshing later")
            return [];
        });
    }

    async function postBookToDB(newBook) {
        try {
            const response = await axios.post("http://localhost:3001/api/insert", newBook);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteBookFromDB(book) {
        try {
            const response = await axios.post("http://localhost:3001/api/delete", book);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleAddFormSubmit(e) {
        const newBook = {
            id: uuid(),
            username: localStorage.getItem('logged_user'),
            bookTitle: item.valueOf(),
            rating: e.target.querySelector('.rating').value,
            totalReads: e.target.querySelector('.totalReads').value,
        };

        postBookToDB(newBook).then(() => {
            const duplicateBook = books.find(book => book.bookTitle === newBook.bookTitle &&
                book.username === newBook.username);
            if (duplicateBook === undefined) {
                const newBooks = [...books, newBook];
                setBooks(newBooks);
            } else {
                const newBooks = books.map(book => {
                    if (book === duplicateBook) {
                        return {...book, rating: newBook.rating, totalReads: newBook.totalReads};
                    }
                    return book;
                });
                setBooks(newBooks);
            }
        })
    }

    const handleDeleteClick = async (bookId) => {
        const newBooks = [...books];

        const index = books.findIndex((book) => book.id === bookId);

        deleteBookFromDB(books[index]).then(() => {
            newBooks.splice(index, 1);
            setBooks(newBooks);
        });
    };


    async function handleLogOut(e) {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem('logged_user');
        window.location.reload();
    }

    const [item, setItem] = useState("")

    const handleChange = (item) => {
        setItem(item.value);
    };

    const Select = props => (
        <FixRequiredSelect
            {...props}
            SelectComponent={BaseSelect}
            options={optionData}
        />
    );


    return (
        <div className="app-container">
            <span id={"welcomeMessage"}></span>
            <form><Button id={'logout'} onClick={(e) => handleLogOut(e)}> Log out </Button></form>
            <form id={'inputForm'} onSubmit={(e) => handleAddFormSubmit(e)}>
                <Select
                    isSearchable={true}
                    name="bookTitle"
                    id={"bookTitles"}
                    getOptionLabel={(item) => item.value}
                    getOptionValue={(item) => item.value}
                    className={'bookTitle'}
                    required
                    placeholder="Choose a book..."
                    options={optionData}
                    onChange={handleChange}
                    defaultValue={{label: "The Alchemist", value: "The Alchemist"}}
                    value={optionData.filter(function (option) {
                        return option.value === item;
                    })}
                />
                <input
                    id={"ratingBox"}
                    type="number"
                    min={1}
                    max={10}
                    name="rating"
                    className={'rating'}
                    required="required"
                    placeholder="Rating(1-10)"
                />
                <input
                    type="number"
                    min={0}
                    name="totalReads"
                    className={'totalReads'}
                    required="required"
                    placeholder="Total reads..."
                />
                <Button type="submit">Add Book</Button>
            </form>
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
                        <th>Rating</th>
                        <th>Total Reads</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <React.Fragment key={book.id}>
                            {(
                                <ReadOnlyRow
                                    book={book}
                                    handleDeleteClick={handleDeleteClick}
                                />
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

