import { useEffect, useRef } from "react";

const FluidPlasmaCursor = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let mouse = { x: w / 2, y: h / 2 };
    let particles: any[] = [];

    const moveHandler = (e: MouseEvent) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      for (let i = 0; i < 6; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: dx * 0.08 + (Math.random() - 0.5) * 2,
          vy: dy * 0.08 + (Math.random() - 0.5) * 2,
          life: 80,
          size: Math.random() * 3 + 2,
          color: Math.random() > 0.5 ? "blue" : "pink",
        });
      }
    };

    window.addEventListener("mousemove", moveHandler);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          18
        );

        if (p.color === "blue") {
          gradient.addColorStop(0, "rgba(59,130,246,0.9)");
          gradient.addColorStop(1, "rgba(59,130,246,0)");
        } else {
          gradient.addColorStop(0, "rgba(236,72,153,0.9)");
          gradient.addColorStop(1, "rgba(236,72,153,0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default FluidPlasmaCursor;
