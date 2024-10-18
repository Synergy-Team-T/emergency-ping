const UserStatus = require('../models/userStatusModel');
const {
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
} = require('../core/controllers');


const createRecord = async (req, res) => {
  try {
    const record = await UserStatus.create({...req.body});
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
        status: { '$ne': 'EXPIRED' },
        _id: { '$ne': record._id }
      },
      { status: 'EXPIRED' },
    )

    return res.status(200).json(record);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const getRecords = deriveGetManyEndpoint(UserStatus);
const getRecord = deriveGetOneEndpoint(UserStatus);
const updateRecord = deriveUpdateEndpoint(UserStatus);
const deleteRecord = deriveDeleteEndpoint(UserStatus);


module.exports = {
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
}
