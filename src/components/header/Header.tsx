"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  LogoImage,
  TabDivider,
  TabsContainer,
  TabsWrapper,
  TabItem,
  TabLabel,
  TabIndicator,
  ProfileContainer,
  ProfileButton,
  ProfileImageContainer,
  ProfileImage,
  DropdownMenu,
  DropdownHeader,
  DropdownTitle,
  DropdownSubtitle,
  DropdownButtons,
  ButtonWrapper,
} from './Header.styles';
import { observer } from 'mobx-react-lite';
import DefaultButton from '../buttons/DefaultButton';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Header: React.FC = observer(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleTabClick = (url: string) => {
    router.push(url);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    setIsDropdownOpen(false);
    router.push('/auth/login');
  };

  const handleRegister = () => {
    setIsDropdownOpen(false);
    router.push('/auth/register');
  };

  const tabs = [
    { label: 'Каталог', url: '/auth' },
    { label: 'Заказы', url: '/orders' },
    { label: 'Избранное', url: '/favorites' },
    { label: 'О нас', url: '/about' },
    { label: 'Контакты', url: '/contacts' },
  ];

  if(pathname === '/auth') return null;
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer onClick={handleLogoClick}>
          <LogoImage 
            src="/vstu-logo.svg" 
            alt="VSTU Logo" 
          />
        </LogoContainer>

        <TabsContainer>
          <TabsWrapper>
             {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <TabItem 
                  $isActive={pathname === tab.url}
                  onClick={() => handleTabClick(tab.url)}
                >
                  <TabLabel $isActive={pathname === tab.url}>{tab.label}</TabLabel>
                  {pathname === tab.url && <TabIndicator />}
                </TabItem>
                
                {index < tabs.length - 1 && <TabDivider />}
              </React.Fragment>
            ))}
          </TabsWrapper>
        </TabsContainer>

        <ProfileContainer ref={dropdownRef}>
          <ProfileButton 
            onClick={handleProfileClick}
            $isOpen={isDropdownOpen}
          >
            <ProfileImageContainer>
              <ProfileImage
                src="/profile.jpg"
                alt="Profile"
              />
            </ProfileImageContainer>
          </ProfileButton>

          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownHeader>
                <DropdownTitle>Аккаунт</DropdownTitle>
                <DropdownSubtitle>Войдите в систему</DropdownSubtitle>
              </DropdownHeader>
              
              <DropdownButtons>
                <ButtonWrapper>
                  <DefaultButton
                    variant="primary"
                    size="medium"
                    onClick={handleLogin}
                    fullWidth
                  >
                    Личный кабинет
                  </DefaultButton>
                </ButtonWrapper>
                
                <ButtonWrapper>
                  <DefaultButton
                    variant="outline"
                    size="medium"
                    onClick={handleRegister}
                    fullWidth
                  >
                    Выход
                  </DefaultButton>
                </ButtonWrapper>
              </DropdownButtons>
            </DropdownMenu>
          )}
        </ProfileContainer>
      </HeaderContent>
    </HeaderContainer>
  );
});

export default Header;