"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/components/ui/primitives";

export type CurtainPhase = "idle" | "in" | "out";

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

/** Monochrome flowing silk: warped sine folds with bright thin edges. */
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;
void main(){
  vec2 p=gl_FragCoord.xy/r.y*3.4;
  for(float i=1.;i<4.;i++){p+=.38/i*sin(p.yx*1.6*i+t*vec2(.34,.27)+i*1.7);}
  float f=sin(p.x*3.2+p.y*2.1);
  float edge=pow(1.-abs(f),22.);
  float glow=pow(1.-abs(sin(p.y*1.9-p.x*1.2)),5.);
  gl_FragColor=vec4(vec3(.035+edge*.7+glow*.13),1.);
}`;

function startSilk(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return () => {}; // the curtain stays plain black
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.bindAttribLocation(prog, 0, "p");
  gl.linkProgram(prog);
  gl.useProgram(prog);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, "r");
  const uT = gl.getUniformLocation(prog, "t");
  // Half resolution: the folds are soft, and this keeps phones smooth.
  const w = (canvas.width = Math.ceil(window.innerWidth / 2));
  const h = (canvas.height = Math.ceil(window.innerHeight / 2));
  gl.viewport(0, 0, w, h);
  gl.uniform2f(uR, w, h);
  let raf = 0;
  const t0 = performance.now();
  const draw = (now: number) => {
    gl.uniform1f(uT, 6 + (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(draw);
  };
  raf = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(raf);
}

/** Full-screen page-change curtain: silk rises, the page name shows large, then it lifts away. */
export function PageCurtain({ phase, title }: { phase: CurtainPhase; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = phase !== "idle";

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    return startSilk(canvasRef.current);
  }, [active]);

  return (
    <div
      aria-hidden
      data-curtain={phase}
      className={cx(
        "fixed inset-0 z-[100] overflow-hidden bg-black text-white transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "in" ? "[clip-path:inset(0_0_0_0)]" : phase === "out" ? "[clip-path:inset(0_0_100%_0)]" : "invisible [clip-path:inset(100%_0_0_0)] !duration-0",
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <p
        className={cx(
          "absolute inset-x-0 bottom-[28%] px-6 text-[clamp(3rem,11vw,10.5rem)] font-medium leading-[1] tracking-[-0.03em] transition-[opacity,transform] duration-700 ease-out sm:px-12 lg:px-20",
          phase === "in" ? "translate-y-0 opacity-90 delay-200" : "translate-y-8 opacity-0",
        )}
      >
        {title}
      </p>
    </div>
  );
}
