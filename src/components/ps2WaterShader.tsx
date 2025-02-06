import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SceneRef {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

const PS2CloudBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef>(null);
  const timeRef = useRef<number>(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    (mountRef.current as HTMLDivElement).appendChild(renderer.domElement);

    // Create multiple cloud layers with different properties
    const createCloudLayer = (yPos: number, scale: number, speed: number) => {
      const geometry = new THREE.PlaneGeometry(40, 40, 32, 32); // Increased size
      const material = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            // Create more varied and fuller wave patterns
            float wave1 = sin(modelPosition.x * 0.8 + time * 0.2) * 0.4;
            float wave2 = sin(modelPosition.z * 0.6 + time * 0.15) * 0.4;
            float wave3 = cos(modelPosition.x * 0.4 + time * 0.1) * 0.3;
            float wave4 = cos(modelPosition.z * 0.7 + time * 0.18) * 0.3;
            
            float elevation = (wave1 + wave2 + wave3 + wave4) * 1.2;
            modelPosition.y += elevation;
            vElevation = elevation;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          // Improved noise function for more natural-looking clouds
          float noise(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            float bands = 8.0;
            vec3 cloudColor = vec3(0.6, 0.4, 0.7);      // Purple-tinted
            vec3 darkCloudColor = vec3(0.6, 0.4, 0.5);  // Light base
            vec3 highlightColor = vec3(0.7, 0.7, 0.75); // Light grey
            
            // Create multiple layers of noise for more complex patterns
            vec2 distortedUV = vUv;
            distortedUV.x += sin(vUv.y * 2.0 + time * 0.2) * 0.3;
            distortedUV.y += cos(vUv.x * 1.8 + time * 0.15) * 0.3;
            
            float largeScale = noise(distortedUV * 2.0 + time * 0.1);
            float mediumScale = noise(distortedUV * 4.0 - time * 0.15);
            float smallScale = noise(distortedUV * 8.0 + time * 0.2);
            
            // Combine noise patterns for more natural cloud shapes
            float noisePattern = largeScale * 0.5 + mediumScale * 0.3 + smallScale * 0.2;
            noisePattern = noisePattern * 0.8 + 0.2; // Ensure minimum brightness
            
            // Create fuller cloud pattern
            float cloudPattern = smoothstep(0.2, 0.8, noisePattern + vElevation * 0.5);
            cloudPattern = mix(0.4, 1.0, cloudPattern);
            cloudPattern = floor(cloudPattern * bands) / bands;
            
            // Mix colors with enhanced volume
            vec3 finalColor = mix(darkCloudColor, cloudColor, cloudPattern);
            finalColor = mix(finalColor, highlightColor, noisePattern * 0.4);
            finalColor = max(finalColor, vec3(0.4));
            finalColor = floor(finalColor * bands) / bands;
            
            // Adjust opacity for more volume
            float alpha = smoothstep(0.2, 0.8, cloudPattern);
            alpha = floor(alpha * bands) / bands;
            alpha = alpha * 0.9 + 0.1; // Ensure minimum opacity
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        uniforms: {
          time: { value: 0 }
        },
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const cloud = new THREE.Mesh(geometry, material);
      cloud.rotation.x = -Math.PI / 2;
      cloud.position.y = yPos;
      return { mesh: cloud, material };
    };

    // Create more layers of clouds at different heights
    const cloudLayers = [
      createCloudLayer(0, 1.2, 1.0),   // Bottom layer
      createCloudLayer(2, 1.0, 0.8),   // Middle layer
      createCloudLayer(4, 0.8, 1.2),   // Upper layer
      createCloudLayer(1, 1.5, 0.6),   // Fill layer 1
      createCloudLayer(3, 0.9, 0.9),   // Fill layer 2
      createCloudLayer(5, 0.7, 1.1),   // Top layer
    ];

    cloudLayers.forEach(layer => scene.add(layer.mesh));

    // Position camera to see more of the clouds
    camera.position.set(0, 3, 4);
    camera.lookAt(0, 2, 0);

    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      timeRef.current += deltaTime * 0.15; // Slower movement for more dreamy effect
      
      // Update all cloud layers
      cloudLayers.forEach(layer => {
        layer.material.uniforms.time.value = timeRef.current;
      });
      
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate(0);
    sceneRef.current = { scene, camera, renderer } as SceneRef;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        (mountRef.current as HTMLDivElement).removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameRef.current);
      cloudLayers.forEach(layer => {
        layer.mesh.geometry.dispose();
        layer.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default PS2CloudBackground;