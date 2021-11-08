const { Visitor, Rent} = require('../models');

class VisitorController {
    static register(req, res, next){
        let name = req.body.name
        let date = new Date()

        Visitor.create({name})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    name,
                    joinDate: date.toString()
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static allVisitors(req, res, next){
        Visitor.findAll()
            .then( data => {
                console.log(data)
                let response = data.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        joinDate: item.createdAt.toString()
                    }
                })
                res.status(200).json(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static editVisitor(req, res, next){
        let name = req.body.name
        let id = req.params.id

        Visitor.update({name},{
            where: {id},
            returning: true
        })
            .then(data => {
                if(data[0] > 0){
                    res.status(200).json({
                        data,
                        message: "update success"
                    })
                }else{
                    next({
                        name : 'Not Found',
                        message : 'Visitor is not found'
                    })
                }
                
            })
            .catch(err => {
                next({
                    name : 'Not Found',
                    message : 'Visitor is not found'
                })
            })

    }

    static deleteVisitor(req, res, next){
        const id = +req.params.id

        Visitor.findByPk(id)
            .then(data =>{
                if(!data){
                    next({
                        name: 'Not Found',
                        message: "Visitor Not Found"
                    })
                }else{
                    return Visitor.destroy({
                        where:{id},
                        returning: true
                    })
                }
            })
            .then(data =>{
                res.status(201).json({message: "deleted successfully"})
            })
            .catch(err =>{
                next(err)
            })
    }
}

module.exports = VisitorController