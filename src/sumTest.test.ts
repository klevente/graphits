import { expect, it } from 'vitest';
import { sum } from './sumTest';

it('should work', () => {
  expect(sum(1, 2)).toEqual(3);
});
