(function () {

    glUtils.SL.sourceFromHtml();

    //vertex shader (point)
    var VSHADER_SOURCE = glUtils.SL.Shaders.v1.vertex;

    //fragment shader (color)
    var FSHADER_SOURCE = glUtils.SL.Shaders.v1.fragment;

    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    //init shader & program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    var program = glUtils.createProgram(gl,vertexShader, fragmentShader);
    gl.useProgram(program);

    //fill screen w/ black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //clear canvas' buffer
    gl.clear(gl.COLOR_BUFFER_BIT);
    //draw
    gl.drawArrays(gl.POINTS, 0, 1);
})();