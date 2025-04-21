import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Divider from '@mui/material/Divider';
import { Tabs, TabPanel } from 'react-tabs';
import styles from './ProductDetailsContent.module.css';
import ProductReviews from './ProductReviews';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsStart, sendProductIDStart } from '../../features/productDetailslice';
import { addToCartStart } from '../../features/cartslice';
import notificationSound from './notification.mp3';
import { Link } from 'react-router-dom';
const ProductDetailsContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviews = useSelector(state => state.review.reviews);
  const data = useSelector(state => state.productdetail);
  const discounts = useSelector(state => state.discount.discounts);
  const [playNotificationSound, setPlayNotificationSound] = useState(false);

  const theme = useTheme();
  const { product_id } = useParams();
  
  console.log(product_id);
  const placeholderImage = '/placeholder.png'; // Use a placeholder image URL or local public folder image

  const imageFileName = data.selectedProduct && data.selectedProduct.image_path ? data.selectedProduct.image_path : null;

  const backendImageBaseURL = 'http://localhost:3001/productimages/';

  const image1URL = imageFileName ? backendImageBaseURL + encodeURIComponent(imageFileName) : placeholderImage;

  const images = [
    { id: 1, url: image1URL }
  ];

  const productBrand = data?.selectedProduct?.brand;
  const productCondition = data?.selectedProduct?.condition;
  const productDescription = data?.selectedProduct?.description;
  const productName = data?.selectedProduct?.productname;
  const productPrice = data?.selectedProduct?.price;
  const productStatus = data?.selectedProduct?.status;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddToCart = () => {
    const selectedProduct = data?.selectedProduct;

    if (selectedProduct) {
      dispatch(addToCartStart({
        ...selectedProduct,
      }));
      setPlayNotificationSound(true);
    }
  };

  let averageRating = 0;
  if (reviews && reviews.length > 0) {
    const totalRating = reviews.reduce((acc, curr) => {
      return acc + parseInt(curr.rating);
    }, 0);
    averageRating = totalRating / reviews.length;
  }
  averageRating = Math.min(5, averageRating);

  const notificationAudio = new Audio(notificationSound);
  useEffect(() => {
    if (playNotificationSound) {
      notificationAudio.play();
      setTimeout(() => {
        setPlayNotificationSound(false);
      }, 1000);
    }
  }, [playNotificationSound]);

  useEffect(() => {
    if (product_id) {
    dispatch(fetchProductDetailsStart(product_id));
    }
    }, [dispatch, product_id]);

  // Function to calculate discounted price
  const getDiscountedPrice = (price) => {
    const discount = discounts.length > 0 ? discounts[0].amount : 0; // Assuming a single discount for simplicity
    const discountedPrice = price - (price * (discount / 100));
    return discountedPrice.toFixed(2);
  };

  const discountedPrice = getDiscountedPrice(productPrice);

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          p: '25px',
          mb: '15px',
        }}
      >
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
        >
          <Grid item xs={12} md={12} lg={5} xl={5}>
            <Slider className={styles.product_img_slider}
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map(image => (
                <div key={image.id}>
                  <img src={image.url} alt={`Product Image ${image.id}`} style={{ width: '100%' }} />
                </div>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={12} md={12} lg={7} xl={7}>
            <Box>
              <Typography as="h4" fontWeight="500" fontSize="25px" mb="10px" color="#101820">
                {productName}
              </Typography>
              {/* Rating */}
              {averageRating > 0 ? (
                <div className="average-rating">
                  <h4 style={{ color: '#808080', display: 'flex', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(star => {
                      const roundedAverage = Math.round(averageRating);
                      const isColored = star <= roundedAverage;
                      return (
                        <span
                          key={star}
                          style={{ fontSize: '22px', color: isColored ? '#FFBC2B' : '#000000' }}
                        >
                          {isColored ? '★' : '☆'}
                        </span>
                      );
                    })}
                    <Typography as="h4" fontSize="13px" className="ml-1">
                      ({reviews.length} votes)
                    </Typography>
                  </h4>
                </div>
              ) : (
                <div className="average-rating">
                  <h4 style={{ color: '#808080', display: 'flex', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{ fontSize: '22px', color: '#000000' }}
                      >
                        ☆
                      </span>
                    ))}
                    <Typography as="h4" fontSize="13px" className="ml-1">
                      (0 votes)
                    </Typography>
                  </h4>
                </div>
              )}

              {/* Price */}
              <Typography fontSize="18px" fontWeight="500" mb="15px" color="#101820">
                Price:{" "}
                <del
                  style={{
                    fontSize: "12px",
                    color: "#95959d",
                  }}
                  className='mr-5px ml-5px'
                >
                  {/* Update the static price to display the fetched price */}
                 
                </del>{" "}
                {discountedPrice}
              </Typography>

              {/* Description */}
              <Typography fontSize="14px" mb="15px" color="#808080">
                {productDescription}
              </Typography>
              <Typography fontSize="16px" mb="15px" color={productStatus === "out of stock" ? "red" : "#808080"}>
                {productStatus}
              </Typography>
           
              {/* Meta tags */}
              <ul className={styles.metaTagList}>
                <li>
                  <span className={styles.headings}>Brand : {productBrand}</span>
                </li>
                {/* <li>
                  <span className={styles.headings}>Condition :</span>{productCondition}
                </li> */}
              
              </ul>

              {/* Social links */}
              <ul className={styles.socialLink}>
                <li>
                  <span>Share :</span>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebookF}  />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter}  />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faInstagram}  />
                  </a>
                </li>
              </ul>

              {/* Conditionally render buttons based on product status */}
              {productStatus !== "out of stock" && (
                <>
                  {data.selectedProduct && data.selectedProduct.qr_path && (
                    <Box sx={{ mt: 2, mb: 2}}>
                      <Typography variant="body1" sx={{ mb: 1, fontStyle: 'italic', color: '#555' }}>
                      Scan to view this product in AR.
                      </Typography>
                  {(() => {
                    try {
                      return (
                        <img
                          src={require(`../../assets/images/${data.selectedProduct.qr_path}`)}
                          alt="Product QR Code"
                          style={{ width: '150px', height: '150px' }}
                        />
                      );
                    } catch (error) {
                      const placeholderQR = require('../../assets/images/qr16.png');
                      return (
                        <img
                          src={placeholderQR}
                          alt="Placeholder QR Code"
                          style={{ width: '150px', height: '150px' }}
                        />
                      );
                    }
                  })()}
                    </Box>
                  )}
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    startIcon={<ShoppingCartIcon sx={{ color: "#101820 !important" }} />}
                    sx={{
                      p: "10px 25px",
                      color: "#101820 !important",
                      backgroundColor: "#FEE715 !important",
                      marginBottom: '10px',
                    }}
                  >
                    Add To Cart
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Tabs className="product-details-tabs custom-tabs">
            <Divider style={{ backgroundColor: 'gray', marginTop: '50px' }} />
            <TabPanel>
              <ProductReviews />
            </TabPanel>
          </Tabs>
        </Box> 
      </Card>
    </>
  );
};

export default ProductDetailsContent;
