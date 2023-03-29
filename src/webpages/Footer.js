import React from 'react';
import { Home, Mail, Phone, Facebook, Twitter, Google, YouTube } from '@mui/icons-material';
import { Box, Typography, Link, Stack, IconButton } from '@mui/material';


const j = () => {

  return (
      <footer>
        <div className="footer-head">
          <div className="footer-head-text-icon ">
            <ul className='box-social'>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-fb-icon'><Facebook/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-tw-icon'><Twitter/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-gg-icon'><Google/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-yt-icon'><YouTube/></span></a></li>
            </ul>
          </div>
        </div>        
        <div>
          <h3>Contact us</h3>
          <span style={{display:'flex'}}><Mail className='footer-contact-icon'/>Email: info@bookstore.com</span>
          <span style={{display:'flex'}}><Phone className='footer-contact-icon'/>Phone: +1 (123) 456-7890</span>
          
        </div>
      </footer>
  );
};

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#302C2C',
        color: "#C9C4C4",
        padding: '1rem',
        width: '100%',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton href="https://www.youtube.com">
          <YouTube />
        </IconButton>
        <IconButton href="https://www.facebook.com">
          <Facebook />
        </IconButton>
        <IconButton href="https://www.twitter.com">
          <Twitter />
        </IconButton>
      </Stack>
      <Typography variant="body2" sx={{ marginTop: '1rem' }}>
        Contact us:
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: '0.5rem' }}>
        <Phone />
        <Link href="tel:+1234567890" color="inherit">
          <Typography variant="body2">(123) 456-7890</Typography>
        </Link>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Mail />
        <Link href="mailto:example@example.com" color="inherit">
          <Typography variant="body2">example@example.com</Typography>
        </Link>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Home />
        <Typography variant="body2">1, Le Duan, Q1, TP.HCM</Typography>
      </Stack>      
    </Box>
  );
}

export default Footer;
