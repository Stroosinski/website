// <veil-shader> - STOLMAR "veil" WebGL backdrop.
// Dark drifting smoke + a faint yellow horizon + a mouse-following glimpse.
// Attributes: intensity (0..1, default 0.7)
(function () {
  if (customElements.get('veil-shader')) return;

  var VS = 'attribute vec2 a_position;varying vec2 v_texCoord;' +
    'void main(){v_texCoord=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}';

  var FS = [
    'precision highp float;',
    'uniform float u_time;',
    'uniform float u_intensity;',
    'uniform vec2 u_resolution;',
    'uniform vec2 u_mouse;',
    'varying vec2 v_texCoord;',
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
    'void main(){',
    '  vec2 uv=v_texCoord;',
    '  vec2 asp=vec2(u_resolution.x/max(u_resolution.y,1.0),1.0);',
    '  vec2 p=uv*asp;',
    '  float t=u_time*0.05;',
    '  float n=snoise(p*2.2+vec2(t,-t*0.6));',
    '  n+=0.5*snoise(p*4.6-vec2(t*1.4,t));',
    '  n/=1.5;',
    '  float smoke=smoothstep(-0.4,0.9,n);',
    '  vec3 col=vec3(0.030)+vec3(0.085)*smoke*u_intensity;',
    '  float hz=exp(-18.0*abs(uv.y-0.62-0.04*snoise(vec2(p.x*1.4,t*2.0))));',
    '  vec3 yellow=vec3(0.937,0.827,0.169);',
    '  col+=yellow*hz*0.10*u_intensity;',
    '  vec2 m=u_mouse/max(u_resolution,vec2(1.0));',
    '  float d=distance(uv*asp,vec2(m.x,1.0-m.y)*asp);',
    '  float g=smoothstep(0.34,0.0,d);',
    '  col+=yellow*g*(0.16+0.10*smoke)*u_intensity;',
    '  float vg=smoothstep(1.25,0.35,distance(uv,vec2(0.5)));',
    '  col*=mix(0.75,1.0,vg);',
    '  gl_FragColor=vec4(col,1.0);}'
  ].join('\n');

  class VeilShader extends HTMLElement {
    static get observedAttributes() { return ['intensity']; }

    connectedCallback() {
      if (this._canvas) return;
      this.style.display = this.style.display || 'block';
      var canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      canvas.setAttribute('aria-hidden', 'true');
      this.appendChild(canvas);
      this._canvas = canvas;

      var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;
      this._gl = gl;

      function compile(type, src) {
        var s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }
      var prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      var pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      this._u = {
        time: gl.getUniformLocation(prog, 'u_time'),
        intensity: gl.getUniformLocation(prog, 'u_intensity'),
        res: gl.getUniformLocation(prog, 'u_resolution'),
        mouse: gl.getUniformLocation(prog, 'u_mouse')
      };

      var self = this;
      this._mouse = { x: 0, y: 0 };
      this._onMove = function (e) {
        var r = canvas.getBoundingClientRect();
        if (!r.width || !r.height) return;
        self._mouse.x = ((e.clientX - r.left) / r.width) * canvas.width;
        self._mouse.y = (1 - (e.clientY - r.top) / r.height) * canvas.height;
      };
      window.addEventListener('mousemove', this._onMove, { passive: true });

      function sync() {
        var w = canvas.clientWidth || 1280;
        var h = canvas.clientHeight || 720;
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = Math.round(w * dpr); h = Math.round(h * dpr);
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      }
      this._ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null;
      if (this._ro) this._ro.observe(canvas);
      sync();
      this._mouse.x = canvas.width / 2;
      this._mouse.y = canvas.height * 0.4;

      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var start = performance.now();
      function frame(now) {
        sync();
        var t = reduced ? 40000 : (now - start);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(self._u.time, t * 0.001);
        gl.uniform1f(self._u.intensity, self._intensity());
        gl.uniform2f(self._u.res, canvas.width, canvas.height);
        gl.uniform2f(self._u.mouse, self._mouse.x, self._mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        self._raf = requestAnimationFrame(frame);
      }
      this._raf = requestAnimationFrame(frame);
    }

    _intensity() {
      var v = parseFloat(this.getAttribute('intensity'));
      return isNaN(v) ? 0.7 : Math.max(0, Math.min(1.5, v));
    }

    disconnectedCallback() {
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._onMove) window.removeEventListener('mousemove', this._onMove);
      this._raf = null;
    }
  }

  customElements.define('veil-shader', VeilShader);
})();
