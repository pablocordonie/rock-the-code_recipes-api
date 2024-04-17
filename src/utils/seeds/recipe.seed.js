require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../../api/models/Recipe');

const recipes = [
    {
        name: 'Espaguetis a la Boloñesa',
        img: '',
        origin: 'Italiana',
        time: '45 minutos'
    },
    {
        name: 'Ensalada César',
        img: '',
        origin: 'Internacional',
        time: '20 minutos'
    },
    {
        name: 'Tacos de Pescado',
        img: '',
        origin: 'Mexicana',
        time: '30 minutos'
    },
    {
        name: 'Enchiladas de Pollo',
        img: '',
        origin: 'Mexicana',
        time: '40 minutos'
    },
    {
        name: 'Risotto de Champiñones',
        img: '',
        origin: 'Italiana',
        time: '35 minutos'
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const recipesCollection = await Recipe.find();
        if (recipesCollection.length) {
            await Recipe.collection.drop();
            console.log(`The recipes collection's been dropped`);
        }
    })
    .catch(err => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        const recipesData = recipes.map(product => new Recipe(product));
        await Recipe.insertMany(recipesData);
        console.log('The new recipes data are inserted on the DB');
    })
    .catch(error => console.log(`Error creating the new data: ${error}`))
    .finally(() => mongoose.disconnect());
