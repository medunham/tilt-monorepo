import { LIBRARY } from './index';

describe('libs/core', () => {
  it('should export constant', () => {
    expect(LIBRARY).toEqual('code');
  });
});
