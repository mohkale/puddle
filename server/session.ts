import 'express-session';
import logger from './logger';

/**
 * Interface for data stored in user sessions.
 *
 * I really wish Express.Session was generic, but seeing as it isn't
 * I've created some utility functions in this module to assert whether
 * a session is assigned and to assign a new session.
 */
export interface SessionType {
  transmission: {
    host: string
    path: string
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function sessionAssigned(session: any): session is Express.Session&SessionType {
  return session?.transmission !== undefined
}

export function newSession(session: Express.Session|undefined, payload: SessionType) {
  if (!session) {
    logger.error('session instance is unassigned')
    return
  }

  Object.assign(session, payload);
  logger.debug(`initialised new session with: ${JSON.stringify(payload)}`)
}
