import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

    const memories = [
        { id: 1, src: "public/1.jpeg", caption: "❤️" },
        { id: 2, src: "public/2.jpeg", caption: "❤️" },
        { id: 3, src: "public/3.jpeg", caption: "❤️" },
        { id: 4, src: "public/4.jpeg", caption: "❤️" },
        { id: 5, src: "public/5.jpeg", caption: "❤️" },
        { id: 6, src: "public/6.jpeg", caption: "❤️" },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(to bottom, #ff9a9e, #fecfef)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 20px',
            boxSizing: 'border-box',
        }}>
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '3rem',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    marginBottom: '40px'
                }}
            >
                Our Memories 📸
            </motion.h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '1200px',
            }}>
                {memories.map((mem, i) => (
                    <motion.div
                        layoutId={`card-${mem.id}`}
                        key={mem.id}
                        onClick={() => setSelectedId(mem.id)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, rotate: 2, zIndex: 1 }}
                        style={{
                            backgroundColor: 'white',
                            padding: '10px 10px 20px 10px',
                            borderRadius: '5px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            margin: '20px',
                            width: '250px',
                            textAlign: 'center',
                            cursor: 'zoom-in',
                        }}
                    >
                        <motion.div
                            layoutId={`image-${mem.id}`}
                            style={{
                                width: '100%',
                                height: '200px',
                                backgroundColor: '#eee',
                                marginBottom: '10px',
                                overflow: 'hidden',
                                borderRadius: '3px',
                            }}
                        >
                            <motion.img
                                src={mem.src}
                                alt={mem.caption}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                        <motion.p
                            layoutId={`caption-${mem.id}`}
                            style={{
                                fontFamily: "'Indie Flower', cursive, sans-serif",
                                color: '#333',
                                fontSize: '1.2rem',
                                margin: 0
                            }}
                        >
                            {mem.caption}
                        </motion.p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            cursor: 'zoom-out',
                        }}
                    >
                        {memories.filter(m => m.id === selectedId).map(item => (
                            <motion.div
                                layoutId={`card-${item.id}`}
                                key={item.id}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    maxWidth: '90vw',
                                    maxHeight: '90vh',
                                    overflow: 'hidden',
                                }}
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card itself
                            >
                                <motion.div
                                    layoutId={`image-${item.id}`}
                                    style={{
                                        width: '100%',
                                        height: '500px',
                                        maxHeight: '70vh',
                                        marginBottom: '20px',
                                        borderRadius: '5px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <motion.img
                                        src={item.src}
                                        alt={item.caption}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </motion.div>
                                <motion.p
                                    layoutId={`caption-${item.id}`}
                                    style={{
                                        fontFamily: "'Indie Flower', cursive, sans-serif",
                                        color: '#333',
                                        fontSize: '2rem',
                                        textAlign: 'center',
                                        margin: 0
                                    }}
                                >
                                    {item.caption}
                                </motion.p>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: 'transparent',
                                        border: 'none',
                                        fontSize: '2rem',
                                        cursor: 'pointer',
                                        color: '#333',
                                    }}
                                >
                                    &times;
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => navigate('/cake')}
                style={{
                    marginTop: '60px',
                    padding: '15px 40px',
                    fontSize: '1.2rem',
                    backgroundColor: 'white',
                    color: '#ff9a9e',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    zIndex: 10,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Time for Cake! 🎂
            </motion.button>
        </div>
    );
};

export default Gallery;
