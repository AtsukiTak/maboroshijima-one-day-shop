import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
admin.initializeApp();
import express = require('express');
import cors = require('cors');

import * as charge from './charge';

const app = express();
app.use(cors());
app.use(express.json());
app.post('/charge', charge.create);
app.post('/test/charge', charge.testCreate);

export const stripe = functions.https.onRequest(app);
