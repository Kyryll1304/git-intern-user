import { useEffect } from "react";
import styles from "@/styles/MatrixAnimation.module.css";

export default function MatrixAnimation() {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const ctx = canvas.getContext("2d");
    const columns = canvas.width / 15;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30a0 + Math.random() * 33);
        ctx.fillText(text, i * 15, drops[i] * 15);

        if (drops[i] * 15 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(drawMatrix, 33);

    return () => {
      clearInterval(matrixInterval);
    };
  }, []);

  return <canvas id="matrixCanvas" className={styles.canvas} />;
}
