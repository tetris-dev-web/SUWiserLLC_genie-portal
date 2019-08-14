# Genie-Portal

Real estate blockchain token portal engine

## Setting Up Your Branch OR How to Git Gud

- Enter the directory in which you want genie portal to be placed
    ```bash
    git clone https://github.com/GenusDev/genie-portal.git
    ```
- Create a branch, named in according with the [GenusDev Programming Conventions](https://docs.google.com/document/d/1-PGffrw-B1d9P5A_zfo5gJrW8dK28kqx5j-xxKOMPLY) e.g. `git checkout -b JohnR-readme-edit-0903`

remember to git ignore all package and dev related temporary folders, if you are having problems with folders still pushing, try the following command to remove the truffle cached build file:

```bash
    git rm -r --cached ./truffle/build
   ```

## System Dependencies

### Backend

- Express 4.17.1

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
    npm install
    ```
2. Ropsten
  ```bash
  truffle migrate --compile-all --reset --network ropsten
  ```

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

  - Run webpack and server simultaneously 
    ```bash
    npm run dev
    ```

Remember to compile and migrate truffle contracts before running server and Webpack!


see wiki for further details

# connect to ethereuem Ropsten network
The prototype optimized for use with the Chrome browser. 
When you load the page, you will be prompted to install metamask into your browser. 
<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/downloadMetaMaskWarning.png" alt="icon" height="300">

Then connect to the Ropsten network, as prompted by the browser
<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/connectingToRopsten.png" alt="icon" height="300">


# User Interface 
Once loaded, you choose to use the prototype as a developer or investor. In production, your wallet would determine your user type. 

<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/chooseUserType.png" alt="icon" height="300" >


### There are two key dashboards, 

#### one showcasing projects, 
<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/projectGraph.png" alt="icon" height="300">

#### and the other tracking the token earnings performance by usr and by all. 

<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/tokenGraph.png" alt="icon" height="300" >

### projects when clicked provides project specific info 

<br>
<img src="https://github.com/GenusDev/genusdev-assets/blob/master/read_me_images/projectSpecificInfo.png" alt="icon" height="300">
