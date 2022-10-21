import { HELPER } from './index';

describe('libs/core', () => {
  it('should export constant', () => {
    expect(HELPER).toEqual('code');
  });
});
