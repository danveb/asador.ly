import bcrypt from "bcryptjs"; 

const users = [
    {
        username: "peach", 
        email: "peach@gmail.com", 
        password: bcrypt.hashSync("peach", 10), // synchronously generate hash with 10 rounds
    }, 
    {
        username: "danny", 
        email: "danny@gmail.com", 
        password: bcrypt.hashSync("danny", 10), // synchronously generate hash with 10 rounds
    }, 
    {
        username: "jojo", 
        email: "jojo@gmail.com", 
        password: bcrypt.hashSync("jojo", 10), // synchronously generate hash with 10 rounds
    }, 
]; 

export default users