'use strict';

const repository = require('../repositories/course-repository');

//Course Controller
exports.get = async(req, res, next) => {

    try {
        const data = 
            await repository.get()
            res.status(200)
            .send(data);
    } catch(e) {
        res.status(500)
        .send({
            message: 'Falha ao processar sua requisição!',
            data: e
        });
    }

}

exports.getById = async (req, res, next) => {
    try {
        const data = 
            await repository.getById(req.params.id)
            res.status(200)
            .send(data);
    } catch (e) {
        res.status(500)
        .send({
            message: 'Falha ao processar sua requisição!',
            data: e
        });
    }
};


exports.getBySlug = async (req, res, next) => {

    try {
        const data =
            await repository.getBySlug(req.params.slug);
        res.status(200)
            .send(data);
    } catch (e) {
        res.status(500)
        .send({
            message: 'Falha ao processar sua requisição!'
        });
    }

};

exports.post = async(req, res, next) => {

    console.log(req.body);

    try {
        await repository.create(req.body);
        res.status(201)
        .send({
            message: 'Curso cadastrado com sucesso!'
        });
    } catch(e) {
        res.status(500)
        .send({
            message: 'Falha ao cadastrar curso!',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {

    try {
        await repository.update(req.params.id, req.body);
        res.status(200)
        .send({
            message: 'Curso atualizado com sucesso!',
            data: e
        });
    } catch(e) {
        res.status(500)
        .send({
            message: 'Falha ao atualizar o curso!',
            data: e
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200)
            .send({
                message: 'Curso removido com sucesso!'
            });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao remover curso!',
            data: e
        })
    }
}