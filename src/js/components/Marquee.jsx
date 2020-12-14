import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Marquee = ({ text }) => {
  useEffect(() => {
    const marquee = document.querySelector('.marquee');
    const para = document.createElement('p');
    para.innerHTML = text;
    marquee.append(para);

    return () => {
      const textMarquee = document.querySelector('.marquee');
      const p = document.querySelector('p');
      textMarquee.removeChild(p);
    };
  }, [text]);

  return (
    <div className="marquee" />
  );
};

Marquee.propTypes = {
  text: PropTypes.string,
};

Marquee.defaultProps = {
  text: '',
};

export default Marquee;
