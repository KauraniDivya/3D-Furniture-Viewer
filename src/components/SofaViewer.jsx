import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Environment, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import { TextureLoader, RepeatWrapping } from 'three';
import { Upload, RotateCcw, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Sofa component with texture
function Sofa({ textureUrl }) {
  const meshRef = useRef();
  const texture = textureUrl ? useLoader(TextureLoader, textureUrl) : null;
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping; // Repeat texture for better tiling
    texture.repeat.set(2, 1);
  }

  return (
    <group ref={meshRef} position={[1, 0.43, -5.36]} scale={[2.5, 2.5, 2.5]}>
      {/* Sofa Base/Seat - softer edges and slight tilt */}
      <RoundedBox position={[0, 0.28, 0]} args={[2.9, 0.6, 1.15]} radius={0.12} smoothness={6} rotation={[-0.03, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={texture}
          color={texture ? '#ffffff' : '#f7fafc'}
          roughness={0.9}
          metalness={0}
        />
      </RoundedBox>

      {/* Sofa Back - taller, slightly reclined */}
      <RoundedBox position={[0, 1.05, -0.48]} args={[2.9, 1.05, 0.32]} radius={0.08} smoothness={6} rotation={[0, 0, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={texture}
          color={texture ? '#ffffff' : '#f7fafc'}
          roughness={0.92}
          metalness={0}
        />
      </RoundedBox>

      {/* Removed rolled top for cleaner silhouette */}

      {/* Armrests - curved, slightly flared */}
      <group position={[-1.28, 0.82, -0.12]} rotation={[0, 0, 0.06]}>
        <RoundedBox args={[0.35, 0.85, 0.85]} radius={0.14} smoothness={6} castShadow receiveShadow>
          <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f7fafc'} roughness={0.92} metalness={0} />
        </RoundedBox>
      </group>
      <group position={[1.28, 0.82, -0.12]} rotation={[0, 0, -0.06]}>
        <RoundedBox args={[0.35, 0.85, 0.85]} radius={0.14} smoothness={6} castShadow receiveShadow>
          <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f7fafc'} roughness={0.92} metalness={0} />
        </RoundedBox>
      </group>

      {/* Seat Cushions - chunky and rounded */}
      <RoundedBox position={[-0.68, 0.7, 0.05]} args={[0.8, 0.27, 0.78]} radius={0.09} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f1f5f9'} roughness={0.95} metalness={0} />
      </RoundedBox>
      <RoundedBox position={[0.68, 0.7, 0.05]} args={[0.8, 0.27, 0.78]} radius={0.09} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f1f5f9'} roughness={0.95} metalness={0} />
      </RoundedBox>

      {/* Back Cushions */}
      <RoundedBox position={[-0.68, 1.16, -0.26]} args={[0.72, 0.6, 0.22]} radius={0.06} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f1f5f9'} roughness={0.95} metalness={0} />
      </RoundedBox>
      <RoundedBox position={[0.68, 1.16, -0.26]} args={[0.72, 0.6, 0.22]} radius={0.06} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#f1f5f9'} roughness={0.95} metalness={0} />
      </RoundedBox>

      {/* Bolster pillows */}
      <mesh position={[-1.22, 0.8, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#eaeef3'} roughness={0.95} />
      </mesh>
      <mesh position={[1.22, 0.8, 0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshPhysicalMaterial map={texture} color={texture ? '#ffffff' : '#eaeef3'} roughness={0.95} />
      </mesh>

      {/* Tapered wooden legs */}
      <mesh position={[-1.1, -0.22, 0.42]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 0.42, 16]} />
        <meshStandardMaterial color="#2f2f2f" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[1.1, -0.22, 0.42]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 0.42, 16]} />
        <meshStandardMaterial color="#2f2f2f" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[-1.1, -0.22, -0.42]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 0.42, 16]} />
        <meshStandardMaterial color="#2f2f2f" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[1.1, -0.22, -0.42]} castShadow>
        <cylinderGeometry args={[0.03, 0.06, 0.42, 16]} />
        <meshStandardMaterial color="#2f2f2f" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

// Simple curtains and room elements
function Curtains({ position = [1, 3, -6], width = 8, height = 5 }) {
  const panelWidth = width / 2 - 0.2;
  const gap = 1.2; // push curtains aside so center is clear
  return (
    <group position={position}>
      {/* Left panel */}
      <mesh position={[-panelWidth / 2 - gap, 0, 0]} receiveShadow castShadow>
        <planeGeometry args={[panelWidth, height, 64, 64]} />
        <MeshDistortMaterial color="#e5e7eb" distort={0.18} speed={0.4} roughness={1} />
      </mesh>
      {/* Right panel */}
      <mesh position={[panelWidth / 2 + gap, 0, 0]} receiveShadow castShadow>
        <planeGeometry args={[panelWidth, height, 64, 64]} />
        <MeshDistortMaterial color="#e5e7eb" distort={0.18} speed={0.45} roughness={1} />
      </mesh>
    </group>
  );
}

function Room() {
  const height = 4;
  return (
    <group>
      {/* Floor */}
      <mesh position={[1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[1, height / 2, -6]} receiveShadow>
        <planeGeometry args={[18, height]} />
        <meshStandardMaterial color="#f9fafb" roughness={1} />
      </mesh>

      {/* Side wall */}
      <mesh position={[-8, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[18, height]} />
        <meshStandardMaterial color="#f8fafc" roughness={1} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[1, height, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#f9fafb" roughness={1} />
      </mesh>

      {/* Curtains behind the sofa - right under the ceiling */}
      <Curtains position={[1, height - 0.1, -5.98]} width={10} height={height - 0.4} />
    </group>
  );
}

// Scene component
function Scene({ textureUrl }) {
  return (
    <>
      {/* Environment for soft reflections */}
      <Environment preset="apartment" />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[8, 8, 5]} 
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-6, 6, 6]} intensity={0.6} color="#ffffff" />
      <pointLight position={[5, 2, -5]} intensity={0.4} color="#fbbf24" />

      {/* Room elements */}
      <Room />

      {/* Hero sofa */}
      <Sofa textureUrl={textureUrl} />

      {/* Soft contact shadows for grounding */}
      <ContactShadows position={[1, 0, 0]} opacity={0.18} scale={7} blur={2.2} far={8} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

export default function SofaViewer() {
  const [textureUrl, setTextureUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setTextureUrl(url);
      setFileName(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const resetTexture = () => {
    setTextureUrl(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 text-center border-b border-gray-200 bg-white/80 backdrop-blur-sm"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          3D Sofa Texture Viewer
        </h1>
        <p className="text-gray-600 mt-2">Upload an image to see it as sofa texture</p>
      </motion.div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Controls Panel */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-80 p-6 bg-slate-800 border-r border-slate-700 flex-shrink-0"
        >
          {/* Upload Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload size={20} />
              Upload Texture
            </h3>
            
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                ${isDragging 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto mb-4 text-slate-400" size={32} />
              <p className="text-slate-300">
                {isDragging ? 'Drop image here' : 'Click or drag image here'}
              </p>
              <p className="text-sm text-slate-500 mt-2">PNG, JPG, JPEG supported</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="hidden"
            />

            {fileName && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <p className="text-green-400 text-sm">✓ {fileName}</p>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <button
              onClick={resetTexture}
              disabled={!textureUrl}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Reset Texture
            </button>
            
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Maximize2 size={16} />
                Controls
              </h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Drag to rotate</li>
                <li>• Scroll to zoom</li>
                <li>• Right-click to pan</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 relative"
        >
          <Canvas
            camera={{ position: [5, 3, 5], fov: 60 }}
            className="bg-gradient-to-b from-slate-800 to-slate-900"
            shadows
          >
            <Scene textureUrl={textureUrl} />
          </Canvas>
          
          {!textureUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">🛋️</div>
                <p className="text-xl text-slate-400">Upload an image to get started</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}