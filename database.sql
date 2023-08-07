CREATE DATABASE eatocracy_development;

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    creator VARCHAR(40) NOT NULL,
    event_date DATE NOT NULL,
    voting_deadline DATE NOT NULL
);

CREATE TABLE submissions(
    id SERIAL PRIMARY KEY,
    submission_name VARCHAR(255) NOT NULL,
    votes_count INTEGER,
    event_id INTEGER REFERENCES events(id),
    rating NUMERIC(2,1),
    location VARCHAR(255),
    yelp_url VARCHAR(255),
    genre VARCHAR(255)
);
