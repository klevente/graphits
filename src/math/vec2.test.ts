import { describe, expect, it } from 'vitest';
import { Vec2 } from './vec2';

describe('vec2', () => {
  it('should return length squared', () => {
    const v = new Vec2(1, 2);
    expect(v.lengthSquared()).toEqual(5);
  });

  it('should return dot product', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 4);
    expect(v1.dot(v2)).toEqual(11);
  });
});
