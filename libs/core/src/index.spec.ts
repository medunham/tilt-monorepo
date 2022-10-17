describe('libs/core', () => {
  it('should export constant', () => {
    const module = require('./index');
    expect(module.LIBRARY).toEqual('code');
  });
});
