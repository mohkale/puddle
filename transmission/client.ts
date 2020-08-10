export * from './shared';
import TransmissionBase from './base';

// client transmission interface, this just redirects
// all transmission requests to the puddle server and
// TODO finish thought.

export interface TransmissionSerialised {
  sessionId: string
  requestTag?: number
}

export default class TransmissionClient extends TransmissionBase {
  constructor() {
    super('/transmission')
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  fetch(url: string, body: any) {
    return window.fetch(url, body);
  }

  /**
   * Convert this transmission instance to a serialisable object
   * that can be passed to fromSerialise to reconstruct you're
   * current transmission session.
   */
  serialise = (): TransmissionSerialised => {
    return {
      sessionId: this.sessionId,
      requestTag: this.requestTag,
    }
  }

  /**
   * Construct a new transmission instance from a serialised
   * property struct.
   */
  static fromSerialised(o: TransmissionSerialised) {
    const t = new TransmissionClient();
    t.sessionId = o.sessionId
    t.requestTag = o.requestTag
    return t
  }
}
