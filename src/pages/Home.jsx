import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const Balloon = ({ id, color, x, speed, onClick }) => {
    return (
        <motion.div
            initial={{ y: '110vh', x: x }}
            animate={{ y: '-120vh' }}
            transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '70px',
                height: '90px',
                backgroundColor: color,
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1)',
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(id, e.clientX, e.clientY);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Balloon String */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '20px',
                backgroundColor: 'rgba(255,255,255,0.7)'
            }} />

            {/* Shine */}
            <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                width: '10px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: 'rotate(45deg)',
            }} />

            <span style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.5)' }}>?</span>
        </motion.div>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const [balloons, setBalloons] = useState([]);
    const [revealedCount, setRevealedCount] = useState(0);
    const [popPositions, setPopPositions] = useState([]);

    const words = ["HAPPY", "BIRTHDAY", "TO", "YOU!"];
    const isComplete = revealedCount >= words.length;

    useEffect(() => {
        const colors = ['#FF69B4', '#FFD700', '#00BFFF', '#32CD32', '#FF4500', '#9370DB', '#FF1493', '#00FA9A'];

        // Generate balloons continuously
        const interval = setInterval(() => {
            setBalloons(prev => {
                if (prev.length > 15) return prev; // Limit max balloons
                return [...prev, {
                    id: Date.now(),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    x: `${Math.random() * 90}vw`,
                    speed: Math.random() * 5 + 8,
                }];
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const popBalloon = (id, x, y) => {
        setBalloons(prev => prev.filter(b => b.id !== id));

        // Add pop effect
        setPopPositions(prev => [...prev, { x, y, id }]);

        // Reveal next word
        if (revealedCount < words.length) {
            setRevealedCount(prev => prev + 1);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            position: 'relative',
        }}>
            {/* Confetti for each pop */}
            {popPositions.map(pos => (
                <div key={pos.id} style={{ position: 'absolute', left: pos.x, top: pos.y, pointerEvents: 'none' }}>
                    <Confetti
                        numberOfPieces={50}
                        recycle={false}
                        colors={['#FFF', '#FFD700']}
                        confettiSource={{ x: 0, y: 0, w: 0, h: 0 }}
                        initialVelocityX={10}
                        initialVelocityY={10}
                    />
                </div>
            ))}

            {isComplete && <Confetti numberOfPieces={200} recycle={false} />}

            <div style={{
                zIndex: 20,
                textAlign: 'center',
                display: 'flex',
                gap: '20px', // Space between words
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '90vw',
            }}>
                {words.map((word, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: i < revealedCount ? 1 : 0,
                            opacity: i < revealedCount ? 1 : 0,
                            y: i < revealedCount ? 0 : 50
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        style={{
                            fontSize: '4rem',
                            fontFamily: "'Outfit', sans-serif",
                            textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        }}
                    >
                        {word}
                    </motion.div>
                ))}
            </div>

            <motion.p
                animate={{ opacity: isComplete ? 0 : 1 }}
                style={{
                    fontSize: '1.5rem',
                    marginTop: '40px',
                    zIndex: 20,
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    padding: '10px 20px',
                    borderRadius: '20px',
                }}
            >
                {isComplete ? "Yay!" : "Pop the balloons to find the message!"}
            </motion.p>

            {isComplete && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/gallery')}
                    style={{
                        marginTop: '40px',
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        backgroundColor: 'white',
                        color: '#b21f1f',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        zIndex: 20,
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    See Memories 📸
                </motion.button>
            )}

            {balloons.map(b => (
                <Balloon key={b.id} {...b} onClick={popBalloon} />
            ))}
        </div>
    );
};

export default Home;
