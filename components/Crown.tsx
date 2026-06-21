"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

// 內部模型組件
function Model() {
  const localGroupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3d/crown.glb");

  useFrame((state) => {
    if (localGroupRef.current) {
      // Y 軸固定自我旋轉
      localGroupRef.current.rotation.y += 0.005;
      
      // 規律上下漂浮
      localGroupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.08;

      // 根據滑鼠位置讓皇冠微微偏轉
      // state.pointer 的範圍在 -1 到 1 之間
      
      const targetRotationY = state.pointer.x * 0.35;
      const targetRotationX = -state.pointer.y * 0.15;

      localGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        localGroupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      
      // 這裡把自轉加上滑鼠偏轉
      localGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        localGroupRef.current.rotation.z,
        -targetRotationY * 0.5,
        0.05
      );
    }
  });

  return (
    <group ref={localGroupRef}>
      <Center precise>
        <primitive object={scene} scale={24} />
      </Center>
    </group>
  );
}

export default function Crown() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <span className="font-serif text-xs text-secondary/40 tracking-widest animate-pulse">
          正在凝聚靈魂空間...
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-screen mix-blend-multiply opacity-90 transition-opacity duration-1000 animate-fade-in z-0">
      <Canvas 
        camera={{ 
          position: isMobile ? [0, 0.2, 5.5] : [0, 0.2, 4], 
          fov: 45 
        }} 
        gl={{ alpha: true, antialias: true }}
      >
        <Environment preset="dawn" background={false} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 5, 12]} intensity={0.2} color="#ffffff" />
        <directionalLight position={[0, -5, -12]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-5, 2, 10]} intensity={0.8} color="#DACBFF" />
        <directionalLight position={[5, 2, 10]} intensity={0.8} color="#FFCBE2" />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <EffectComposer>
          <Bloom intensity={0.02} luminanceThreshold={0.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}