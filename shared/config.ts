import { Theme } from './theme/type'

export default interface Config {
  theme: Theme
  serverPort: number
  serverHost: string
  secret: string
  sessionPath: string
  databaseDir: string
}
