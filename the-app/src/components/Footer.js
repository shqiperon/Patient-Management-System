import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-white shadow mt-auto">
      <div className="container text-center">
        <p>&copy; {currentYear} HospitalManagement. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
