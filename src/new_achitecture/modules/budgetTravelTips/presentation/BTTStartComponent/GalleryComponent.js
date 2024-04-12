import React, {useState, useEffect} from 'react';
import styles from './GalleryComponent.module.css';
import {itemData} from '../../data/galleryInfo/itemData';

const Gallery = () => {
    const img = itemData.map((item) => item.img);
    const [a, setA] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setA((prevA) => (prevA + 1) % img.length);
        }, 3000); // Adjust the interval duration as per your preference

        return () => {
            clearInterval(interval);
        };
    }, [img.length]);

    const nextImg = () => {
        setA((prevA) => (prevA + 1) % img.length);
    };

    const prevImg = () => {
        setA((prevA) => (prevA - 1 + img.length) % img.length);
    };

    return (
        <div className={styles.gallery}>
            <h2 className={styles.sectionTitle}>The most popular cities</h2>
            <p className={styles.cityDetailsMain}>
                Explore the most popular cities around the world and experience their unique charm and attractions!
            </p>
            <div className={styles.navGallery}>
                <button className={styles.galBut} onClick={prevImg}>
                    {'<'}
                </button>

                <div className={styles.imageContainer}>
                    <img className={styles.image} src={img[a]} alt="town"/>
                </div>

                <button className={styles.galBut} onClick={nextImg}>
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default Gallery;