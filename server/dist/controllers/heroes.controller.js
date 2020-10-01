"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Return list of all characters from data crawled from website
    try {
        var heroes = [];
        fs_1.default.readFile("src/data/heroes.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(400).send(err);
            }
            heroes = JSON.parse(data);
            res.status(200).send(heroes);
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Return 1 character (based on id) from data crawled from website
    try {
        var heroes = [];
        fs_1.default.readFile("src/data/heroes.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(400).send(err);
            }
            heroes = JSON.parse(data);
            let hero = heroes.find(hero => parseInt(hero.id) == parseInt(req.params.id));
            res.status(200).send(hero);
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.default = {
    findAll,
    findById
};
//# sourceMappingURL=heroes.controller.js.map