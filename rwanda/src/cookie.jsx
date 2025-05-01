import React, { useEffect, useState } from 'react';
import './cookie.css'; 
// import { motion } from "framer-motion";

// function FadeInBox() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       Hello, I'm animated!
//     </motion.div>
//   );
// }

function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };
  

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <p>🍪 We use cookies to improve your experience. By using this site, you accept our cookie policy.</p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}

export default CookieConsent;
