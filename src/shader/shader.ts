import type { AttributeKeys, GlType, HasPositionAttribute, UniformKeys } from './types';

const UNIFORM_REGEX = /uniform (\w+) ([^;]*);/g;
const ATTRIBUTE_REGEX = /in \w+ (\w+);/g;

function getMatchedGroupValuesFor(regex: RegExp, str: string) {
  return [...str.matchAll(regex)].map((match) => match[1]);
}

function getUniformTypeAndVariables(str: string): [string, GlType][] {
  return [...str.matchAll(UNIFORM_REGEX)].map((match) => [match[1], match[2] as GlType]);
}

class Shader<S extends string> {
  readonly shaderHandle: WebGLShader;
  readonly uniforms: UniformKeys<S>;
  readonly attributes: AttributeKeys<S>[];

  constructor(gl: WebGL2RenderingContext, source: S, shaderType: GLenum) {
    this.shaderHandle = gl.createShader(shaderType)!;
    gl.shaderSource(this.shaderHandle, source);
    gl.compileShader(this.shaderHandle);

    if (!gl.getShaderParameter(this.shaderHandle, gl.COMPILE_STATUS)) {
      throw new Error(
        `An error occurred compiling the ${Shader.getShaderTypeString(
          gl,
          shaderType,
        )} shader:\n${gl.getShaderInfoLog(this.shaderHandle)}`,
      );
    }

    const uniformEntries = getUniformTypeAndVariables(source).flatMap(([type, vars]) =>
      vars
        .split(',')
        .map((v) => v.trim())
        .map((v) => [v, type as GlType]),
    );
    this.uniforms = Object.fromEntries(uniformEntries);
    this.attributes = getMatchedGroupValuesFor(ATTRIBUTE_REGEX, source) as AttributeKeys<S>[];
  }

  private static getShaderTypeString(gl: WebGL2RenderingContext, shaderType: GLenum): string {
    switch (shaderType) {
      case gl.VERTEX_SHADER:
        return 'vertex';
      case gl.FRAGMENT_SHADER:
        return 'fragment';
      default:
        throw new Error(`Unknown shader type: ${shaderType}`);
    }
  }
}

export class VertexShader<S extends string> extends Shader<S> {
  constructor(gl: WebGL2RenderingContext, source: HasPositionAttribute<S>) {
    super(gl, source, gl.VERTEX_SHADER);
  }
}

export class FragmentShader<S extends string> extends Shader<S> {
  constructor(gl: WebGL2RenderingContext, source: S) {
    super(gl, source, gl.FRAGMENT_SHADER);
  }
}
