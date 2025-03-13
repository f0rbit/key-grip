"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CubeState {
  mesh: THREE.Mesh;
  rotationAxis: THREE.Vector3;
  rotationSpeed: number;
  orbitAxis: THREE.Vector3;
  orbitSpeed: number;
  orbitRadius: number;
  startPosition: THREE.Vector3;
}

interface SceneState {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cubes: CubeState[];
  light: THREE.SpotLight;
  time: number;
}

const CubeEffect: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneState | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const initializeScene = () => {
    if (!mountRef.current) return;

    // Clear any existing scene
    if (sceneRef.current) {
      cleanup();
    }

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/photos/inverted_ep1_art.png');
    
    // Create cubes
    const cubes: CubeState[] = [];
    const numCubes = 30;

    for (let i = 0; i < numCubes; i++) {
      const size = (1 + Math.random() * 3) * 2;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
        metalness: 0.3
      });

      const cube = new THREE.Mesh(geometry, material);
      
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const startPosition = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      cube.position.copy(startPosition);

      const rotationAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      const orbitAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      const cubeState: CubeState = {
        mesh: cube,
        rotationAxis,
        rotationSpeed: (Math.random() * 0.2 + 0.1) * 0.3,
        orbitAxis,
        orbitSpeed: (Math.random() * 0.1 + 0.05) * 0.3,
        orbitRadius: radius,
        startPosition: startPosition.clone()
      };
      
      cubes.push(cubeState);
      scene.add(cube);
    }

    // Lighting setup
    const spotLight = new THREE.SpotLight(0xffffff, 4);
    spotLight.position.set(15, 15, 15);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 1.5;
    spotLight.distance = 100;
    spotLight.castShadow = true;
    
    const rimLight = new THREE.SpotLight(0xffffff, 2);
    rimLight.position.set(-15, -15, -15);
    rimLight.angle = Math.PI / 8;
    rimLight.penumbra = 0.1;
    rimLight.decay = 2;
    rimLight.distance = 50;
    scene.add(rimLight);
    
    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      cubes,
      light: spotLight,
      time: 0
    };

    return rimLight; // Return rimLight for cleanup
  };

  const cleanup = () => {
    if (!sceneRef.current || !mountRef.current) return;

    const { renderer, cubes, scene } = sceneRef.current;
    
    // Dispose of all meshes and materials
    cubes.forEach(({ mesh }) => {
      scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    
    // Dispose of renderer
    renderer.dispose();
    
    // Remove canvas
    if (renderer.domElement && mountRef.current.contains(renderer.domElement)) {
      mountRef.current.removeChild(renderer.domElement);
    }

    sceneRef.current = null;
  };

  useEffect(() => {
    setIsMounted(true);
    const rimLight = initializeScene();

    let animationFrame: number;
    const animate = () => {
      if (!sceneRef.current) return;

      const { cubes, light, renderer, scene, camera } = sceneRef.current;
      sceneRef.current.time += 0.016;
      const time = sceneRef.current.time;

      // Light animation
      light.position.x = Math.sin(time * 0.2) * 20;
      light.position.z = Math.cos(time * 0.2) * 20;
      light.position.y = 15 + Math.sin(time * 0.15) * 10;
      
      if (rimLight) {
        rimLight.position.x = -Math.sin(time * 0.3) * 15;
        rimLight.position.z = -Math.cos(time * 0.3) * 15;
        rimLight.position.y = -10 + Math.cos(time * 0.2) * 8;
      }

      // Update cubes
      cubes.forEach(cubeState => {
        const { mesh, rotationAxis, rotationSpeed, orbitAxis, orbitSpeed, startPosition } = cubeState;
        
        const spinMatrix = new THREE.Matrix4();
        spinMatrix.makeRotationAxis(rotationAxis, rotationSpeed * time);
        mesh.setRotationFromMatrix(spinMatrix);

        const orbitMatrix = new THREE.Matrix4();
        orbitMatrix.makeRotationAxis(orbitAxis, orbitSpeed * time);
        const orbitPosition = startPosition.clone();
        orbitPosition.applyMatrix4(orbitMatrix);
        mesh.position.copy(orbitPosition);
      });

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animate();
    }

    const handleResize = () => {
      if (!sceneRef.current) return;
      
      const { renderer, camera } = sceneRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      cleanup();
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <div 
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default CubeEffect;