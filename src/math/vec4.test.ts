import { describe, expect, it } from 'vitest';
import { Vec4 } from './vec4';

describe('vec4', () => {
  it('should return length squared', () => {
    const v = new Vec4(1, 2, 3, 4);
    expect(v.lengthSquared()).toEqual(30);
  });

  it('should return dot product', () => {
    const v1 = new Vec4(1, 2, 3, 4);
    const v2 = new Vec4(5, 6, 7, 8);
    expect(v1.dot(v2)).toEqual(70);
  });
});
