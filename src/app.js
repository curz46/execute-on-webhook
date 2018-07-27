import "babel-polyfill";

import child_process from 'child_process';

import { config as dotenv } from 'dotenv';
dotenv();

import express from "express";
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

import config from '../config.js';
if (!config.port || !config.commands) {
    console.log('config.js must contain at least port and commands.');
    process.exit();
}
const { port: PORT, commands: COMMANDS } = config;
const AUTH_KEY = config.key;
const BRANCHES = config.branches;

app.post('/push/:key', async (req, res) => {
    const {key} = req.params;
    console.log(key);
    if (AUTH_KEY == null || key === AUTH_KEY) {
        // body.ref e.g. refs/heads/master
        const branch = req.body.ref ? req.body.ref.split('/').slice(-1)[0] : null;
        if (BRANCHES != null && !BRANCHES.includes(branch)) {
            // branches defined AND does not contain this branch, do nothing
            res.status(200).json({ result: 'ignored-branch' });
        } else {
            for (const cmd of COMMANDS) {
                child_process.execSync(cmd, { detached: true, stdio: ['inherit', 'pipe', 'pipe'] });
            }
            res.status(200).json({ result: 'success' });
        }
    } else {
        res.status(401).json({ result: 'unauthorized' });
    }
});

app.listen(PORT, () => console.log('listening on *:' + PORT));