precision mediump float;

attribute vec2 vPosition;

uniform float theta;
uniform float scale;
uniform float translateA;
uniform float translateB;

void main() {
  //float theta = 0.0 - 2.0 * atan(1.0, 1.0);
  
  mat4 rot = mat4(
        cos(theta), -sin(theta), 0.0, 0.0,
        sin(theta), cos(theta), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
  );


  mat4 scaling = mat4(
        scale, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
  );

  mat4 transA = mat4(
        1.0, 0.0, 0.0, translateA,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
  );

  mat4 transB = mat4(
        1.0, 0.0, 0.0, translateB,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * scaling * transA * rot * transB ;
}