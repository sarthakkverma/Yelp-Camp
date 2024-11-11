const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", ()=>{
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30)+10;
        const camp = new Campground({
            author: '672af1e11f6e9f714034d497',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eligendi, adipisci nemo accusantium suscipit similique cupiditate harum dignissimos culpa inventore mollitia officiis autem rem laudantium omnis doloribus? Magni, laborum accusantium.",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/daweg1uju/image/upload/v1731288301/YelpCamp/rycjgncdsq5euhivp9vv.jpg',
                  filename: 'YelpCamp/rycjgncdsq5euhivp9vv',
                },
                {
                  url: 'https://res.cloudinary.com/daweg1uju/image/upload/v1731288301/YelpCamp/fdmwvgjftw6chxnk0k8a.jpg',
                  filename: 'YelpCamp/fdmwvgjftw6chxnk0k8a',
                }
            ]          
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

seedDB();