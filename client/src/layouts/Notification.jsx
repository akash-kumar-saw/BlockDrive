import { useState, useEffect } from 'react';

const notification = ({ message, setUserMessage }) => {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setUserMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 m-4 p-4 flex justify-center rounded-xl shadow-lg shadow-black bg-white text-black font-bold overflow-y-auto ${isVisible ? 'block' : 'hidden'}`}>
      {message}
    </div>
  );
};

export default notification;
