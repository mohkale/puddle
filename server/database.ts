import fs from 'fs';
import diskdb from 'diskdb';

import logger from './logger';
import config from '../config';

try {
  fs.mkdirSync(config.databaseDir, { recursive: true })
} catch (err) {
  if (err.code !== 'EEXIST') {
    logger.error(`failed to create database directory ${config.databaseDir} : ${err}`)
    process.exit(1)
  }
}

const db = diskdb.connect(config.databaseDir, ['notifications'])
export default db
