const { Rent, Visitor, Book} = require('../models');

class RentController {
    static newRent(req, res, next){
        let UserId = req.body.userId
        let BookId = req.body.bookId

        Visitor.findOne({
            where:{
                id:UserId
            }
        })
            .then(data =>{
                if(!data){
                    next({
                        name: 'Not Found',
                        message: "Visitor Not Found"
                    })
                }else{
                    return Book.findOne({
                        where:{
                            id:BookId
                        }
                    })
                }
            })
            .then(data =>{
                if(!data){
                    next({
                        name: 'Not Found',
                        message: "Book Not Found"
                    })
                }else{
                    return Rent.create({UserId, BookId})
                }
            })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    UserId,
                    BookId
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static allRents(req, res, next){
        Rent.findAll({
            include: [Visitor, Book]
        })
            .then( data => {
                let response = data.map(item => {
                    const now = new Date()

                    return {
                        id: item.id,
                        visitor: item.Visitor.name,
                        book: item.Book.name,
                        rentDate: item.createdAt.toString()
                    }
                })
                res.status(200).json(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static returnBook(req, res, next){
        const id = +req.params.id

        Rent.findByPk(id)
            .then(data =>{
                if(!data){
                    next({
                        name: 'Not Found',
                        message: "Rent Not Found"
                    })
                }else{
                    return Rent.destroy({
                        where:{id},
                        returning: true
                    })
                }
            })
            .then(data =>{
                res.status(201).json({message: "book returned successfully"})
            })
            .catch(err =>{
                next(err)
            })
    }
}

module.exports = RentController