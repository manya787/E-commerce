import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import styles from './Collections.module.css'; // Import your CSS module
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import product_0 from '../../assets/images/collection1.jpeg';
import product_1 from '../../assets/images/collection2.webp';
import product_2 from '../../assets/images/collection3.jpg';
import product_3 from '../../assets/images/collection4.jpeg';

const Collections = () => {
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass(styles['blink']); 
        return () => {
            setAnimationClass('');
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const productData = [
      { id: 1, url: product_1, buttonText: "Buy Now", overlayText: "Tables", route: "/Furniture" },
      { id: 2, url: product_0, buttonText: "Buy Now", overlayText: "Womens Dresses", route: "/Fashion" },
      { id: 3, url: product_2, buttonText: "Buy Now", overlayText: "Sofas", route: "/Furniture" },
      { id: 4, url: product_3, buttonText: "Buy Now", overlayText: "Hats", route: "/Fashion" }
  ];
  
  const products = productData.map((item) => (
      <Product
          key={item.id}
          url={item.url}
          buttonText={item.buttonText}
          overlayText={item.overlayText}
          route={item.route}
      />
  ));
  

    return (
        <div className={styles.collection}>
            <h1 className={`${styles.collectionTitle} ${animationClass}`}>Our Collection</h1>
            <Carousel
                responsive={responsive}
                containerClass={styles['carousel-container']}
                itemClass={styles['carousel-item']}
            >
                {products}
            </Carousel>
        </div>
    );
}

export default Collections;
