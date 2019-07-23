import { AbstractPipe } from './abstract.pipe';

describe('AbstractPipe', () => {
  it('create an instance', () => {
    const pipe = new AbstractPipe();
    expect(pipe).toBeTruthy();
  });
});
