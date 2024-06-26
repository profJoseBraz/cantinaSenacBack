import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

export const getAllProducts = async (_: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const sql = 
            `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                c.id as id_categoria,
                c.nome as nome_categoria
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria`;

        const [data] = await dbConn.query(sql);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getAllProducts, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductsById = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { id } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                c.id as id_categoria,
                c.nome as nome_categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.id = ?`;

        const [data] = await dbConn.query(sql, [id]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductsByCategoryId = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { categoryId } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                c.id as id_categoria,
                c.nome as nome_categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                c.id = ?`;

        const [data] = await dbConn.query(sql, [categoryId]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductsById, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductsByName = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { name } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                c.id as id_categoria,
                c.nome as nome_categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.nome like ?`;

        const [data] = await dbConn.query(sql, [`${name}%`]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductsByName, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}

export const getProductsByDescription = async (req: Request, res: Response, dbConn : mysql.Connection) : Promise<Response> => {
    try {
        const { description } = req.query;

        const sql = 
            `
            select 
                p.id,
                p.nome,
                p.descricao,
                p.valor,
                p.imagem,
                c.id as id_categoria,
                c.nome as nome_categoria 
            from 
                produto p
            join categoria c 
                on c.id = p.id_categoria
            where
                p.descricao like ?`;

        const [data] = await dbConn.query(sql, [`${description}%`]);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        console.log(`Endpoint: getProductsByDescription, Erro: ${err}`);
        return res.status(500).json(err);
    } finally {
        if(dbConn){
            dbConn.end();
        }
    }
}