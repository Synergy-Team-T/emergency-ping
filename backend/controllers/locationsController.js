const axios = require('axios');

const LocationGroup = require('../models/locationGroupModel');
const { isIterable } = require('../core/utils');

const mockAmenities = require('../mock-mappings/amenities.json');

const getNearest = async (req, res) => {
  
  const { q, locationGroup, radius, limit } = req.query;
  let queries = [];

  if (typeof q !== 'string' && isIterable(q)) {
    queries = [...q];
  } else {
    queries = [q];
  }

  if (locationGroup) {
    const locationGroup = await LocationGroup.findOne({ _id: locationGroup })

    if (!locationGroup) {
      return res.status(404).json({error: 'Location group not found'});
    }

    [req.query.lon, req.query.lat] = locationGroup.location.coordinates;
  }

  if (!radius) {
    req.query.radius = 5000;
  }

  if (!limit) {
    req.query.limit = 5;
  }

  const responses = await Promise.all(
    queries.map((query) =>
      axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            ...req.query,
            format: 'json',
            q: query,
          }
        },
      )
    )
  );

  let places = [];

  for (const r of responses) {
    places = [...places, ...r.data];
  }

  return res.status(200).json(places);
}

const getAmenities = async (req, res) => {
  try {
    const amenities = mockAmenities.data;  // Accessing the "data" array in mock JSON
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load amenities' });
  }
}

module.exports = {
  getNearest,
  getAmenities
}
