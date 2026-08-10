// <grain-bloom> — STOLMAR monochrome grain-bloom backdrop.
// Slow drifting blurred light masses, hard film grain, near-black stage.
// Attributes: intensity (0..1, default 0.75), speed (default 0.35)
(function () {
  if (customElements.get('grain-bloom')) return;

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
    'float fbm(vec2 p){float s=0.0,a=0.5;for(int k=0;k<4;k++){s+=a*snoise(p);p*=2.03;a*=0.5;}return s;}',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'void main(){',
    '  vec2 uv=v_uv;',
    '  vec2 asp=vec2(u_resolution.x/max(u_resolution.y,1.0),1.0);',
    '  vec2 p=uv*asp;',
    '  float t=u_time;',
    // large slow-drifting soft masses
    '  float m1=fbm(p*1.15+vec2(t*0.11,-t*0.07));',
    '  float m2=fbm(p*2.10-vec2(t*0.06,t*0.13)+3.7);',
    '  float mass=0.62*m1+0.38*m2;',
    // bloom: soft wide falloff, then a brighter core -> blurred splash look
    '  float bloom=smoothstep(-0.15,0.95,mass);',
    '  float core=smoothstep(0.42,1.05,mass);',
    '  float lum=0.055+0.30*bloom+0.42*core;',
    // vertical banding inside the masses, drifting slowly upward
    '  float band=0.5+0.5*sin((uv.y*46.0)+mass*5.0-t*0.55);',
    '  lum+=0.085*band*bloom;',
    // mouse glimpse — light gathers under the cursor
    '  vec2 ms=u_mouse/max(u_resolution,vec2(1.0));',
    '  float d=distance(uv*asp,vec2(ms.x,1.0-ms.y)*asp);',
    '  lum+=(0.22+0.18*bloom)*smoothstep(0.42,0.0,d);',
    '  lum*=u_intensity;',
    // vignette
    '  lum*=mix(0.55,1.0,smoothstep(1.25,0.30,distance(uv,vec2(0.5))));',
    // hard film grain, animated
    '  float g=hash(floor(gl_FragCoord.xy)+floor(vec2(t*24.0)));',
    '  lum+=(g-0.5)*(0.085+0.16*bloom);',
    '  vec3 col=vec3(max(lum,0.0));',
    '  gl_FragColor=vec4(col,1.0);}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  class GrainBloom extends HTMLElement {
    static get observedAttributes() { return ['intensity', 'speed']; }

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
      this._onMove = function (e) {
        var r = canvas.getBoundingClientRect();
        this._mouse = [(e.clientX - r.left) * this._dpr, (e.clientY - r.top) * this._dpr];
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
        if (!isFinite(speed)) speed = 0.35;
        var inten = parseFloat(self.getAttribute('intensity'));
        if (!isFinite(inten)) inten = 0.75;
        var t = reduce ? 4.0 : ((now - self._t0) / 1000) * speed;
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

  customElements.define('grain-bloom', GrainBloom);
})();
