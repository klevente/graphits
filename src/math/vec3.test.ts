import { describe, expect, it } from 'vitest';
import { Vec3 } from './vec3';

describe('vec3', () => {
  it('should return length squared', () => {
    const v = new Vec3(1, 2, 3);
    expect(v.lengthSquared()).toEqual(14);
  });

  it('should return dot product', () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(4, 5, 6);
    expect(v1.dot(v2)).toEqual(32);
  });
});
