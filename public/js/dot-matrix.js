// <dot-matrix> - animated glyph-matrix backdrop (port of the Originkit Dot Matrix, single-pass WebGL1).
// Attributes: frequency (UI 1-10), speed (UI), cellsize (UI 1-100), gamma (UI 1-20), bias (UI), chars, opacity
(function () {
  if (customElements.get('dot-matrix')) return;

  var VS = 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 u_resolution;',
    'uniform float u_time;',
    'uniform float u_frequency;',
    'uniform float u_speed;',
    'uniform float u_cell;',
    'uniform float u_gamma;',
    'uniform float u_bias;',
    'uniform sampler2D u_glyph;',
    'uniform vec3 u_c0;uniform vec3 u_c1;uniform vec3 u_c2;',
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'float snoise(vec3 v){',
    '  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);',
    '  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);',
    '  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;',
    '  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);',
    '  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;',
    '  i=mod289(i);',
    '  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
    '  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;',
    '  vec4 j=p-49.0*floor(p*ns.z*ns.z);',
    '  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);',
    '  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;',
    '  vec4 h=1.0-abs(x)-abs(y);',
    '  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
    '  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;',
    '  vec4 sh=-step(h,vec4(0.0));',
    '  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
    '  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);',
    '  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
    '  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
    '  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);',
    '  m=m*m;',
    '  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}',
    'vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);}',
    'void main(){',
    '  vec2 pix=gl_FragCoord.xy;',
    '  float cell=max(u_cell,1.0);',
    '  vec2 cellIdx=floor(pix/cell);',
    '  vec2 cellCenter=(cellIdx+0.5)*cell;',
    '  vec2 uv=cellCenter/u_resolution;',
    '  float aspect=u_resolution.x/max(u_resolution.y,1.0);',
    '  vec2 nuv=(uv-0.5)*vec2(aspect,1.0)+0.5;',
    '  float hue=abs(snoise(vec3(nuv*u_frequency,u_time*u_speed)));',
    '  vec3 rainbow=hsv2rgb(vec3(hue,1.0,1.0));',
    '  float gray=0.3*rainbow.r+0.59*rainbow.g+0.11*rainbow.b;',
    '  gray=pow(clamp(gray,0.0001,1.0),u_gamma);',
    '  float g2=clamp(gray+u_bias,0.0,1.0);',
    '  vec2 cellUV=fract(pix/cell);',
    '  vec3 gs=texture2D(u_glyph,vec2(cellUV.x,1.0-cellUV.y)).rgb;',
    '  float mark=dot(gs,vec3(0.299,0.587,0.114));',
    '  vec3 col;float scaled=g2*2.0;',
    '  if(scaled<1.0){col=mix(u_c0,u_c1,scaled);}else{col=mix(u_c1,u_c2,scaled-1.0);}',
    '  gl_FragColor=vec4(col,mark);}'
  ].join('\n');

  function hex(h) {
    h = h.replace('#', '');
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }
  function mapLin(v, a, b, c, d) { return c + ((v - a) / (b - a)) * (d - c); }

  class DotMatrix extends HTMLElement {
    connectedCallback() {
      if (this._canvas) return;
      this.style.display = this.style.display || 'block';
      if (!this.style.height) { this.style.width = '100%'; this.style.height = '100%'; }
      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      canvas.setAttribute('aria-hidden', 'true');
      this.appendChild(canvas);
      this._canvas = canvas;
      var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
      if (!gl) return;
      this._gl = gl;

      function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
      var prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      gl.useProgram(prog);
      this._prog = prog;

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      // glyph texture: single character tile
      var ch = this.getAttribute('chars') || 'X';
      var c = document.createElement('canvas');
      c.width = 64; c.height = 64;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '700 56px monospace';
      ctx.fillText(ch[0], 32, 34);
      var tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      var u = function (n) { return gl.getUniformLocation(prog, n); };
      this._u = {
        res: u('u_resolution'), time: u('u_time'), freq: u('u_frequency'), speed: u('u_speed'),
        cell: u('u_cell'), gamma: u('u_gamma'), bias: u('u_bias'),
        c0: u('u_c0'), c1: u('u_c1'), c2: u('u_c2')
      };
      gl.uniform1i(u('u_glyph'), 0);

      var freq = parseFloat(this.getAttribute('frequency') || '2');
      var speed = parseFloat(this.getAttribute('speed') || '4');
      var cellUi = parseFloat(this.getAttribute('cellsize') || '9');
      var gammaUi = parseFloat(this.getAttribute('gamma') || '4');
      var biasUi = parseFloat(this.getAttribute('bias') || '10');
      this._dpr = Math.min(window.devicePixelRatio || 1, 2);
      gl.uniform1f(this._u.freq, mapLin(freq, 1, 10, 0.3, 6));
      gl.uniform1f(this._u.speed, speed * 0.05);
      gl.uniform1f(this._u.cell, mapLin(cellUi, 1, 100, 6, 60) * this._dpr);
      gl.uniform1f(this._u.gamma, mapLin(gammaUi, 1, 20, 0.5, 8));
      gl.uniform1f(this._u.bias, biasUi * 0.05);
      var c0 = hex(this.getAttribute('c0') || '#FFFFFF');
      var c1 = hex(this.getAttribute('c1') || '#EFD32B');
      var c2 = hex(this.getAttribute('c2') || '#000000');
      gl.uniform3f(this._u.c0, c0[0], c0[1], c0[2]);
      gl.uniform3f(this._u.c1, c1[0], c1[1], c1[2]);
      gl.uniform3f(this._u.c2, c2[0], c2[1], c2[2]);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      var self = this;
      this._resize = function () {
        var w = self.clientWidth || 1, h = self.clientHeight || 1;
        canvas.width = Math.round(w * self._dpr);
        canvas.height = Math.round(h * self._dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(self._u.res, canvas.width, canvas.height);
      };
      this._resize();
      this._ro = new ResizeObserver(this._resize);
      this._ro.observe(this);

      // Odstępstwo od oryginału (2026-08-11, techniczne, bez wpływu na wygląd):
      // pauza w tle, jak w silk-drape.js - patrz komentarz tam.
      var last = 0, interval = 1000 / 30;
      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function frame(t) {
        self._raf = requestAnimationFrame(frame);
        if (document.hidden) return;
        if (t - last < interval) return;
        last = t;
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(self._u.time, reduced ? 0 : t * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (reduced) { cancelAnimationFrame(self._raf); self._raf = null; }
      }
      this._raf = requestAnimationFrame(frame);
    }
    disconnectedCallback() {
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      this._raf = null;
    }
  }
  customElements.define('dot-matrix', DotMatrix);
})();
