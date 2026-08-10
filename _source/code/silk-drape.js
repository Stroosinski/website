// <silk-drape> — STOLMAR premium hero backdrop.
// Slow satin folds of light over near-black; cursor warps and lights the drape.
// Attributes: intensity (0..1, default 0.75), speed (default 0.22)
(function () {
  if (customElements.get('silk-drape')) return;

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
    'float fbm(vec2 p){float s=0.0,a=0.5;for(int k=0;k<5;k++){s+=a*snoise(p);p=p*2.02+vec2(1.7,-1.1);a*=0.5;}return s;}',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'void main(){',
    '  vec2 uv=v_uv;',
    '  vec2 asp=u_resolution/max(min(u_resolution.x,u_resolution.y),1.0);',
    '  vec2 p=uv*asp;',
    '  float t=u_time;',
    '  vec2 ms=u_mouse/max(u_resolution,vec2(1.0));',
    '  vec2 mp=vec2(ms.x,1.0-ms.y)*asp;',
    '  float md=distance(p,mp);',
    // spherical lens: smooth magnification around the cursor, no cusp at the centre
    '  vec2 lv=p-mp;',
    '  float lens=exp(-md*md*281.0);',
    '  p-=lv*lens*1.134;',
    '  md=distance(p,mp);',
    // domain warp — the cloth folds, cursor drags the weave
    '  vec2 q=vec2(fbm(p*1.05+vec2(0.0,t*0.13)),fbm(p*1.05+vec2(3.2,-t*0.10)));',
    '  vec2 warp=p+0.85*q;',
    '  float fold=fbm(warp*1.35-vec2(t*0.05,t*0.08));',
    // satin sheen: fine specular ridges riding the folds
    '  float sheen=0.5+0.5*sin(fold*7.0+warp.y*3.4-t*0.35);',
    '  sheen=pow(sheen,3.2);',
    '  float body=smoothstep(-0.55,0.85,fold);',
    '  float lum=0.045+0.20*body+0.34*sheen*body;',
    // a second, tighter sheen for the highlight edge of each fold
    '  float edge=pow(0.5+0.5*sin(fold*14.0+t*0.22),9.0);',
    '  lum+=0.16*edge*body;',
    // cursor light — gathers on the cloth, brightest where folds catch it
    '  float glow=smoothstep(0.55,0.0,md);',
    '  lum+=glow*(0.10+0.30*sheen+0.14*body);',
    '  lum*=u_intensity;',
    '  float vgFloor=mix(0.70,0.42,step(1.0,u_resolution.x/max(u_resolution.y,1.0)));',
    '  lum*=mix(vgFloor,1.0,smoothstep(1.30,0.28,distance(uv,vec2(0.5))));',
    // signal yellow only in the hottest sheen, and under the cursor — very sparing
    '  vec3 col=vec3(max(lum,0.0));',
    '  float warmth=smoothstep(0.46,0.95,sheen*body+glow*0.45);',
    '  col=mix(col,col*vec3(1.06,0.99,0.72),warmth*0.55);',
    // fine grain keeps it filmic, not plastic',
    '  float gr=hash(floor(gl_FragCoord.xy)+floor(vec2(t*20.0)));',
    '  col+=(gr-0.5)*0.035;',
    '  gl_FragColor=vec4(max(col,0.0),1.0);}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  class SilkDrape extends HTMLElement {
    connectedCallback() {
      if (this._canvas) return;
      this.style.display = this.style.display || 'block';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
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
      var self0 = this;
      this._onMove = function (e) {
        var r = canvas.getBoundingClientRect();
        this._target = [(e.clientX - r.left) * this._dpr, (e.clientY - r.top) * this._dpr];
        if (this._mouse[0] < -9000) this._mouse = this._target.slice();
      }.bind(this);
      window.addEventListener('pointermove', function (e) { self0._hasPointer = true; }, { passive: true, once: true });
      window.addEventListener('pointermove', this._onMove, { passive: true });

      this._resize = this._doResize.bind(this);
      window.addEventListener('resize', this._resize);
      window.addEventListener('orientationchange', this._resize);
      if (window.ResizeObserver) {
        this._ro = new ResizeObserver(this._resize);
        this._ro.observe(this);
      }
      this._doResize();
      requestAnimationFrame(this._resize);
      setTimeout(this._resize, 300);

      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._t0 = performance.now();
      var self = this;
      var frame = function (now) {
        if (!self._gl) return;
        var speed = parseFloat(self.getAttribute('speed'));
        if (!isFinite(speed)) speed = 0.22;
        var inten = parseFloat(self.getAttribute('intensity'));
        if (!isFinite(inten)) inten = 0.75;
        var narrow = canvas.width > 0 && canvas.width / Math.max(canvas.height, 1) < 1.0;
        if (narrow) inten *= 1.6;
        if (!self._hasPointer) {
          var ta = (now - self._t0) / 1000;
          self._target = [canvas.width * (0.5 + 0.30 * Math.sin(ta * 0.16)), canvas.height * (0.42 + 0.22 * Math.sin(ta * 0.11 + 1.7))];
          if (self._mouse[0] < -9000) self._mouse = self._target.slice();
        }
        // easing of the cursor light — premium lag, no snap
        self._mouse[0] += (self._target[0] - self._mouse[0]) * 0.18;
        self._mouse[1] += (self._target[1] - self._mouse[1]) * 0.18;
        var t = reduce ? 6.0 : ((now - self._t0) / 1000) * speed;
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
      var cw = canvas.clientWidth || this.clientWidth || this.getBoundingClientRect().width || window.innerWidth;
      var ch = canvas.clientHeight || this.clientHeight || this.getBoundingClientRect().height || window.innerHeight;
      var w = Math.max(1, Math.round(cw * dpr));
      var h = Math.max(1, Math.round(ch * dpr));
      if (w === canvas.width && h === canvas.height) return;
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(this._u.res, w, h);
    }

    disconnectedCallback() {
      if (this._raf) cancelAnimationFrame(this._raf);
      window.removeEventListener('resize', this._resize);
      window.removeEventListener('orientationchange', this._resize);
      if (this._ro) { this._ro.disconnect(); this._ro = null; }
      window.removeEventListener('pointermove', this._onMove);
      this._gl = null; this._canvas = null;
    }
  }

  customElements.define('silk-drape', SilkDrape);
})();
