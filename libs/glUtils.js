(function(global) {
    
    var glUtils = {
        VERSION : '0.0.3',

        checkWebGL: function(canvas){
            var contexts = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            var gl;

            for (let index = 0; index < contexts.length; index++) {
                try {
                    var context = contexts[index];
                    gl = canvas.getContext(context);
                } catch (error) {
                    
                }
                if (gl){
                    break;
                }
            }

            if (!gl){
                alert("WebGL not found!");
            }
            return gl;
        },

        getShader: function (gl, type, source) {
            //create shader
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            //compile shader
            gl.compileShader(shader);

            //check shader
            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                console.log("Shader failed to compile " + gl.getShaderInfoLog(shader));
                //delete failed shader
                gl.deleteShader(shader);
                return null;
            }
                      
            //return compiled shader
            return shader;
        },

        createProgram: function(gl, vertexShader, fragmentShader){
            //create new program
            var program = gl.createProgram();

            //attach shader to program
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            //link program to webGL
            gl.linkProgram(program);

            //check program link
            if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
                //throw error log
                var error = gl.getProgramInfoLog(program);
                console.log('Failed to link webGL program: ' + error);

                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                return null;
            }

            //validate program
            gl.validateProgram(program);

            if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
                //throw error log
                var error = gl.getProgramInfoLog(program);
                console.log('Failed to link webGL program: ' + error);

                gl.deleteProgram(program);
                gl.deleteShader(vertexShader);
                gl.deleteShader(fragmentShader);
                return null;
            }

            return program;
        },

        SL: {
            sourceFromHtml: function (options) {
                var options = options || {};
                this.elemName = options.elemName || "shader";
                this.dataType = options.dataType || "data-type";
                this.dataVersion = options.dataVersion || "data-version";
                this.shaderElems = document.getElementsByName(this.elemName);
                this.Shaders = this.Shaders || {};
                this.slShaderCount = this.shaderElems.length;
                for (let i = 0; i < this.slShaderCount; i++) {
                    var shader = this.shaderElems[i];

                    if(!shader){
                        return null;
                    }

                    var source = "";
                    var currentChild = shader.firstChild;
                    while(currentChild){
                        if (currentChild.nodeType == currentChild.TEXT_NODE){
                            source += currentChild.textContent;
                        }
                        currentChild = currentChild.nextSibling;
                    }
                    
                    var version = shader.getAttribute(this.dataVersion);
                    if(!this.Shaders[version]){
                        this.Shaders[version] = {
                            vertex: '',
                            fragment: ''
                        };
                    }
                    this.Shaders[version][shader.getAttribute(this.dataType)] = source;
                }
            }
        }
    };
    global.glUtils = glUtils;
})(window || this);