import { Theme } from './theme/type'

export default interface Config {
  theme: Theme
  serverPort: number
  serverHost: string
}
