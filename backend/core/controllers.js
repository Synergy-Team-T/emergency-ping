const mongoose = require('mongoose');


const deriveCreateEndpoint = (model) => {
    
  return async (req, res) => {
      try {
        const record = await model.create({ ...req.body });
      if (!record) {
        throw Error('Record not created');
      }
  
      return res.status(200).json(record);
    
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const deriveGetManyEndpoint = (model) => {

  return async (req, res) => {
    try {
      const records = await model
        .find()
        .sort({ createdAt: -1 })
        .lean();
  
      return res.status(200).json(records);
    
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

const deriveGetOneEndpoint = (model) => {

  return async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record'});
      }
  
      const record = await model.findById(id).lean();
      if (!record) {
        return res.status(404).json({ error: 'No such record'});
      }
  
      return res.status(200).json(record);
    
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

const deriveUpdateEndpoint = (model) => {

  return async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record'});
      }
  
      const exist = await model.findById(id).lean();
      if (!exist) {
        return res.status(404).json({ error: 'No such record'});
      }
  
      const record = await model.findOneAndUpdate({ _id: id }, { ...req.body }).lean();
      if (!record) {
        return res.status(400).json({ error: 'Record not updated'});
      }
  
      return res.status(200).json(record);
    
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const deriveDeleteEndpoint = (model) => {

  return async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such record'});
      }
  
      const record = await model.findById(id);
      if (!record) {
        return res.status(404).json({ error: 'No such record'});
      }
  
      const result = await record.deleteOne();
      if (!result || result.deletedCount === 0) {
        return res.status(400).json({ error: 'Record not deleted' })
      }
  
      return res.status(200).json(record);
    
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}


module.exports = {
  deriveCreateEndpoint,
  deriveGetManyEndpoint,
  deriveGetOneEndpoint,
  deriveUpdateEndpoint,
  deriveDeleteEndpoint,
};
