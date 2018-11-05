# Genie-Portal

Revolutionizing real estate with blockchain

## Setting Up Your Branch OR How to Git Gud

- Enter the directory in which you want genie portal to be placed
    ```bash
    git clone https://github.com/GenusDev/genie-portal.git
    ```
- Create a branch, named in according with the [GenusDev Programming Conventions](https://docs.google.com/document/d/1-PGffrw-B1d9P5A_zfo5gJrW8dK28kqx5j-xxKOMPLY) e.g. `git checkout -b JohnR-readme-edit-0903`

## System Dependencies

### Backend

- Rails 5.1.4

### Frontend

- D3 ^5.7.0
- Drizzle ^1.2.3
- JQuery ^3.3.1
- Konva ^2.4.0
- React ^16.5.2
- Redux ^3.7.2
- Truffle ^4.1.14

## Setup

1. Install packages
    ```bash
    bundle install
    npm install
    ```
2. Setup backend
    ```bash
    rails db:setup
    rails db:seed
    ```
    `rails db:migrate` to run future migrations with

## Running the Project

Have the following sets of commands running in separate terminals:

- In the truffle directory:
  - Start the ganache server
    ```bash
    ganache-cli -b 3
    ```
  - Run `truffle console` and build the contracts:
    ```bash
    compile
    migrate
    ```
- Then from the root directory:
  - Start the server
    ```bash
    rails s
    ```
  - Run webpack
    ```bash
    npm webpack
    ```
Remember to compile and migrate truffle contracts before running Webpack!

## Running the Testsuite

(coming soon!)

## Links to Key Documents

(coming soon!)
