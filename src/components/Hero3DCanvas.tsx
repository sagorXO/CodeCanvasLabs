'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL fallback in Hero3DCanvas:', err);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // Outer Glass Icosahedron Wireframe Core
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Inner Glowing Core Node
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Orbital Particle Ring (120 particles)
    const particleCount = 140;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 0.4;
      posArray[i * 3] = Math.cos(angle) * radius;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      posArray[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lighting
    const pointLight = new THREE.PointLight(0x06b6d4, 3, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      outerMesh.rotation.y = elapsedTime * 0.3;
      outerMesh.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2;

      innerMesh.rotation.y = -elapsedTime * 0.5;
      innerMesh.rotation.z = Math.cos(elapsedTime * 0.3) * 0.2;

      particleSystem.rotation.y = elapsedTime * 0.15;
      particleSystem.rotation.x = mouseY * 0.2;

      outerMesh.rotation.y += mouseX * 0.05;
      outerMesh.rotation.x += mouseY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (container && renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto cursor-grab active:cursor-grabbing pointer-events-auto"
      title="Interactive 3D System Core (Drag to rotate)"
    />
  );
};
