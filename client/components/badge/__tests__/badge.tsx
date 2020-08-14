import React from 'react';
import renderer from 'react-test-renderer';

import Badge from '../index';

describe('badge', () => {
  it('can render', () => {
    const tree = renderer
      .create(<Badge num={5} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('can render even without a numerical value', () => {
    const tree = renderer
      .create(<Badge />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
