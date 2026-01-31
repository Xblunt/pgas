"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ProfileIcon,
  DropdownMenu,
  DropdownHeader,
  DropdownTitle,
  DropdownSubtitle,
  DropdownButtons,
  ButtonWrapper,
  MobileMenuButton,
  MobileMenuContainer,
  MobileMenuOverlay,
  MobileMenuContent,
  MobileMenuHeader,
  MobileMenuCloseButton,
  MobileTabsContainer,
  MobileTabItem,
  MobileTabLabel,
  MobileProfileSection,
  MobileProfileInfo,
  MobileProfileName,
  MobileProfileSubtitle,
  MobileProfileIcon,
  MobileLogoutButton,
  MobileProfileActions,
} from "./Header.styles";
import { observer } from "mobx-react-lite";
import DefaultButton from "../buttons/DefaultButton";
import { usePathname, useRouter } from "next/navigation";
import { ButtonSize, ButtonVariant } from "@/models/types";
import { useStores } from "@/hooks/useStores";

const profileIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="var(--color-primary)" stroke-width="2"/>
  <path d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21" stroke="var(--color-primary)" stroke-width="2"/>
</svg>
`;

const logoutIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 16L20 12L15 8" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 12H9" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const Header: React.FC = observer(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { authStore } = useStores();

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleTabClick = (url: string) => {
    router.push(url);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    authStore.logout();
    router.replace("/auth");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileProfileClick = () => {
    router.push("/profile");
  };

  const handleMobileLogoutClick = () => {
    setIsMobileMenuOpen(false);
    authStore.logout();
    router.replace("/auth");
  };

  const tabs = [
    { label: "Категории", url: "/admin/category" },
    { label: "Рейтинг", url: "/admin/raiting" },
    { label: "Пользователи", url: "/user" },
  ];

  if (pathname === "/auth") return null;

  const hasTabs = tabs.length > 0;

  return (
      <>
        <HeaderContainer>
          <HeaderContent>
            <LogoContainer onClick={handleLogoClick}>
              <LogoImage src="/vstu-logo.svg" alt="VSTU Logo" />
            </LogoContainer>

            {hasTabs && (
                <TabsContainer>
                  <TabsWrapper>
                    {tabs.map((tab, index) => (
                        <React.Fragment key={index}>
                          <TabItem $isActive={pathname === tab.url} onClick={() => handleTabClick(tab.url)}>
                            <TabLabel $isActive={pathname === tab.url}>{tab.label}</TabLabel>
                            {pathname === tab.url && <TabIndicator />}
                          </TabItem>

                          {index < tabs.length - 1 && <TabDivider />}
                        </React.Fragment>
                    ))}
                  </TabsWrapper>
                </TabsContainer>
            )}

            <ProfileContainer ref={dropdownRef}>
              <ProfileButton onClick={handleProfileClick} $isOpen={isDropdownOpen}>
                <ProfileIcon dangerouslySetInnerHTML={{ __html: profileIcon }} />
              </ProfileButton>

                  {isDropdownOpen && (
                      <DropdownMenu>
                        <DropdownHeader>
                          <DropdownTitle>Аккаунт</DropdownTitle>
                          <DropdownSubtitle>Управление профилем</DropdownSubtitle>
                        </DropdownHeader>

                        <DropdownButtons>
                          <ButtonWrapper>
                            <DefaultButton variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM} onClick={handleProfile} fullWidth>
                              Личный кабинет
                            </DefaultButton>
                          </ButtonWrapper>

                          <ButtonWrapper>
                            <DefaultButton variant={ButtonVariant.OUTLINE} size={ButtonSize.MEDIUM} onClick={handleLogout} fullWidth>
                              Выход
                            </DefaultButton>
                          </ButtonWrapper>
                        </DropdownButtons>
                      </DropdownMenu>
                  )}
                </ProfileContainer>

            {!hasTabs && (
                <MobileProfileActions>
                  <MobileProfileIcon onClick={handleMobileProfileClick} dangerouslySetInnerHTML={{ __html: profileIcon }} />
                  <MobileLogoutButton onClick={handleMobileLogoutClick} dangerouslySetInnerHTML={{ __html: logoutIcon }} />
                </MobileProfileActions>
            )}

            {hasTabs && (
                <MobileMenuButton onClick={handleMobileMenuToggle} $isOpen={isMobileMenuOpen}>
                  <span></span>
                  <span></span>
                  <span></span>
                </MobileMenuButton>
            )}
          </HeaderContent>
        </HeaderContainer>

        {hasTabs && isMobileMenuOpen && (
            <MobileMenuContainer ref={mobileMenuRef}>
              <MobileMenuOverlay onClick={handleMobileMenuToggle} />
              <MobileMenuContent>
                <MobileMenuHeader>
                  <MobileMenuCloseButton onClick={handleMobileMenuToggle}>
                    <span></span>
                    <span></span>
                  </MobileMenuCloseButton>
                </MobileMenuHeader>

                <MobileTabsContainer>
                  {tabs.map((tab, index) => (
                      <MobileTabItem key={index} $isActive={pathname === tab.url} onClick={() => handleTabClick(tab.url)}>
                        <MobileTabLabel $isActive={pathname === tab.url}>{tab.label}</MobileTabLabel>
                      </MobileTabItem>
                  ))}
                </MobileTabsContainer>

              <MobileProfileSection>
                <MobileProfileInfo>
                  <MobileProfileName>Аккаунт</MobileProfileName>
                  <MobileProfileSubtitle>Управление профилем</MobileProfileSubtitle>
                </MobileProfileInfo>

                <div className="profile-buttons">
                  <DefaultButton 
                    variant={ButtonVariant.PRIMARY} 
                    size={ButtonSize.MEDIUM} 
                    onClick={handleProfile}
                    fullWidth
                  >
                    Личный кабинет
                  </DefaultButton>
                  <DefaultButton 
                    variant={ButtonVariant.OUTLINE} 
                    size={ButtonSize.MEDIUM} 
                    onClick={handleLogout}
                    fullWidth
                  >
                    Выход
                  </DefaultButton>
                </div>
              </MobileProfileSection>
            </MobileMenuContent>
          </MobileMenuContainer>
        )}
      </>
  );
});

export default Header;
