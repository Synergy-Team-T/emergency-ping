const mongoose = require('mongoose');
const Calamity = require('../models/calamityModel');

const {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const FIELDS_TO_POPULATE = ['locationGroups'];

const createRecord = deriveCreateEndpoint(Calamity, FIELDS_TO_POPULATE);
const getRecords = deriveGetManyEndpoint(Calamity, FIELDS_TO_POPULATE);
const getRecord = deriveGetOneEndpoint(Calamity, FIELDS_TO_POPULATE);
const updateRecord = deriveUpdateEndpoint(Calamity, FIELDS_TO_POPULATE);
const deleteRecord = deriveDeleteEndpoint(Calamity, FIELDS_TO_POPULATE);


module.exports = {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
};
