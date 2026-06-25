'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// 將模型獨立成子元件
function Model() {
  const gltf = useLoader(GLTFLoader, '/3d/crown.glb');

  const modelRef = useRef<any>(null);
  // 上下左右漂浮
  useFrame((state) => {
    if (!modelRef.current) return;

    const elapsedTime = state.clock.getElapsedTime();

    modelRef.current.rotation.y += 0.005; // Y 軸自轉

    const baseY = -0.35;
    modelRef.current.position.y = baseY + Math.sin(elapsedTime * 0.8) * 0.08; // 上下漂浮

    // 根據滑鼠位置讓皇冠微微偏轉
    const targetRotationZ = -state.pointer.x * 0.175;
    const targetRotationX = -state.pointer.y * 0.15;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotationX,
      0.05
    );

    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      targetRotationZ,
      0.05
    );
  })

  return <primitive ref={modelRef} object={gltf.scene} scale={24} />;
}

// 燈光組件
function Lights() {
  return (
    <>
      {/* 1. 環境光 */}
      <ambientLight intensity={1.5} />

      {/* 2. 平行光 */}
      <directionalLight position={[0, 5, 12]} intensity={0.2} color="#ffffff" />
      <directionalLight position={[0, -5, -12]} intensity={0.6} color="#ffffff" />
      <directionalLight position={[-5, 2, 10]} intensity={0.8} color="#DACBFF" />
      <directionalLight position={[5, 2, 10]} intensity={0.8} color="#FFCBE2" />

      {/* 3. 環境反射 */}
      <Environment preset="dawn" background={false} backgroundBlurriness={5} environmentIntensity={0.8} />
    </>
  );
}

export default function Crown() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 建立一個狀態來決定目前是否為手機板（預設為 false 避免 SSR 報錯）
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 元件掛載時先執行一次
    handleResize();

    // 監聽視窗大小改變
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background font-serif text-xs text-secondary/40 tracking-widest animate-pulse">
        正在凝聚靈魂空間...
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0 transition">
      <Canvas
        style={{ width: '100vw', height: '100vh' }}

        // 根據 isMobile 三元運算子動態切換相機位置與視野角度
        camera={{
          position: isMobile ? [0, 0.2, 4.5] : [0, 0.4, 4],
          fov: isMobile ? 45 : 45,
        }}
        gl={{
          alpha: true,
          antialias: true
        }}
      >
        {/* 載入燈光 */}
        <Lights />

        {/* 將 Suspense 包裹剛剛建立的 Model 元件 */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* 後製效果 */}
        <EffectComposer>
          <Bloom intensity={0.02} luminanceThreshold={0.2} />
        </EffectComposer>

      </Canvas>

    </div>
  );
}