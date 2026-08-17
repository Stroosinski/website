// <ash-drift> - STOLMAR monochrome hero backdrop, sibling of <grain-bloom>.
// Curling smoke-like masses on near-black; the cursor parts the ash and it glows through.
// Attributes: intensity (0..1, default 0.75), speed (default 0.3)
(function () {
  if (customElements.get('ash-drift')) return;

  var VS = 'attribute vec2 a_position;varying vec2 v_uv;' +
    'void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}';

  var FS = [
    'precision highp float;',
    'uniform float u_time;uniform float u_intensity;uniform vec2 u_resolution;uniform vec2 u_mouse;',
    'varying vec2 v_uv;',
    'vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}',
    'float snoise(vec2 v){',
    '  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);',
    '  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;',
    '  i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);',
    '  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);',
    '  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));',
    '  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);',
    '  m=m*m;m=m*m;',
    '  vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;',
    '  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);',
    '  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;',
    '  return 130.0*dot(m,g);}',
    'float fbm(vec2 p){float s=0.0,a=0.5;for(int k=0;k<5;k++){s+=a*snoise(p);p=p*2.04+vec2(-1.3,2.1);a*=0.5;}return s;}',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'void main(){',
    '  vec2 uv=v_uv;',
    '  vec2 asp=vec2(u_resolution.x/max(u_resolution.y,1.0),1.0);',
    '  vec2 p=uv*asp;',
    '  float t=u_time;',
    '  vec2 ms=u_mouse/max(u_resolution,vec2(1.0));',
    '  vec2 mp=vec2(ms.x,1.0-ms.y)*asp;',
    '  float md=distance(p,mp);',
    // smoke curl: noise advected by its own gradient, rising slowly
    '  vec2 q=vec2(fbm(p*1.4+vec2(0.0,-t*0.16)),fbm(p*1.4+vec2(5.2,-t*0.11)+2.8));',
    // cursor parts the ash outward
    '  vec2 push=normalize(p-mp+0.0001)*exp(-md*md*5.5)*0.22;',
    '  vec2 w=p+0.62*q+push;',
    '  float ash=fbm(w*1.9-vec2(t*0.07,t*0.21));',
    '  float veil=smoothstep(-0.45,0.85,ash);',
    // filaments: thin bright strands where the smoke thins out
    '  float fil=pow(1.0-abs(ash*1.25),6.0);',
    '  float lum=0.05+0.24*veil+0.26*fil*veil;',
    // slow soft breathing of overall density
    '  lum*=0.88+0.12*sin(t*0.4+ash*2.0);',
    // cursor reveal - the ash glows where it was parted
    '  float glow=smoothstep(0.50,0.0,md);',
    '  lum+=glow*(0.14+0.26*veil+0.20*fil);',
    '  lum*=u_intensity;',
    '  lum*=mix(0.46,1.0,smoothstep(1.28,0.26,distance(uv,vec2(0.5))));',
    '  vec3 col=vec3(max(lum,0.0));',
    // signal yellow, sparing - only the hottest filaments under the cursor
    '  float warm=smoothstep(0.55,1.0,fil*veil+glow*0.5);',
    '  col=mix(col,col*vec3(1.07,1.0,0.70),warm*0.5);',
    '  float gr=hash(floor(gl_FragCoord.xy)+floor(vec2(t*22.0)));',
    '  col+=(gr-0.5)*(0.06+0.10*veil);',
    '  gl_FragColor=vec4(max(col,0.0),1.0);}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  class AshDrift extends HTMLElement {
    connectedCallback() {
      if (this._canvas) return;
      this.style.display = this.style.display || 'block';
      this.style.background = '#050505';
      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      canvas.setAttribute('aria-hidden', 'true');
      this.appendChild(canvas);
      this._canvas = canvas;

      var gl = canvas.getContext('webgl', { antialias: false, alpha: false });
      if (!gl) return;
      this._gl = gl;

      var prog = gl.createProgram();
      var vs = compile(gl, gl.VERTEX_SHADER, VS), fs = compile(gl, gl.FRAGMENT_SHADER, FS);
      if (!vs || !fs) return;
      gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
      this._prog = prog;

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      this._u = {
        time: gl.getUniformLocation(prog, 'u_time'),
        intensity: gl.getUniformLocation(prog, 'u_intensity'),
        res: gl.getUniformLocation(prog, 'u_resolution'),
        mouse: gl.getUniformLocation(prog, 'u_mouse')
      };

      this._mouse = [-9999, -9999];
      this._target = [-9999, -9999];
      this._onMove = function (e) {
        var r = canvas.getBoundingClientRect();
        this._target = [(e.clientX - r.left) * this._dpr, (e.clientY - r.top) * this._dpr];
        if (this._mouse[0] < -9000) this._mouse = this._target.slice();
      }.bind(this);
      window.addEventListener('pointermove', this._onMove, { passive: true });

      this._resize = this._doResize.bind(this);
      window.addEventListener('resize', this._resize);
      this._doResize();

      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._t0 = performance.now();
      var self = this;
      var frame = function (now) {
        if (!self._gl) return;
        var speed = parseFloat(self.getAttribute('speed'));
        if (!isFinite(speed)) speed = 0.3;
        var inten = parseFloat(self.getAttribute('intensity'));
        if (!isFinite(inten)) inten = 0.75;
        self._mouse[0] += (self._target[0] - self._mouse[0]) * 0.07;
        self._mouse[1] += (self._target[1] - self._mouse[1]) * 0.07;
        var t = reduce ? 5.0 : ((now - self._t0) / 1000) * speed;
        gl.uniform1f(self._u.time, t);
        gl.uniform1f(self._u.intensity, inten);
        gl.uniform2f(self._u.mouse, self._mouse[0], self._mouse[1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        self._raf = requestAnimationFrame(frame);
      };
      this._raf = requestAnimationFrame(frame);
    }

    _doResize() {
      var gl = this._gl, canvas = this._canvas;
      if (!gl) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      this._dpr = dpr;
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      var h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(this._u.res, w, h);
    }

    disconnectedCallback() {
      if (this._raf) cancelAnimationFrame(this._raf);
      window.removeEventListener('resize', this._resize);
      window.removeEventListener('pointermove', this._onMove);
      this._gl = null; this._canvas = null;
    }
  }

  customElements.define('ash-drift', AshDrift);
})();
