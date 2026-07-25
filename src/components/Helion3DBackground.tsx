'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Helion3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 7;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3D Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Luminous 3D Torus Knot (Main Center Structure)
    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.35, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(torusKnot);

    // 2. Inner Glowing Core Sphere
    const coreGeometry = new THREE.IcosahedronGeometry(0.8, 3);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // 3. Floating 3D Particle Cloud / Starfield
    const particlesCount = 350;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
      particleScales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 4, 20);
    cyanPointLight.position.set(4, 4, 4);
    scene.add(cyanPointLight);

    const bluePointLight = new THREE.PointLight(0x3b82f6, 4, 20);
    bluePointLight.position.set(-4, -4, 4);
    scene.add(bluePointLight);

    // Mouse Parallax Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 700;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate 3D Torus Knot & Core
      torusKnot.rotation.x = elapsedTime * 0.25;
      torusKnot.rotation.y = elapsedTime * 0.35;
      coreMesh.rotation.x = -elapsedTime * 0.3;
      coreMesh.rotation.y = -elapsedTime * 0.4;

      // Rotate Particle System slowly
      particleSystem.rotation.y = elapsedTime * 0.05;

      // Smooth Mouse Parallax Lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      group.rotation.y = targetX * 1.5;
      group.rotation.x = -targetY * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-70"
    />
  );
};
