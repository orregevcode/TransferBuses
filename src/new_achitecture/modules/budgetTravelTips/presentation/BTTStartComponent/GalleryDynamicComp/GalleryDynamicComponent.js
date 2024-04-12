import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {itemData} from '../itemData';
import styles from './GalleryDynamicComponent.module.css';
import React from "react";

function GalleryDynamicComponent() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.sectionTitle}>The most popular cities</h2>
            <p className={styles.cityDetailsMain}>Explore the most popular cities around the world and experience their
                unique charm and attractions!</p>
            <Slider {...settings}>
                {itemData.map((itemData, index) => (
                    <div className={styles.image} key={index}>
                        <img src={itemData.img} alt={itemData.title}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default GalleryDynamicComponent;
