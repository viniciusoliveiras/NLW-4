import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

import styles from '../styles/components/DarkModeToggler.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

const lightTheme = {
  '--white': '#fff',
  '--background': '#f2f3f5',
  '--gray-line': '#dcdde0',
  '--text': '#666666',
  '--text-highlight': '#b3b9ff',
  '--title': '#0B5C5E',
  '--red': '#e83f5b',
  '--green': '#4cd62b',
  '--blue': '#1F6163',
  '--blue-dark': '#042A2B',
  '--low-opacity': '#5965e077',
  '--blue-twitter': '#2aa9e0',
};

const darkTheme = {
  '--white': '#15181c',
  '--background': '#000',
  '--gray-line': '#dcdde0',
  '--text': '#ffad1f',
  '--text-highlight': '#7fdbca',
  '--title': 'rgba(231, 242, 251, 0.9)',
  '--red': '#e83f5b',
  '--green': '#4cd62b',
  '--blue': '#D69524',
  '--blue-dark': '#ffad1f',
  '--low-opacity': '#4cd62b77',
  '--blue-twitter': '#2aa9e0',
};

export function DarkModeToggler() {
  const [currentMode, setCurrentMode] = useState('light');
  const [isChecked, setIsChecked] = useState(false);

  const { isDarkMode, setIsDarkMode } = useContext(ChallengesContext);

  useEffect(() => {
    if (Cookies.get('mode') === 'dark') {
      setCurrentMode('dark');
      setIsChecked(true);
    }
  }, []);

  useEffect(() => {
    const theme = currentMode === 'light' ? lightTheme : darkTheme;
    Object.keys(theme).forEach((key) => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentMode]);

  function toggleTheme() {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setIsChecked(!isChecked);
    setCurrentMode(newMode);
    setIsDarkMode(!isDarkMode);
    Cookies.set('mode', newMode);
  }

  return (
    <div onClick={toggleTheme} className={styles.decorationSlash}>
      <div>
        {isChecked ? (
          <img
            src='/icons/moon-regular.svg'
            className={styles.moon}
            alt='Moon'
          />
        ) : (
          <img
            src='/icons/lightbulb-regular.svg'
            className={styles.lightBall}
            alt='Light Ball'
          />
        )}
      </div>
    </div>
  );
}
