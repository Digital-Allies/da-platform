import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import heroImage from '../assets/hero.png';
import './Lobby.css';

// Room data with hotspot positions (% from top-left)
const ROOMS = [
  {
    id: 'cs',
    name: 'Clinical Skills',
    icon: '👥',
    color: '#3B82F6',
    perc_left: 13,
    perc_top: 47,
    desc: 'Communication, empathy, and de-escalation for every patient interaction.',
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliance',
    icon: '🔒',
    color: '#06B6D4',
    perc_left: 27,
    perc_top: 57,
    desc: 'PHI, the privacy rule, and the habits that keep patient data safe.',
  },
  {
    id: 'compliance',
    name: 'Compliance',
    icon: '✓',
    color: '#8B5CF6',
    perc_left: 47,
    perc_top: 43,
    desc: 'Laws, fraud/waste/abuse, and the ethics that keep care honest.',
  },
  {
    id: 'records',
    name: 'Medical Records',
    icon: '📋',
    color: '#EC4899',
    perc_left: 65,
    perc_top: 55,
    desc: 'EHR, documentation standards, and reading a record with confidence.',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '$',
    color: '#F59E0B',
    perc_left: 79,
    perc_top: 47,
    desc: 'Revenue cycle, billing, and collections done accurately and fairly.',
  },
];

export interface LobbyProps {
  userName: string;
}

export const Lobby: React.FC<LobbyProps> = ({ userName }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heroRef = React.useRef<HTMLDivElement>(null);

  // 1. Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x / rect.width - 0.5) * 18;
    const moveY = (y / rect.height - 0.5) * 18;
    setMousePos({ x: moveX, y: moveY });
  };

  const selectedRoomData = ROOMS.find((r) => r.id === selectedRoom);

  // Animation variants
  const heroVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  // 2. Floating animation (subtle 2-3px bounce, 4s loop)
  const floatingVariants: Variants = {
    animate: {
      y: [0, -3, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // 3. Hotspot hover glow (spring physics)
  const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  // 4. Pop-out card slide in (cubic-bezier)
  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, x: -48, transition: { duration: 0.2 } },
  };

  // 5. Tile pop-out with perspective
  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.72,
      rotateY: -8,
      perspective: '900px',
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
    },
    exit: { opacity: 0, scale: 0.72, transition: { duration: 0.2 } },
  };

  // 6. Room entry/exit transition (fade with lift)
  const lobbyVariants: Variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
    hidden: { opacity: 0, y: 10, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      className="lobby"
      variants={lobbyVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Welcome Header Overlay */}
      <div className="lobby__header-overlay">
        <h1 className="lobby__welcome-title">Welcome, {userName}!</h1>
        <p className="lobby__welcome-subtitle">Step Inside. Step Up.</p>
      </div>

      {/* Hero Section with Hotspots */}
      <motion.section
        ref={heroRef}
        className="lobby__hero"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        <motion.div
          className="lobby__hero-background"
          style={{
            backgroundImage: `url(${heroImage})`,
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        >
          {/* Hotspot Overlays */}
          {ROOMS.map((room) => {
            const isSelected = selectedRoom === room.id;
            const left = `${room.perc_left}%`;
            const top = `${room.perc_top}%`;

            return (
              <div key={room.id} className="lobby__hotspot-wrapper" style={{ left, top }}>
                {/* Glow Ring (3. spring animation) */}
                <motion.div
                  className="lobby__glow-ring"
                  style={{ backgroundColor: room.color }}
                  variants={glowVariants}
                  initial="hidden"
                  animate={isSelected ? 'visible' : 'hidden'}
                />

                {/* Floating Hotspot Button (2. floating 4s loop) */}
                <motion.button
                  className="lobby__hotspot"
                  style={{ backgroundColor: room.color }}
                  variants={floatingVariants}
                  animate="animate"
                  onMouseEnter={() => setSelectedRoom(room.id)}
                  onMouseLeave={() => setSelectedRoom(null)}
                  onClick={() => setSelectedRoom(room.id)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="lobby__hotspot-icon">{room.icon}</span>
                </motion.button>

                {/* Room Label (slide in on hover) */}
                <motion.div
                  className="lobby__hotspot-label"
                  style={{ color: room.color }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={
                    isSelected
                      ? { opacity: 1, y: 0, transition: { duration: 0.2 } }
                      : { opacity: 0, y: 8 }
                  }
                >
                  {room.name}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Overlay when room selected */}
      {selectedRoom && (
        <motion.div
          className="lobby__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setSelectedRoom(null)}
        />
      )}

      {/* Pop-Out Card (4. slide in from left, 5. tile pop-out) */}
      {selectedRoomData && (
        <motion.div
          className="lobby__popout-container"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{ hidden: { pointerEvents: 'none' }, visible: { pointerEvents: 'auto' } }}
        >
          <motion.div className="lobby__popout-card" variants={cardVariants}>
            <button
              className="lobby__popout-close"
              onClick={() => setSelectedRoom(null)}
            >
              ✕
            </button>

            <div className="lobby__popout-content">
              <motion.div className="lobby__popout-tile" variants={tileVariants}>
                <div
                  className="lobby__popout-tile-inner"
                  style={{ backgroundColor: selectedRoomData.color }}
                >
                  <span className="lobby__popout-tile-icon">{selectedRoomData.icon}</span>
                </div>
              </motion.div>

              <div className="lobby__popout-info">
                <h2 className="lobby__popout-title">{selectedRoomData.name}</h2>
                <p className="lobby__popout-desc">{selectedRoomData.desc}</p>

                {/* Progress ring (6. spring animation) */}
                <motion.div
                  className="lobby__progress-ring"
                  initial={{ strokeDasharray: '0 565' }}
                  animate={{ strokeDasharray: '283 565' }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={selectedRoomData.color}
                      strokeWidth="3"
                      strokeDasharray="283 565"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="lobby__progress-text">50%</div>
                </motion.div>

                <motion.button
                  className="lobby__btn-primary"
                  style={{ backgroundColor: selectedRoomData.color }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enter Room
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
