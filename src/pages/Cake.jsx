import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Candle = ({ active, onClick }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '24px', // Slightly wider candle
                height: '80px', // Taller candle
                background: 'linear-gradient(to bottom, #fff, #e0e0e0)',
                borderRadius: '4px',
                margin: '0 25px', // Increased spacing
                cursor: 'pointer',
                boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.1)',
            }}
            onClick={onClick}
        >
            {/* Wick */}
            <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '10px',
                backgroundColor: '#333',
            }} />

            {/* Flame */}
            {active && (
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [-2, 2, -2],
                        opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '-35px', // Adjusted position
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px', // Slightly larger flame
                        height: '35px',
                        background: 'radial-gradient(ellipse at 50% 80%, #ffff00 20%, #ff4500 80%, transparent 100%)',
                        borderRadius: '50% 50% 20% 20%',
                        boxShadow: '0 0 20px #ff4500, 0 0 40px #ffff00', // More glow
                        filter: 'blur(0.5px)',
                    }}
                />
            )}
        </div>
    );
};

const Cake = () => {
    const [candles, setCandles] = useState([true, true, true, true, true]);
    const [allOut, setAllOut] = useState(false);
    const navigate = useNavigate();

    const toggleCandle = (index) => {
        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);
    };

    useEffect(() => {
        if (candles.every(c => !c)) {
            setAllOut(true);
        }
    }, [candles]);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: 'radial-gradient(circle, #2b1055, #7597de)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {allOut && (
                <>
                    <Confetti
                        numberOfPieces={800} // Increased volume
                        recycle={false}
                        confettiSource={{ x: 0, y: window.innerHeight, w: 10, h: 10 }}
                        initialVelocityX={25} // Slightly more spread
                        initialVelocityY={45}
                        gravity={0.4} // Slower fall
                    />
                    <Confetti
                        numberOfPieces={800} // Increased volume
                        recycle={false}
                        confettiSource={{ x: window.innerWidth, y: window.innerHeight, w: 10, h: 10 }}
                        initialVelocityX={-25}
                        initialVelocityY={45}
                        gravity={0.4}
                    />
                </>
            )}

            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '3rem', marginBottom: '80px' }}
            >
                {allOut ? "Make a Wish!" : "Blow out the candles!"}
            </motion.h1>

            <div style={{ position: 'relative', marginTop: '50px' }}>
                {/* Candles Container */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '-80px', // Adjusted for taller candles
                    width: '100%',
                    zIndex: 10,
                }}>
                    {candles.map((isActive, i) => (
                        <Candle key={i} active={isActive} onClick={() => toggleCandle(i)} />
                    ))}
                </div>

                {/* Cake Body */}
                <div style={{
                    width: '450px', // Bigger cake
                    height: '220px', // Taller cake
                    backgroundColor: '#f8b195',
                    borderRadius: '20px 20px 10px 10px',
                    position: 'relative',
                    boxShadow: '0 10px 0 #c06c84',
                }}>
                    {/* Icing Drips */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '60px',
                        background: 'linear-gradient(to bottom, #fff 50%, transparent 50%)',
                        backgroundSize: '50px 60px', // Larger drips
                        borderRadius: '20px 20px 0 0',
                    }} />

                    {/* Middle Layer */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: '100%',
                        height: '30px',
                        backgroundColor: '#c06c84',
                        opacity: 0.5,
                    }} />
                </div>

                {/* Plate */}
                <div style={{
                    width: '550px', // Bigger plate
                    height: '30px',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                    marginTop: '10px',
                    marginLeft: '-50px',
                    boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
                }} />
            </div>

            {allOut && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={() => navigate('/wishes')}
                    style={{
                        marginTop: '80px',
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        backgroundColor: 'white',
                        color: '#2b1055',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    Read Wishes 💌
                </motion.button>
            )}
        </div>
    );
};

export default Cake;
