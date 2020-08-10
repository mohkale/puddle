export * from './shared';
import nodeFetch from 'node-fetch'
import TransmissionBase from './base';

export default class TransmissionServer extends TransmissionBase {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  fetch(url: string, body: any) {
    return nodeFetch(url, body)
  }
}
