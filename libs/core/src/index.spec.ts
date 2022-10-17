import { LIBRARY } from './index';

describe('libs/core', () => {
  it('should export constant', () => {
    const module = require('./index');
    expect(LIBRARY).toEqual('code');
  });
});
