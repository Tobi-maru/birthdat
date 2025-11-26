import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WishCard = ({ name, message, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '15px',
                margin: '15px',
                width: '300px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
            }}
        >
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '10px' }}>"{message}"</p>
            <h3 style={{ textAlign: 'right', fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>- {name}</h3>
        </motion.div>
    );
};

const Wishes = () => {
    const navigate = useNavigate();

    const wishes = [
        { name: "Samaksh", message: "Happy Birthday to the one constant in my life. Thank you for being real, being supportive, and being you. I’m truly blessed to have a best friend like you.\n\nTo my best friend: May this year bring you endless happiness, growth, and all the success you deserve. I’ll always be cheering for you.\n\nHappy Birthday! No matter how life changes, you’ll always be my person, my comfort, and my forever friend." },

    ];

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 20px',
            color: 'white',
            boxSizing: 'border-box',
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}
            >
                Wishes for You ✨
            </motion.h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '1200px',
            }}>
                {wishes.map((wish, i) => (
                    <WishCard key={i} {...wish} delay={i * 0.2} />
                ))}
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => navigate('/')}
                style={{
                    marginTop: '50px',
                    padding: '15px 30px',
                    backgroundColor: 'transparent',
                    border: '2px solid rgba(255,255,255,0.5)',
                    color: 'white',
                    borderRadius: '30px',
                    cursor: 'pointer',
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.05 }}
            >
                Back to Start ↺
            </motion.button>
        </div>
    );
};

export default Wishes;
