require('dotenv').config();
const mongoose = require('mongoose');
const Ingredient = require('../../api/models/Ingredient');

const ingredients = [
    /* Espaguetis a la Boloñesa */
    {
        name: 'Carne molida',
        img: '',
        category: 'Proteína',
        nutritional_info: 'Alto en proteínas'
    },
    {
        name: 'Tomate',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Fuente de vitamina C'
    },
    {
        name: 'Cebolla',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Rica en antioxidantes'
    },
    {
        name: 'Ajo',
        img: '',
        category: 'Condimento',
        nutritional_info: 'Beneficios para la salud'
    },
    /* Ensalada César */
    {
        name: 'Lechuga romana',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Rica en fibra'
    },
    {
        name: 'Pollo a la parrilla',
        img: '',
        category: 'Proteína',
        nutritional_info: 'Bajo en grasas'
    },
    {
        name: 'Crutones',
        img: '',
        category: 'Pan',
        nutritional_info: 'Aporta carbohidratos'
    },
    {
        name: 'Salsa César',
        img: '',
        category: 'Condimento',
        nutritional_info: 'Sabor intenso'
    },
    /* Tacos de pescado */
    {
        name: 'Filetes de pescado',
        img: '',
        category: 'Proteína',
        nutritional_info: 'Alto en proteínas y ácidos grasos omega-3'
    },
    {
        name: 'Tortillas de maíz',
        img: '',
        category: 'Pan',
        nutritional_info: 'Fuente de carbohidratos'
    },
    {
        name: 'Repollo rallado',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Rico en fibra y vitaminas'
    },
    {
        name: 'Salsa de aguacate',
        img: '',
        category: 'Condimento',
        nutritional_info: 'Saludable y rica en grasas saludables'
    },
    {
        name: 'Limón',
        img: '',
        category: 'Fruta',
        nutritional_info: 'Alto en vitamina C'
    },
    {
        name: 'Cilantro fresco',
        img: '',
        category: 'Hierba',
        nutritional_info: 'Beneficios antioxidantes'
    },
    /* Enchiladas de pollo */
    {
        name: 'Pechugas de pollo cocidas y desmenuzadas',
        img: '',
        category: 'Proteína',
        nutritional_info: 'Bajo en grasas y alto en proteínas'
    },
    {
        name: 'Tortillas de maíz',
        img: '',
        category: 'Pan',
        nutritional_info: 'Fuente de energía'
    },
    {
        name: 'Salsa roja de enchilada',
        img: '',
        category: 'Condimento',
        nutritional_info: 'Picante y llena de sabor'
    },
    {
        name: 'Queso rallado',
        img: '',
        category: 'Lácteo',
        nutritional_info: 'Calcio y proteínas'
    },
    {
        name: 'Cebolla picada',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Antioxidantes y fibra'
    },
    {
        name: 'Crema agria',
        img: '',
        category: 'Lácteo',
        nutritional_info: 'Moderada en grasas'
    },
    /* Risotto de Champiñones */
    {
        name: 'Arroz Arborio',
        img: '',
        category: 'Cereal',
        nutritional_info: 'Alto en carbohidratos'
    },
    {
        name: 'Champiñones frescos',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Bajo en calorías y rico en fibra'
    },
    {
        name: 'Caldo de verduras',
        img: '',
        category: 'Líquido',
        nutritional_info: 'Bajo en grasas y sodio'
    },
    {
        name: 'Cebolla',
        img: '',
        category: 'Vegetal',
        nutritional_info: 'Vitaminas y minerales'
    },
    {
        name: 'Vino blanco',
        img: '',
        category: 'Bebida',
        nutritional_info: 'Consumir con moderación'
    },
    {
        name: 'Queso parmesano rallado',
        img: '',
        category: 'Lácteo',
        nutritional_info: 'Intenso sabor y calcio'
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const ingredientsCollection = await Ingredient.find();
        if (ingredientsCollection.length) {
            await Ingredient.collection.drop();
            console.log(`The ingredients collection's been dropped`);
        }
    })
    .catch(err => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        const ingredientsData = ingredients.map(product => new Ingredient(product));
        await Ingredient.insertMany(ingredientsData);
        console.log('The new ingredients data are inserted on the DB');
    })
    .catch(error => console.log(`Error creating the new data: ${error}`))
    .finally(() => mongoose.disconnect());