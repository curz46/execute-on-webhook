import "babel-polyfill";

import util from 'util';
import child_process from 'child_process';

import { config as dotenv } from 'dotenv';
dotenv();

import express from "express";
const app = express();

import {key as AUTH_KEY, commands as COMMANDS, port as PORT} from '../config.js';

app.get('/push/:key', async (req, res) => {
    const {key} = req.params;
    if (key === AUTH_KEY) {
        res.status(200).json({ result: 'success' });
        for (const cmd of COMMANDS) {
            child_process.execSync(cmd, { detached: true });
        }
    } else {
        res.status(500).json({ result: 'unauthorized' });
    }
});

app.listen(PORT, () => console.log('listening on *:', PORT));