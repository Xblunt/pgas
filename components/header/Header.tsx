import React, { useState, useRef, useEffect } from 'react';
import {
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  HeaderTabs,
  HeaderTab,
  HeaderProfile,
  ProfileImage,
  ProfileDropdown,
  ProfileDropdownItem,
  LogoutButton,
  ProfileInfo
} from './Header.styles';
import { observer } from 'mobx-react-lite';
import { DefaultButton } from '../buttons/DefaultButton/DefaultButton';

export const Header: React.FC = observer(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Если пользователь не авторизован или на странице авторизации - не показываем хедер
  if (!authStore.isAuthenticated || location.pathname === '/auth') {
    return null;
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleTabClick = (url: string) => {
    navigate(url);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileNavigate = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    authStore.logout();
    navigate('/auth');
  };

  // Определяем табы в зависимости от роли пользователя
  const getTabs = () => {
    const baseTabs = [
      { label: 'Главная', url: '/' },
    ];

    if (authStore.user?.role === 'admin') {
      return [
        ...baseTabs,
        { label: 'Админка', url: '/admin' },
        { label: 'Пользователи', url: '/admin/users' },
        { label: 'Статистика', url: '/admin/stats' },
      ];
    }

    if (authStore.user?.role === 'manager') {
      return [
        ...baseTabs,
        { label: 'Заказы', url: '/orders' },
        { label: 'Клиенты', url: '/clients' },
        { label: 'Отчеты', url: '/reports' },
      ];
    }

    // Для обычного пользователя
    return [
      ...baseTabs,
      { label: 'Каталог', url: '/catalog' },
      { label: 'Заказы', url: '/orders' },
      { label: 'Избранное', url: '/favorites' },
    ];
  };

  const tabs = getTabs();
  const userImage = authStore.user?.imageUrl || '/default-profile.png';
  const userName = authStore.user?.name || 'Пользователь';

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo onClick={handleLogoClick}>
          <img src="/logo.png" alt="Logo" width={50} height={50} />
        </HeaderLogo>
        
        <HeaderTabs>
          {tabs.map((tab, index) => (
            <HeaderTab key={index} $isActive={location.pathname === tab.url}>
              <DefaultButton
                variant={location.pathname === tab.url ? 'primary' : 'outline'}
                size="small"
                onClick={() => handleTabClick(tab.url)}
              >
                {tab.label}
              </DefaultButton>
            </HeaderTab>
          ))}
        </HeaderTabs>
        
        <HeaderProfile ref={dropdownRef}>
          <ProfileImage
            src={userImage}
            alt="Profile"
            onClick={handleProfileClick}
          />
          
          {isDropdownOpen && (
            <ProfileDropdown>
              <ProfileInfo>{userName}</ProfileInfo>
              <ProfileDropdownItem onClick={handleProfileNavigate}>
                Личный кабинет
              </ProfileDropdownItem>
              <LogoutButton>
                <DefaultButton
                  variant="primary"
                  size="medium"
                  onClick={handleLogout}
                  fullWidth
                >
                  Выйти
                </DefaultButton>
              </LogoutButton>
            </ProfileDropdown>
          )}
        </HeaderProfile>
      </HeaderContent>
    </HeaderContainer>
  );
});