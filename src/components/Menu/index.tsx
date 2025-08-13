import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import RouterLink from '../RouterLink';

type AvailableThemes = 'dark' | 'light';
export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <MoonIcon />,
    light: <SunIcon />,
  };
  function handleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event?.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <div className={styles.menu}>
      <RouterLink
        href='/'
        className={styles.menuLink}
        arial-label='Ir para home'
        title='Ir para home'
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href='/history/'
        className={styles.menuLink}
        arial-label='Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href='/settings/'
        className={styles.menuLink}
        arial-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>
      <a
        href='#'
        className={styles.menuLink}
        arial-label='Mudar tema'
        title='Mudar tema'
        onClick={handleTheme}
      >
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}
