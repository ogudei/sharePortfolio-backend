const schemas = require("./schemas");

async function findOneBySchema(schema, key, value) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOne({ [key]: value }).exec();
  } else return;
}

async function findBySchema(schema, key, value) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].find({ [key]: value }).exec();
  } else return;
}

async function findAllBySchema(schema) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].find({}).exec();
  } else return;
}

async function findFieldBySchema(schema, key, value, field) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].find({ [key]: value }, field).exec();
  } else return;
}

async function findOneFieldBySchema(schema, key, value, field) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOne({ [key]: value }, field).exec();
  } else return;
}

async function findByJSON(schema, jsonQuery) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].find(jsonQuery).exec();
  } else return;
}

async function findOneByJSON(schema, jsonQuery) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOne(jsonQuery).exec();
  } else return;
}

async function findOneAndUpdateBySchema(schema, filter, update,option) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema].findOneAndUpdate(filter, update,option).exec();
  } else return;
}

async function createBySchema(schema, element) {
  if (Object.keys(schemas).includes(schema)) {
    return await schemas[schema]
      .create(element)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  } else return;
}

function getSchema(schema) {
  if (Object.keys(schemas).includes(schema)) {
    return schemas[schema];
  } else return null;
}

module.exports = {
  findOneByJSON,
  findOneBySchema,
  findOneAndUpdateBySchema,
  createBySchema,
  findBySchema,
  getSchema,
  findByJSON,
  findFieldBySchema,
  findOneFieldBySchema,
  findAllBySchema
};
