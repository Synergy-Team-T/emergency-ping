const mongoose = require('mongoose');
const Calamity = require('../models/calamityModel');

const {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const createRecord = deriveCreateEndpoint(Calamity);
const getRecords = deriveGetManyEndpoint(Calamity);
const getRecord = deriveGetOneEndpoint(Calamity);
const updateRecord = deriveUpdateEndpoint(Calamity);
const deleteRecord = deriveDeleteEndpoint(Calamity);


module.exports = {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
};
