import  { useState, useEffect } from 'react';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`back-to-top-button shadow-lg ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop}>
      <i className="bi bi-arrow-up-short "></i>
      </button>
    </div>
  );
}

export default BackToTopButton;