
const path = require('path');
const fs = require('fs')

const getlocalDataFile = () => {
  let localDataFile = process.env.HOME;
  if (!localDataFile) {
    localDataFile = process.env.LOCALAPPDATA;
  }
  return localDataFile;
};

const id = Date.now();

const jsonFilePath = path.join(getlocalDataFile(), `./logs_${id}.json`)
const contentFilePath = path.join(getlocalDataFile(), `./result_${id}.txt`)

if (!fs.existsSync(jsonFilePath)) {
  fs.writeFileSync(jsonFilePath, '{}');
}

if (!fs.existsSync(contentFilePath)) {
  fs.writeFileSync(contentFilePath, '');
}

global.config = {
  jsonFilePath,
  contentFilePath,
}


