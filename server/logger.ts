import chalk from 'chalk';
import winston from 'winston';
import stripAnsi from 'strip-ansi';

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Formatter for winston which strips out any ansi formatting
 * from the message. Logs should NEVER have ANSI colors when
 * not being run interactively.
 */
const ansiStripFormat = winston.format(info => {
  info.message = stripAnsi(info.message)
  return info
})

/**
 * Formatter for winston which trims and colorizes common levels
 * to a single character.
 */
const puddleShrinkLevelFormat = winston.format(info => {
  switch (info.level) {
    case 'log':
      info.level = chalk.yellow('l'); break;
    case 'info':
      info.level = chalk.blue('i'); break;
    case 'debug':
      info.level = chalk.green('d'); break;
    case 'warn':
      info.level = chalk.yellow('w'); break;
    case 'error':
      info.level = chalk.red('e'); break;
    default:
      info.level = chalk.magenta(info.level); break;
  }
  return info
})

const logger = winston.createLogger({
  level: isProduction ? 'info' : 'debug',
  defaultMeta: { },
  format: winston.format.combine(
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: './var/server-log.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        ansiStripFormat(),
        winston.format.json()
      ),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        puddleShrinkLevelFormat(),
        winston.format.simple()
      )
    })
  ]
})

export default logger;
