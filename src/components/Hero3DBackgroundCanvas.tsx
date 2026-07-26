'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DBackgroundCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Group for mouse parallax tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Geometric Nodes Behind Text
    const geometries = [
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TorusGeometry(0.5, 0.18, 16, 32),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.7, transparent: true, opacity: 0.45 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.4 }),
    ];

    const floatingNodes: THREE.Mesh[] = [];
    const nodeCount = 12;

    for (let i = 0; i < nodeCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Spread floating nodes around text area
      mesh.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 1
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mainGroup.add(mesh);
      floatingNodes.push(mesh);
    }

    // 2. Interactive Mouse Particle Cloud (200 particles)
    const particleCount = 220;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 16;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // 3. Ambient & Point Lighting
    const pointLight1 = new THREE.PointLight(0x06b6d4, 4, 15);
    pointLight1.position.set(3, 4, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 15);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // 4. Smooth Mouse Parallax Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth LERP mouse tracking
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Group Tilt Parallax
      mainGroup.rotation.y = currentMouseX * 0.25;
      mainGroup.rotation.x = -currentMouseY * 0.2;
      mainGroup.position.x = currentMouseX * 0.4;
      mainGroup.position.y = -currentMouseY * 0.3;

      // Rotate individual floating nodes
      floatingNodes.forEach((node, i) => {
        const speed = (i % 3 + 1) * 0.3;
        node.rotation.x += 0.005 * speed;
        node.rotation.y += 0.008 * speed;
        node.position.y += Math.sin(elapsedTime * 0.8 + i) * 0.002;
      });

      particleSystem.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
      if (container && renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
