import React, { useState } from 'react';
import settings from '@/setting/settings.json';
import HamburgerIcon from './HamburgerIcon';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {settings.tableOfContents && (
        <button onClick={handleClick} className="flex flex-col justify-center items-center">
          <HamburgerIcon />
        </button>
      )}
      {isOpen && (
        <div>No chapters available at the moment.</div>
      )}
    </div>
  );
}
