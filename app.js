const express = require('express')
const app = express();

const  PORT = 5000;
const users =[
    {
        name:'Bob 1',
        age:12,
        gender:'other'
    },{
        name:'Bob 2',
        age:88,
        gender:'other'
    },{
        name:'Bob 3',
        age:12,
        gender:'other'
    },{
        name:'Bob 4',
        age:62,
        gender:'other'
    },{
        name:'Bob 5',
        age:42,
        gender:'other'
    },{
        name:'Bob 6',
        age:22,
        gender:'other'
    },
    {
        name:'Bob 7',
        age:14,
        gender:'other'
    },
    {
        name:'Bob 8',
        age:12,
        gender:'other'
    },{
        name:'Bob 9',
        age:12,
        gender:'other'
    },{
        name:'Bob 10',
        age:12,
        gender:'other'
    },{
        name:'Bob 11',
        age:12,
        gender:'other'
    },{
        name:'Bob 12',
        age:12,
        gender:'other'
    },
    {
        name:'Bob 13',
        age:12,
        gender:'other'
    },
    {
        name:'Bob 14',
        age:12,
        gender:'other'
    },{
        name:'Bob 15',
        age:12,
        gender:'other'
    },
    {
        name:'Bob 16',
        age:12,
        gender:'other'
    },
    {
        name:'Bob 17',
        age:12,
        gender:'other'
    },






]
app.get('/users',(req, res) =>{
    //request to db to get info
    res.json(users);
})
app.listen(PORT,() =>{{
    console.log(`Server started listening port ${PORT}`);
}})