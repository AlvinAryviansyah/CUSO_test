const { Book} = require('../models');

class BookController {
    static addBook(req, res, next){
        let name = req.body.name
        let genre = req.body.genre

        Book.create({name, genre})
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    name,
                    genre
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static allBooks(req, res, next){
        Book.findAll()
            .then( data => {
                let response = data.map(item => {
                    let genre = ""
                    switch (item.genre) {
                        case 1:
                            genre = 'Engineering'
                            break;
                        case 2:
                            genre = 'Novel'
                            break;
                        case 2:
                            genre = 'History'
                            break;
                        default:
                            genre = 'Unknown'
                            break;
                    }


                    return {
                        id: item.id,
                        name: item.name,
                        genre
                    }
                })
                res.status(200).json(response)
            })
            .catch(err => {
                next(err)
            })
    }

    static editBook(req, res, next){
        let name = req.body.name
        let genre = +req.body.genre
        let id = req.params.id

        Book.update({name, genre},{
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
                        message : 'Book is not found'
                    })
                }
                
            })
            .catch(err => {
                next({
                    name : 'Not Found',
                    message : 'Book is not found'
                })
            })

    }

    static deleteBook(req, res, next){
        const id = +req.params.id

        Book.findByPk(id)
            .then(data =>{
                if(!data){
                    next({
                        name: 'Not Found',
                        message: "Book Not Found"
                    })
                }else{
                    return Book.destroy({
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

module.exports = BookController