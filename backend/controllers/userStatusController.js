const UserStatus = require('../models/userStatusModel');
const {
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const FIELDS_TO_POPULATE = ['user', 'calamity'];

const createRecord = async (req, res) => {
  try {
    const record = await UserStatus
      .create({...req.body})
      .populate(FIELDS_TO_POPULATE);
      
    if (!record) {
      throw Error('Record not created');
    }

    await User.validateOneThenUpdate(
      { _id: record.user },
      { recentStatus: record._id },
    );

    await UserStatus.updateMany(
      {
        user: record.user,
        status: 'PENDING',
        _id: { '$ne': record._id }
      },
      { status: 'EXPIRED' },
    )

    return res.status(200).json(record);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getRecords = deriveGetManyEndpoint(UserStatus, FIELDS_TO_POPULATE);
const getRecord = deriveGetOneEndpoint(UserStatus, FIELDS_TO_POPULATE);
const updateRecord = deriveUpdateEndpoint(UserStatus, FIELDS_TO_POPULATE);
const deleteRecord = deriveDeleteEndpoint(UserStatus, FIELDS_TO_POPULATE);


module.exports = {
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
}
