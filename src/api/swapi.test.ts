import { getCharacterId } from './swapi';

describe('getCharacterId', () => {
  it('takes the last path segment of the url', () => {
    expect(getCharacterId('https://swapi.info/api/people/1')).toBe('1');
  });

  it('ignores a trailing slash', () => {
    expect(getCharacterId('https://swapi.info/api/people/18/')).toBe('18');
  });
});
