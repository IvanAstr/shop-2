const { types } = require('pg');
const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email: {type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue:"User"},
});

const Basket = sequelize.define('Basket', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},

});

const BasketProduct = sequelize.define('Basket_product', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},

});

const Product = sequelize.define('Product', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false},
    price: {type:DataTypes.INTEGER, allowNull:false},
    size: {type:DataTypes.INTEGER, dallowNull:false},
    color: {type:DataTypes.STRING, allowNull:false},
    rating: {type:DataTypes.INTEGER, defaultValue:0},
    description: {type:DataTypes.TEXT, allowNull:false},
    img: {type:DataTypes.TEXT, allowNull:false},
});

const Type = sequelize.define('Type', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false, unique:true, allowNull:false}
});

const Brand = sequelize.define('Brand', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false, unique:true, allowNull:false}
});

const Rating = sequelize.define('Rating', {
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    rate: {type:DataTypes.INTEGER, allowNull:false}
});

// const ProductInfo = sequelize.define('Product_info', {
//     id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
//     title: {type:DataTypes.STRING, allowNull:false},
//     description: {type:DataTypes.TEXT, allowNull:false}
// });

const TypeBrand = sequelize.define("Type_brand",{
    id: {type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},

})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

// Product.hasMany(ProductInfo, {as :"info"} );
// ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, {through:TypeBrand})
Brand.belongsToMany(Type, {through:TypeBrand})

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    // ProductInfo,
    Type,
    Brand,
    Rating,
    TypeBrand
}