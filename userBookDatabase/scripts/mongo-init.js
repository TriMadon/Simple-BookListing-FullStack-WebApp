db.createUser({
    user: 'admin',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'analyzed-books',
        },
    ],
});

db = new Mongo().getDB("analyzed-books");

db.createCollection('books', { capped: false });