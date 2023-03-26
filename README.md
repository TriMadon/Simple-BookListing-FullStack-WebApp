# Simple BookListing FullStack WebApp
 
This is a web application that allows users to add their own list of read books and see aggregation from all users. It uses React for the front-end, Node.js, Express, python, and Java for the back-end, MongoDB and MySQL for the databases, and Docker for the deployment.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To run this app, you need to have Docker installed on your machine. You can download it from https://www.docker.com/get-started.

After installing Docker, clone this repository to your local machine:

```bash
git clone https://github.com/TriMadon/Simple-BookListing-FullStack-WebApp.git
```

Then, navigate to the project directory and run in detached mode:

```bash
docker-compose -d up
```

This will build and run the app using Docker Compose. It may take some time to download and install all the dependencies at first.

## Usage

The app has two front-end components: a book-adding frontend and a book aggregation frontend. They can be accessed on port 3000 and 4000 respectively.

The book-adding frontend allows users to log in with their username and password, and add books that they have read to their personal list. The books are stored in a MySQL database.

The book aggregation frontend allows users to see the total number of books read by all users, as well as the most popular books and authors. The data is retrieved from a MongoDB database that aggregates the data from MySQL via python.

The mock usernames and passwords to use in the front-ends are available via mock-data/userdata.json.
