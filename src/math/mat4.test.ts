import { describe, expect, it } from 'vitest';
import { Mat4 } from './mat4';

describe('mat4', () => {
  it('Should calculate matrix multiplication result', () => {
    const m = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(m.mul(m)).toEqual(
      new Mat4(90, 100, 110, 120, 202, 228, 254, 280, 314, 356, 398, 440, 426, 484, 542, 600),
    );
  });
});
