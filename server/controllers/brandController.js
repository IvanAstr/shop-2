const { Brand } = require("../models/models");

class BrandController{
    async create(req, res){
        const {name} = req.body 
        const bran = await Brand.create({name});
        return res.json(bran);
    }   

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands) 
    }

    async delete(req, res){
        const brand = await Brand.findOne({
            where: {
                id: req.body.id
            }
        })
        
        if (!brand) {
            return res.status(400).json({
                message: 'Бренд не найден'
            });
        }
    
        await Brand.destroy({where: {id: req.body.id}})
        res.status(200).json({message: 'Бренд удвлен'});
    }
    async update(req, res){
        const brand = await Brand.findOne({where: {id: req.body.id}})
        if(!brand){
            req.status(400).json({message:"Бренд не найден"})
        }
        brand.update({
            name: req.body.name
        }, {where: {id: req.body.id}});
        res.status(200).json({ message: "Бренд обновлен" });
    }
}

module.exports = new BrandController();