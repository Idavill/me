attribute vec3 aPosition;
attribute vec2 aTextCoord;
varying vec2 pos;

void main() {
    pos = aTextCoord;

    vec4 position = vec4(aPosition, 1.0);

    position.xy = position.yx * 2. - 1.;

    gl_Position = position;
}