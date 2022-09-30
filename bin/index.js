#! /usr/bin/env node

'use strict';
const fs = require('fs');
const path = require('path');

const FILE_NAME = 'app.json';

const projDirectory = process.cwd();

const filePath = path.resolve(projDirectory, FILE_NAME);
const isFileExist = fs.existsSync(filePath);

function parseDate(_, value) {
  return value.length === 1
    ? `0${value}`
    : value;
}

function isValidVersion(version) {
  return typeof version === 'string' && version.split('.').length === 3;
}

function getVersion(oldVersion) {
  const now = new Date();

  const date = parseDate`${now.getDate() + ''}`;
  const month = parseDate`${now.getMonth() + 1 + ''}`;

  const today = `${date}${month}${now.getFullYear()}`;

  if (isValidVersion(oldVersion)) {
    const [major, oldDate, buildNumber] = oldVersion.split('.');

    return today === oldDate
      ? `${major}.${today}.${Number(buildNumber) + 1}`
      : `${major}.${today}.0`;
  } else {
    return `1.${today}.0`;
  }
}

function writeVersion(oldVersion) {
  const applicationVersion = getVersion(oldVersion)
  const data = { applicationVersion };

  fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
    if (err) {
      console.log('Error occurred while update build version: ', err?.message);
      process.exit(1);
    } else {
      console.log(`Build version update successfully. New version: ${applicationVersion}`);
      process.exit(0);
    }
  });
}

if (isFileExist) {
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log('Error occurred trying to read build version: ', err?.message);
      process.exit(1);
    }
    const { applicationVersion } = JSON.parse(data);

    writeVersion(applicationVersion);
  })
} else {
  writeVersion();
}