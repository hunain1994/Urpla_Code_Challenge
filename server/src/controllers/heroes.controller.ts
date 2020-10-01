import * as Express from "express";
import Hero from "../models/hero";
import fs from 'fs';

const findAll = async (req: Express.Request, res: Express.Response) => {
        // Return list of all characters from data crawled from website
        try{
                var heroes:Hero [] = [];
                fs.readFile("src/data/heroes.json","utf-8", (err, data) => {
                        if(err) {
                                return res.status(400).send(err);
                        }
                        heroes = JSON.parse(data);
                        res.status(200).send(heroes);
                });
        }
        catch(err)
        {
                res.status(400).send(err);
        }
}

const findById = async (req: Express.Request, res: Express.Response) => {
        // Return 1 character (based on id) from data crawled from website
        try
        {
                var heroes:Hero [] = [];
                fs.readFile("src/data/heroes.json","utf-8", (err, data) => {
                        if(err) {
                                return res.status(400).send(err);
                        }
                        heroes = JSON.parse(data);
                        let hero = heroes.find(hero => parseInt(hero.id) == parseInt(req.params.id));
                        res.status(200).send(hero);
                });
        }
        catch(err)
        {
                res.status(400).send(err);
        }
}

export default {
    findAll,
    findById
}