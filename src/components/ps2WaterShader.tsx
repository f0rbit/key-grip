import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Types
type SceneRef = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

type CloudLayer = {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  speed: number;
}

type LayerConfig = {
  yPosition: number;
  scale: number;
  speed: number;
  baseColor: [number, number, number];
}

// Constants for each layer - adjusted for more cloud-like colors
const CLOUD_LAYERS: LayerConfig[] = [
  { yPosition: -2, scale: 2.0, speed: 0.8, baseColor: [0.55, 0.59, 0.72] },  // Medium blue-gray
  { yPosition: 0, scale: 1.8, speed: 1.2, baseColor: [0.45, 0.48, 0.62] },   // Blue-slate
  { yPosition: 2, scale: 1.5, speed: 0.9, baseColor: [0.49, 0.55, 0.61] },   // Steel blue
  { yPosition: 4, scale: 1.6, speed: 1.1, baseColor: [0.52, 0.57, 0.70] },   // Light navy
  { yPosition: 6, scale: 1.4, speed: 1.3, baseColor: [0.48, 0.52, 0.65] },   // Blue-gray
  { yPosition: 8, scale: 1.7, speed: 0.7, baseColor: [0.53, 0.60, 0.67] }    // Slate gray
];

// Enhanced vertex shader for more dynamic movement
const VERTEX_SHADER = /* glsl */ `
  uniform float time;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Enhanced wave patterns for more cloud-like movement
    float wave1 = sin(modelPosition.x * 0.4 + time * 0.3) * 0.6;
    float wave2 = sin(modelPosition.z * 0.3 + time * 0.25) * 0.5;
    float wave3 = cos(modelPosition.x * 0.5 + time * 0.2) * 0.4;
    float wave4 = cos(modelPosition.z * 0.6 + time * 0.28) * 0.5;
    
    float elevation = (wave1 + wave2 + wave3 + wave4) * 1.5;
    modelPosition.y += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float time;
  uniform vec3 baseColor;
  varying vec2 vUv;
  varying float vElevation;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    float bands = 8.0;  // Reduced bands for more defined layers
    vec3 cloudColor = baseColor;
    vec3 darkCloudColor = baseColor * 0.7;  // Darker shadows
    vec3 highlightColor = vec3(
      min(baseColor.r + 0.25, 0.7),  // Limited maximum brightness
      min(baseColor.g + 0.25, 0.7),
      min(baseColor.b + 0.25, 0.7)
    );
    
    vec2 distortedUV = vUv;
    distortedUV.x += sin(vUv.y * 3.0 + time * 0.2) * 0.4;
    distortedUV.y += cos(vUv.x * 2.8 + time * 0.15) * 0.4;
    
    float largeScale = noise(distortedUV * 1.5 + time * 0.1);
    float mediumScale = noise(distortedUV * 3.0 - time * 0.15);
    float smallScale = noise(distortedUV * 6.0 + time * 0.2);
    
    float noisePattern = largeScale * 0.5 + mediumScale * 0.35 + smallScale * 0.15;
    noisePattern = noisePattern * 0.9 + 0.1;
    
    float cloudPattern = smoothstep(0.3, 0.7, noisePattern + vElevation * 0.4);
    cloudPattern = mix(0.5, 1.0, cloudPattern);
    cloudPattern = floor(cloudPattern * bands) / bands;
    
    vec3 finalColor = mix(darkCloudColor, cloudColor, cloudPattern);
    finalColor = mix(finalColor, highlightColor, noisePattern * 0.25);
    finalColor = max(finalColor, baseColor * 0.5);
    finalColor = floor(finalColor * bands) / bands;
    
    float alpha = smoothstep(0.2, 0.8, cloudPattern);
    alpha = mix(0.1, 0.4, alpha);  // Keep alpha values in a safe range
    alpha = alpha * (0.7 + noisePattern * 0.3);  // Vary opacity with noise pattern
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const PS2CloudBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef | null>(null);
  const timeRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Scene setup
    const setupScene = (): SceneRef => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        85,  // Wider FOV for more immersive feel
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current?.appendChild(renderer.domElement);

      // Initial camera position
      camera.position.set(0, 3, 4);
      camera.lookAt(0, 3, -10);  // Looking forward through the clouds

      return { scene, camera, renderer };
    };

    // Cloud layer creation
    const createCloudLayer = (layerConfig: LayerConfig): CloudLayer => {
      const geometry = new THREE.PlaneGeometry(60 * layerConfig.scale, 60 * layerConfig.scale, 32, 32);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          time: { value: 0 },
          baseColor: { value: new THREE.Vector3(...layerConfig.baseColor) }
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.7
      });

      const cloud = new THREE.Mesh(geometry, material);
      cloud.rotation.x = -Math.PI / 2;
      cloud.position.y = layerConfig.yPosition;
      return { mesh: cloud, material, speed: layerConfig.speed };
    };

    // Initialize scene
    const { scene, camera, renderer } = setupScene();
    sceneRef.current = { scene, camera, renderer };

    // Create cloud layers
    const cloudLayers = CLOUD_LAYERS.map(createCloudLayer);
    cloudLayers.forEach(layer => scene.add(layer.mesh));

    // Animation
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      timeRef.current += deltaTime * 0.2;

      // Camera movement
      const cameraY = 3 + Math.sin(timeRef.current * 0.2) * 0.5; // Gentle vertical movement
      const cameraX = Math.sin(timeRef.current * 0.15) * 2; // Slight horizontal sway
      
      camera.position.y = cameraY;
      camera.position.x = cameraX;
      camera.position.z -= deltaTime * 2; // Forward movement
      
      // Look-at point moves with camera but slightly ahead
      camera.lookAt(cameraX, cameraY, camera.position.z - 10);
      
      cloudLayers.forEach((layer, index) => {
        layer.material.uniforms.time.value = timeRef.current * layer.speed;
        // Reposition clouds when camera passes them
        if (layer.mesh.position.z - camera.position.z > 30) {
          layer.mesh.position.z -= 120; // Move cloud to back
        }
        layer.mesh.position.z += deltaTime * (2 + index * 0.2); // Different speeds for parallax
      });
      
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;
      
      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);

      cloudLayers.forEach(layer => {
        layer.mesh.geometry.dispose();
        layer.material.dispose();
      });

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default PS2CloudBackground;