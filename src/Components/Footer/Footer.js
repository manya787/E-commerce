import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon
} from 'mdb-react-ui-kit';
import styles from './Footer.module.css';
import { connect } from 'react-redux';
import { fetchDataStart} from '../../features/getproductslice';
import { Link } from 'react-router-dom';


const Footer = ({ dispatch }) => {
  const handleLinkClick = (category) => {
    dispatch(fetchDataStart({ category }));
  };
  const handlesubcategory = (category) => {
    dispatch(fetchDataStart({ subcategory: category }));
  
  };
  
  return (
    <MDBFooter className={`${styles.textCenter} ${styles.textLgStart}`}>
      <section className={`footer-section d-flex justify-content-center justify-content-lg-between p-4 border-bottom ${styles.footerSection}`}>
        <div className='me-5 d-lg-flex align-items-center'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href='' className='me-4 text-reset' >
            <MDBIcon fab icon="facebook-f" size="1x"/>
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" size="1x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" size="1x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" size="1x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" size="1x" />
          </a>
        </div>
      </section>
      <section className={`footer-section-content ${styles.footerSectionContent}`}>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className={`footer-section-item mx-auto mb-4 ${styles.footerSectionItem}`}>
              <h6  className={`text-uppercase fw-bold mb-4 ${styles.footerheading}`} >
                <MDBIcon icon="gem" className="me-3" />
                About Us
              </h6>
              <p>
              Welcome to ARShop, where we blend fashion and furniture with cutting-edge AR technology, letting you preview products in real time before you buy. Smart, stylish, and immersive shopping right at your fingertips.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className={`footer-section-item mx-auto mb-4 ${styles.footerSectionItem}`}>
              <h6  className={`text-uppercase fw-bold mb-4 ${styles.footerheading}`}>Products</h6>
              <p>
              <Link to='/Furniture' className='text-reset' onClick={() => handleLinkClick('furniture')}>
               Furniture 
              </Link>

              </p>
              <p>
              <Link to='/Fashion' className='text-reset' onClick={() => handleLinkClick('fashion')}>
               Fashion
              </Link>

              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className={`footer-section-item mx-auto mb-4 ${styles.footerSectionItem}`}>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.footerheading}`}>Category</h6>
              <p>
              <Link to={`/Category/furniture`} className='text-reset' onClick={() => handlesubcategory('furniture')}>
               Sofas
               </Link>
              </p>
              <p>
              <Link to={`/Category/furniture`} className='text-reset' onClick={() => handlesubcategory('furniture')}>
               Tables
               </Link>
              </p>
              <p>
              <Link to={`/Category/fashion`} className='text-reset' onClick={() => handlesubcategory('fashion')}>
               Hats
               </Link>
              </p>
              <p>
              <Link to={`/Category/fashion`} className='text-reset' onClick={() => handlesubcategory('fashion')}>
               Women Dresses
               </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className={`footer-section-item mx-auto mb-4 ${styles.footerSectionItem}`}>
              <h6  className={`text-uppercase fw-bold mb-4 ${styles.footerheading}`}>Get Help</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Noida, Uttar Pradesh
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                ARShop@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className={`footer-section text-center p-4 ${styles.footerSection}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2025 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Manya and Aryan
        </a>
      </div>
    </MDBFooter>
  );
};

export default connect()(Footer);
