(function (global) {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    
    console.log("\nVERTEX SOURCE CODE:\n" + glUtils.SL.Shaders.v1.vertex);
    console.log("\nFRAGMENT SOURCE CODE:\n" + glUtils.SL.Shaders.v1.fragment);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    program = glUtils.createProgram(gl,vertexShader, fragmentShader);
  
    initGlSize();

    //TRIANGLE
    var vertices = [
      //I TRIANGLES: 18 vertices
      +0.3666-0.3054, -0.3332,  
      +0.3666-0.3054, 0.3332,  
      +0.2444-0.3054, 0.3332,
      
      +0.2444-0.3054, +0.3332,  
      +0.2444-0.3054, -0.3332,  
      +0.3666-0.3054, -0.3332,
      
      +0.2444-0.3054, +0.3332,  
      +0.2110-0.3054, +0.3332,  
      +0.2444-0.3054, +0.2,
      
      +0.3666-0.3054, +0.3332,  
      +0.40-0.3054, +0.3332,  
      +0.3666-0.3054, +0.2,
      
      +0.2444-0.3054, -0.3332,  
      +0.2110-0.3054, -0.3332,  
      +0.2444-0.3054, -0.2,
      
      +0.3666-0.3054, -0.3332,  
      +0.40-0.3054, -0.3332,  
      +0.3666-0.3054, -0.2
    ];
    var circleW = circle(+0.3054-0.3054, +0.45, 0.05, false);
    var n1 = circleW.length/2;
    vertices = vertices.concat(circleW);
    
    //LINE
    var line_strip = [      
      //I LINESTRIP: 9 vertices
      -0.1944, -0.2,  
      -0.1944, 0.2,
      -0.1610, +0.3332,
      -0.35, +0.3332,
      -0.3166, +0.2,
      -0.3166, -0.2,  
      -0.35, -0.3332,
      -0.1610, -0.3332,
      -0.1944, -0.2
    ];
    var circleH = circle(-0.2555, +0.45, 0.05, true);
    var n2 = circleH.length/2;
    vertices = vertices.concat(line_strip);
    vertices = vertices.concat(circleH);
    
    renderBuffers();

    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = Math.PI * 0.0;

    var scaleLoc = gl.getUniformLocation(program, 'scale');
    var scale = 1;
    var flag = 1;

    var transALoc = gl.getUniformLocation(program, 'translateA');
    var transBLoc = gl.getUniformLocation(program, 'translateB');

    render();
    
    function initGlSize() {
      var width = canvas.getAttribute("width"), height = canvas.getAttribute("height");
      // Fullscreen if not set
      if (width) {
        gl.maxWidth = width;
      }
      if (height) {
        gl.maxHeight = height;
      }
    }
    
    function circle(centerX, centerY, radius, hollow){
      var vertices = []
      
      for (var i=0.0; i<=360; i+=1) {
        // degrees to radians
        var j = i * Math.PI / 180;
        
        var vert1 = [
          radius * Math.sin(j) + centerX,
          radius * Math.cos(j) + centerY,
        ];
        
        var vert2 = [
          centerX,  
          centerY,
        ];
        
        vertices = vertices.concat(vert1);
        if (hollow == false)
        vertices = vertices.concat(vert2);
      }
      return vertices;
    }
    
    function renderBuffers() {
      var n = vertices.length / 2;
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      
      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.enableVertexAttribArray(vPosition);
      
      gl.useProgram(program);
    }
    
    function render() {
      //angular speed in radian
      //Note: 1° × π/180 = 0.01745rad
      theta -= 0.0035;
      gl.uniform1f(thetaLoc,theta);
      gl.uniform1f(transALoc, 0.2555);
      gl.uniform1f(transBLoc, -0.4);
      gl.uniform1f(scaleLoc, 1.0);
    
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.drawArrays(gl.LINE_STRIP, 18 + n1, 9);
      gl.drawArrays(gl.LINE_STRIP, 27 + n1, n2);
    
    
      if(scale >= 1)
        flag = -1.0;
      else if(scale <= -1)
        flag = 1.0;
    
      scale += flag * 0.0035;
      gl.uniform1f(thetaLoc, 0.0);
      gl.uniform1f(transALoc, 0.5);
      gl.uniform1f(transBLoc, 0.0);
      gl.uniform1f(scaleLoc, scale);
    
      gl.drawArrays(gl.TRIANGLES, 0, 18);
      gl.drawArrays(gl.TRIANGLE_STRIP, 18, n1);
    
      requestAnimationFrame(render);
    }    

  }
})(window || this);