CREATE DATABASE eatocracy_development;

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creator VARCHAR(40) NOT NULL,
    event_date DATE NOT NULL,
    voting_deadline DATE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE submissions(
    id SERIAL PRIMARY KEY,
    submission_name VARCHAR(255) NOT NULL,
    votes_count INTEGER,
    event_id INTEGER REFERENCES events(id),
    rating NUMERIC(2,1),
    location VARCHAR(255),
    yelp_url VARCHAR(255),
    genre VARCHAR(255),
    photo VARCHAR(255),
    city VARCHAR(50),
    price VARCHAR(10)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    favorites INTEGER REFERENCES submissions(id),
    event_id INTEGER REFERENCES events(id),
    friend_id INTEGER REFERENCES users(id)
);