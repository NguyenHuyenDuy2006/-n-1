"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "core" | "node" | "peripheral";
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<NetworkNode[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      nodesRef.current = [];
      connectionsRef.current = [];

      const centerX = width / 2;
      const centerY = height / 2;

      nodesRef.current.push({
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
        radius: 12,
        type: "core",
      });

      const nodeCount = Math.min(Math.floor((width * height) / 15000), 45);
      for (let i = 0; i < nodeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * Math.min(width, height) * 0.35;
        const type = Math.random() > 0.7 ? "peripheral" : "node";

        nodesRef.current.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: type === "peripheral" ? 3 + Math.random() * 2 : 4 + Math.random() * 3,
          type,
        });
      }

      for (let i = 1; i < nodesRef.current.length; i++) {
        const connectTo = Math.floor(Math.random() * i);
        connectionsRef.current.push({
          from: i,
          to: connectTo,
          opacity: 0.15 + Math.random() * 0.2,
        });

        if (Math.random() > 0.7 && i > 2) {
          const connectTo2 = Math.floor(Math.random() * (i - 1));
          if (connectTo2 !== connectTo) {
            connectionsRef.current.push({
              from: i,
              to: connectTo2,
              opacity: 0.08 + Math.random() * 0.15,
            });
          }
        }
      }

      for (let i = 1; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          if (Math.random() > 0.985) {
            const dx = nodesRef.current[i].x - nodesRef.current[j].x;
            const dy = nodesRef.current[i].y - nodesRef.current[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              connectionsRef.current.push({
                from: i,
                to: j,
                opacity: 0.05 + Math.random() * 0.1,
              });
            }
          }
        }
      }
    };

    initNodes();

    const handleResize = () => {
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    });

    const animate = () => {
      if (!reducedMotionRef.current) {
        updateNodes(width, height);
      }
      draw(ctx, width, height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", () => {});
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const updateNodes = (width: number, height: number) => {
    const nodes = nodesRef.current;
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.type === "core") {
        node.x += (centerX - node.x) * 0.02;
        node.y += (centerY - node.y) * 0.02;
        continue;
      }

      const dx = node.x - centerX;
      const dy = node.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.min(width, height) * 0.45;

      if (dist > maxDist) {
        const force = (dist - maxDist) * 0.008;
        node.vx -= (dx / dist) * force;
        node.vy -= (dy / dist) * force;
      }

      const mouseDx = node.x - mouseRef.current.x;
      const mouseDy = node.y - mouseRef.current.y;
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      const mouseInfluence = 120;

      if (mouseDist < mouseInfluence && mouseDist > 1) {
        const force = (mouseInfluence - mouseDist) * 0.02;
        node.vx += (mouseDx / mouseDist) * force;
        node.vy += (mouseDy / mouseDist) * force;
      }

      node.vx *= 0.96;
      node.vy *= 0.96;

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 30) {
        node.x = 30;
        node.vx *= -0.5;
      }
      if (node.x > width - 30) {
        node.x = width - 30;
        node.vx *= -0.5;
      }
      if (node.y < 30) {
        node.y = 30;
        node.vy *= -0.5;
      }
      if (node.y > height - 30) {
        node.y = height - 30;
        node.vy *= -0.5;
      }
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) / 2,
    );
    gradient.addColorStop(0, "rgba(6, 182, 212, 0.05)");
    gradient.addColorStop(1, "rgba(2, 6, 23, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const connections = connectionsRef.current;
    const nodes = nodesRef.current;

    for (const conn of connections) {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      if (!fromNode || !toNode) continue;

      const dx = toNode.x - fromNode.x;
      const dy = toNode.y - fromNode.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 250) continue;

      const opacity = conn.opacity * (1 - dist / 250);
      const lineWidth = fromNode.type === "core" || toNode.type === "core" ? 1.5 : 0.8;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);

      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      const perpX = -dy / dist * 15 * Math.sin(Date.now() / 1000 + fromNode.x + fromNode.y);
      const perpY = dx / dist * 15 * Math.sin(Date.now() / 1000 + fromNode.x + fromNode.y);

      ctx.quadraticCurveTo(midX + perpX, midY + perpY, toNode.x, toNode.y);
      ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    for (const node of nodes) {
      let fillColor: string;
      let strokeColor: string;
      let glowColor: string;

      switch (node.type) {
        case "core":
          fillColor = "rgba(6, 182, 212, 0.9)";
          strokeColor = "rgba(249, 115, 22, 0.8)";
          glowColor = "rgba(6, 182, 212, 0.4)";
          break;
        case "peripheral":
          fillColor = "rgba(249, 115, 22, 0.7)";
          strokeColor = "rgba(6, 182, 212, 0.5)";
          glowColor = "rgba(249, 115, 22, 0.3)";
          break;
        default:
          fillColor = "rgba(6, 182, 212, 0.6)";
          strokeColor = "rgba(249, 115, 22, 0.4)";
          glowColor = "rgba(6, 182, 212, 0.2)";
      }

      const pulse = 1 + Math.sin(Date.now() / 800 + node.x) * 0.15;
      const radius = node.radius * pulse;

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = node.type === "core" ? 2 : 1;
      ctx.stroke();

      if (node.type === "core") {
        const ringPulse = 1 + Math.sin(Date.now() / 1000) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2.5 * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * ringPulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 4 * ringPulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.08 * ringPulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-950 pt-16 text-surface-50 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/50 via-transparent to-accent-950/40" aria-hidden="true" />
      <div className="absolute inset-0 noise" aria-hidden="true" />

      <div className="absolute inset-0 z-0">
        <div className="hero-visual absolute inset-0">
          <canvas
            ref={canvasRef}
            className="relative z-10 h-full w-full opacity-60"
            aria-label="Mô hình mạng lưới kết nối thể hiện kiến trúc hệ thống phân tán"
            role="img"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/80 to-surface-950/20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/30" aria-hidden="true" />
        </div>
      </div>

      <div className="relative z-10 container py-space-5xl lg:py-space-6xl">
        <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-body text-brand-300 font-medium mb-6 animate-in stagger-1">
              <span className="h-px w-8 bg-brand-400" aria-hidden="true" />
              Đối tác giải pháp số cho doanh nghiệp và tổ chức
            </p>
            <h1
              id="hero-heading"
              className="text-display-xl font-bold text-surface-50 leading-[1.05] mb-6 animate-in stagger-2 text-balance"
            >
              Giúp doanh nghiệp <span className="gradient-text">vận hành và phát triển</span> trên nền tảng số
            </h1>
            <p className="text-body-lg text-surface-300 mb-10 max-w-xl animate-in stagger-3">
              Synapse Codex cung cấp phần mềm quản lý doanh nghiệp, website, hạ tầng số, Google Workspace, Google Ads và đào tạo AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in stagger-4">
              <Button size="lg" onClick={scrollToContact} className="w-full sm:w-auto">
                Trao đổi dự án
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto hover:text-surface-950 dark:hover:text-surface-50">
                <a href="#problems" className="text-brand-600 hover:text-surface-950 dark:text-brand-400 dark:hover:text-surface-50">Xem năng lực</a>
              </Button>
            </div>
          </div>
        </div>
    </section>
  );
}
