# asador.ly

## The Problem 
Have you ever heard about the famous Argentine steak? I'm pretty sure you've always wondered about asado (barbeque) in Buenos Aires and many of the steakhouses that serve the best meat. 

## The Solution 
Asador is all about sharing the joy of the best parrillas (steakhouses) in Buenos Aires. Asador brings a generous list (or pins) of Buenos Aires' top parrillas laid out on Mapbox. 

## Short Recap 
Users are greeted with a live map with a bunch of pins of the best parrillas of Buenos Aires. If you've been to a parrilla that isn't pinned on the map, feel free to create an account and pin your favorite ones. 

--- 

## Working Extras 
Login, registration, logout functionality with Redux Toolkit

---
## Live Code 
- [Netlify](https://asador.netlify.app/) 

## Source Code 
- [GitHub](https://github.com/danveb/asador)
  
## Demo 
https://asador.netlify.app

<img src="https://media.giphy.com/media/GBxnTacpnzGDrWWQnX/giphy.gif">

## How To Add Pins? 
- Create an account! Or login if you've already created one
- Double click anywhere on map 
- Use form field to input your favorite parrilla 
- Submit the form 

<img src="https://media.giphy.com/media/WGE4iQknHMhzfw4rEJ/giphy.gif">

---

## Test Coverage
- Performed component testing with react-testing-library 
- Need to disable the following lines on Hero component for tests to run
```sh
Hero.jsx -> line 12-16

// workaround for mapbox failing (transpile issues with Babel) 
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
```
- Run all tests
```sh
$ yarn test --allWatch
```

## Project structure 

```sh
client (React.js)
server (Node/Express)
```

## Initialize React App

```sh
$ yarn create react-app ./ 
```

## Install client dependencies

```sh
$ yarn add
```

## Initialize Server 

```sh 
$ yarn init 
```

## Install server dependencies 

```sh 
$ yarn add 
```

## Misc. (Server)
- Refer to seeder file 
- Refer to constants directory for data of users & parrillas
- Run script to import or destroy this data on MongoDB

1. seeder.js
```sh
import mongoose from "mongoose"; 
import dotenv from "dotenv"; 
import colors from "colors"; 
import users from "./constants/users.js"; 
import parrillas from "./constants/parrillas.js"; 
import User from "./models/User.js"; 
import Pin from "./models/Pin.js"; 
import connectDB from "./config/db.js"; 

dotenv.config(); 

connectDB(); 

const importData = async () => {
    try {
        await User.deleteMany();
        await Pin.deleteMany();
        
        const createdUsers = await User.insertMany(users); // insert users data into db
        const samplePins = parrillas.map(parrilla => {
            return {
                ...parrilla, 
                createdUsers, 
            }; 
        }); 

        await Pin.insertMany(samplePins); 
        console.log("Data imported".green.inverse); 
        process.exit(); 
    } catch (error) {
        console.error(`${error}.red.inverse`); 
        process.exit(1)
    };
}; 

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Pin.deleteMany();

        console.log("Data destroyed".red.inverse); 
        process.exit(); 
    } catch (error) {
        console.error(`${error}`.red.inverse); 
        process.exit(1)
    };
}; 

if(process.argv[2] === "-d") {
    destroyData(); 
} else {
    importData(); 
}
```

2. users.js 
```sh
import bcrypt from "bcryptjs"; 

const users = [
    {
        username: "peach", 
        email: "peach@gmail.com", 
        password: bcrypt.hashSync("peach", 10), 
        // synchronously generate hash with 10 rounds
    }, 
    {
        username: "danny", 
        email: "danny@gmail.com", 
        password: bcrypt.hashSync("danny", 10), 
        // synchronously generate hash with 10 rounds
    }, 
    {
        username: "jojo", 
        email: "jojo@gmail.com", 
        password: bcrypt.hashSync("jojo", 10), 
        // synchronously generate hash with 10 rounds
    }, 
]; 

export default users
```

3. parrillas.js 
```sh
const parrillas = [
    {
        username: "peach", 
        title: "Don Julio", 
        description: "Popular destination for classic steaks, local dishes and a long wine list in an intimate ambiance.", 
        rating: 5, 
        cost: 3, 
        location: {
            type: "Point", 
            coordinates: [-58.424282, -34.586308], 
        }, 
    }, 
    {
        username: "jojo", 
        title: "La Cabrera", 
        description: "Easygoing Argentinian restaurant specializing in grilled meats, with wood-lined decor & a terrace.", 
        rating: 4, 
        cost: 3, 
        location: {
            type: "Point", 
            coordinates: [-58.4328977, -34.5893580], 
        }, 
    }, 
    {
        username: "peach", 
        title: "Cabaña Las Lilas", 
        description: "One of the fanciest steak houses in BA, Cabaña Las Lilas is housed in a former warehouse. Popular for their grass-fed beef sourced from Las Lilas' own cattle ranch—wallet-busting stuff that is said to be the best in town.", 
        rating: 5, 
        cost: 4, 
        location: {
            type: "Point", 
            coordinates: [-58.3667234, -34.6041315], 
        }, 
    }, 
    {
        username: "peach", 
        title: "La Brigada", 
        description: "One of BA's legendary steakhouses; succulent beef, solid mainstream wine list, and rooms covered in sports memorabilia. An authentic spot for classic Argentine steak.", 
        rating: 5, 
        cost: 4, 
        location: {
            type: "Point", 
            coordinates: [-58.37272, -34.61848], 
        }, 
    }, 
    {
        username: "jojo", 
        title: "Desnivel", 
        description: "An Argentine grill house serving sweetbreads, lower intestine, sausage, beef short ribs and beef tenderloin. Family and budget-friendly local joint.", 
        rating: 5, 
        cost: 2, 
        location: {
            type: "Point", 
            coordinates: [-58.3717436, -34.6178655], 
        }, 
    }, 
    {
        username: "peach", 
        title: "Rodizio Madero", 
        description: "Churrascaria featuring open-fire grilled meats. Rodizio offers gauchos that bring meats to the table ready to be carved.", 
        rating: 3, 
        cost: 4, 
        location: {
            type: "Point", 
            coordinates: [-58.3663691, -34.6072399], 
        }, 
    }, 
    {
        username: "peach", 
        title: "El Ferroviario", 
        description: "Down-to-earth, railroad-themed parrilla with a varied menu featuring grilled meats & pasta. Family-friendly.", 
        rating: 4, 
        cost: 2, 
        location: {
            type: "Point", 
            coordinates: [-58.52078, -34.63682], 
        }, 
    }, 
    {
        username: "peach", 
        title: "El Pobre Luis", 
        description: "El Pobre Luis is a local institution, with diners travelling from all parts of Buenos Aires to dine at its address. Food-wise, expect extra-sized portions of flavor-packed barbeque favorites. No-nonsense kind of place, with a bright, happily cluttered dining room featuring sports memorabilia on the walls, with the star attraction, the grill, taking center stage.", 
        rating: 4, 
        cost: 2, 
        location: {
            type: "Point", 
            coordinates: [-58.4522898, -34.5553037], 
        }, 
    }, 
    {
        username: "danny", 
        title: "El Mangrullo Cocina y Fuegos", 
        description: "El Mangrullo is a classic steakhouse on the outskirts of the city. Featuring asado al asador (prime beef ribs) and their special mollejas (sweetbreads), all expertly roasted on an open fire-pit. No-frills establishment and perfect for a weekday escape from the city.", 
        rating: 4, 
        cost: 3, 
        location: {
            type: "Point", 
            coordinates: [-58.51945, -34.73339], 
        }, 
    }, 
    {
        username: "danny", 
        title: "Fogon", 
        description: "Discover the tradition of the Asado served with a twist. We have created an 8 course tasting menu  that explores new ways of serving Argentine classic cuts of meat.  While sitting in our bar, you will see and experience different cooking techniques on the grill in a close and personal way. Our goal is to create a memorable evening for each guest, beyond the usual expectations of a steakhouse. Our dinner starts punctually at 19.45hs.", 
        rating: 5, 
        cost: 5, 
        location: {
            type: "Point", 
            coordinates: [-58.43364, -34.58863], 
        }, 
    }, 
    {
        username: "jojo", 
        title: "Siga La Vaca", 
        description: "Located in the newest neighborhood of Buenos Aires, Siga La Vaca has reinvented the Argentine steakhouse experience, All You Can Eat styled. Diners are greeted with a market-style buffet. If you're really hungry you can head to parrilla section to ask for your favorite cuts of meat.", 
        rating: 3, 
        cost: 3, 
        location: {
            type: "Point", 
            coordinates: [-58.3651367, -34.6186412], 
        }, 
    }, 
]; 

export default parrillas
```