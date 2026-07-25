'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

// Simplex noise for organic vertex displacement
const NOISE_GLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const VERTEX_SHADER = `
  ${NOISE_GLSL}
  uniform float uTime;
  uniform float uNoiseStrength;
  uniform float uNoiseFrequency;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    float displacement = snoise(position * uNoiseFrequency + uTime * 0.4) * uNoiseStrength;
    displacement += snoise(position * uNoiseFrequency * 2.0 + uTime * 0.8) * uNoiseStrength * 0.3;
    
    vec3 newPosition = position + normal * displacement;
    vDisplacement = displacement;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Fresnel edge glow
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    
    // Color mixing based on displacement + fresnel
    float t = vDisplacement * 3.0 + 0.5;
    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.5, t));
    color = mix(color, uColor3, smoothstep(0.5, 1.0, t));
    
    // Add fresnel edge highlight
    color += fresnel * uColor2 * 1.2;
    
    // Subtle pulse
    float pulse = sin(uTime * 1.5) * 0.08 + 0.92;
    
    // Final alpha with depth fade
    float alpha = (0.35 + fresnel * 0.5) * pulse;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const Helion3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    scrollProgressRef.current = Math.min(scrollY / heroHeight, 1);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ---- Morphing Sphere (Main Hero Object) ----
    const sphereGeo = new THREE.IcosahedronGeometry(2, 64);
    const sphereMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.35 },
        uNoiseFrequency: { value: 1.5 },
        uColor1: { value: new THREE.Color(0x0a1628) },  // Deep navy
        uColor2: { value: new THREE.Color(0x06b6d4) },  // Cyan
        uColor3: { value: new THREE.Color(0x8b5cf6) },  // Violet
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // ---- Inner Core Glow ----
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 4);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ---- Particle Starfield ----
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Volumetric Light Cones ----
    const createLightCone = (color: number, position: THREE.Vector3, target: THREE.Vector3) => {
      const light = new THREE.SpotLight(color, 3, 20, Math.PI / 6, 0.8, 1);
      light.position.copy(position);
      light.target.position.copy(target);
      scene.add(light);
      scene.add(light.target);
      return light;
    };

    const light1 = createLightCone(0x06b6d4, new THREE.Vector3(5, 4, 4), new THREE.Vector3(0, 0, 0));
    const light2 = createLightCone(0x3b82f6, new THREE.Vector3(-5, -3, 5), new THREE.Vector3(0, 0, 0));
    const light3 = createLightCone(0x8b5cf6, new THREE.Vector3(0, 5, -4), new THREE.Vector3(0, 0, 0));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    // ---- Mouse Parallax ----
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Resize ----
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ---- Animation Loop ----
    let frameId: number;
    let time = 0;
    const baseZ = 5.5;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.008;

      // Update shader uniforms
      sphereMat.uniforms.uTime.value = time;

      // Sphere rotation
      sphere.rotation.y = time * 0.15;
      sphere.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Core counter-rotation
      core.rotation.y = -time * 0.25;
      core.rotation.x = time * 0.2;

      // Particles drift
      particles.rotation.y = time * 0.03;
      particles.rotation.x = Math.sin(time * 0.1) * 0.02;

      // Rotating lights
      const lightRadius = 6;
      light1.position.x = Math.cos(time * 0.5) * lightRadius;
      light1.position.z = Math.sin(time * 0.5) * lightRadius;
      light2.position.x = Math.cos(time * 0.3 + 2) * lightRadius;
      light2.position.z = Math.sin(time * 0.3 + 2) * lightRadius;
      light3.position.y = Math.cos(time * 0.4) * lightRadius;
      light3.position.z = Math.sin(time * 0.4) * lightRadius;

      // Smooth mouse parallax
      targetRotY += (mouseX * 0.3 - targetRotY) * 0.04;
      targetRotX += (-mouseY * 0.2 - targetRotX) * 0.04;
      sphere.rotation.y += targetRotY;
      sphere.rotation.x += targetRotX;

      // Scroll-linked camera zoom
      const scrollProgress = scrollProgressRef.current;
      camera.position.z = baseZ - scrollProgress * 2.5;

      // Fade sphere on scroll
      sphereMat.uniforms.uNoiseStrength.value = 0.35 + scrollProgress * 0.3;
      sphereMat.opacity = 1 - scrollProgress * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [handleScroll]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
