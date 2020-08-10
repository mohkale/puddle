import os from 'os';
import fs from 'fs';
import path from 'path';

import app from '../../app';
import logger from '../../logger';

const DEFAULT_BIND_ADDRESS = '0.0.0.0'
const DEFAULT_BIND_PORT = '9091'
const DEFAULT_PATH = '/transmission/'
const DEFAULT_URL = `http://${DEFAULT_BIND_ADDRESS}:${DEFAULT_BIND_PORT}${DEFAULT_PATH}rpc`

function findConfigFile(): string|undefined {
  const home = os.homedir()
  const configDir = process.env.XDG_CONFIG_HOME || path.join(home, '.config')

  const options = [
    path.join(home, '.transmission'),
    path.join(configDir, 'transmission-daemon'),
    path.join(home, 'AppData', 'Local', 'transmission-daemon'),
  ].map(dir => path.join(dir, 'settings.json'))

  return options.find(fileName => {
    try {
      return fs.existsSync(fileName)
    } catch (err) {
      logger.error(`config-access ${fileName} : ${err}`)
    }
  })
}

/*
 * Find the default URL for the transmission daemon.
 * from the associated configuration file.
 */
app.get('/transmission-url', async (req, res) => {
  const sendDefault = () => res.json({ status: 'OK', body: { url: DEFAULT_URL } })
  const sendUrl = (url: string) => res.json({ status: 'OK', body: { url } })

  const configFile = findConfigFile()
  if (!configFile) {
    logger.warn('config-find : failed to find config file')
    sendDefault()
    return
  }

  fs.readFile(configFile, (err, data) => {
    if (err) {
      logger.error(`config-read ${configFile} : ${err}`)
      sendDefault()
      return
    }

    try {
      const json = JSON.parse(data.toString())
      const address = json['rpc-bind-address'] || DEFAULT_BIND_ADDRESS
      const port    = json['rpc-port']    || DEFAULT_BIND_PORT
      const path    = json['rpc-url']          || DEFAULT_PATH
      sendUrl(`http://${address}:${port}${path}rpc`)
    } catch (err) {
      logger.error(`config-parse ${configFile} : ${err}`)
      sendDefault()
    }
  })
})
