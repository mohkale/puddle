import { Theme } from './theme/type'

/**
 * Configuration file for puddle :smile:.
 */
export default interface Config {
  /**
   * Look and feel configuration for puddle.
   * This value assigns the colors used by puddles frontend client.
   */
  theme: Theme

  /**
   * The port on which puddles server should be bound.
   */
  serverPort: number

  /**
   * The host address on which puddles server should be bound.
   */
  serverHost: string

  /**
   * Used for signing encrypted transactions by the server. Should ideally
   * be a suitably long string of random alphanumeric characters.
   *
   * For unix users, you can generate such a string by using the following
   * shell snippet:
   *
   * ```bash
   * cat /dev/random | tr -C -d '[:alnum:]' | head -c 256 | clip
   * ```
   */
  secret: string

  /**
   * Directory where user session data will be stored. Should ideally be
   * relative to the root of the users directory.
   */
  sessionPath: string

  /**
   * Directory where puddles database will be stored.
   *
   * This should be a path to an empty directory for when puddle is first
   * started.
   */
  databaseDir: string
}
