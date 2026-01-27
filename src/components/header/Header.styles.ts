import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  background: var(--color-toned);
  border-bottom: 1px solid var(--color-primary);
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    height: 70px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 30px;
  margin: 0 auto;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 16px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const TabsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TabsWrapper = styled.div`
  display: flex;
  background: var(--color-toned);
  border-radius: 8px;
  padding: 8px;
`;

export const TabItem = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: ${props => props.$isActive ? 'var(--color-primary)' : 'transparent'};

  &:hover {
    background: var(--color-primary);
  }
`;

export const TabLabel = styled.div<{ $isActive: boolean }>`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isActive ? 'var(--color-white)' : 'var(--color-primary)'};
  transition: color 0.2s ease;

  ${TabItem}:hover & {
    color: var(--color-white);
  }
`;

export const TabDivider = styled.div`
  width: 2px;
  height: 24px;
  background-color: var(--color-primary);
  opacity: 0.3;
  align-self: center;
  margin: 0 -2px;
`;

export const TabIndicator = styled.div`
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: var(--color-white);
  border-radius: 2px;
`;

export const ProfileContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ProfileButton = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  padding: 8px;

  ${({ $isOpen }) => $isOpen && css`
    background: rgba(38, 49, 69, 0.06);
  `}

  &:hover {
    background: rgba(38, 49, 69, 0.06);
  }
`;

export const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;


  svg {
    width: 20px;
    height: 20px;
  }
`;

export const MobileProfileActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--color-white);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  min-width: 280px;
  z-index: 1001;
  padding: 20px;
`;

export const DropdownHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const DropdownTitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
`;

export const DropdownSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-secondary);
`;

export const DropdownButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 1002;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 3px;
    background-color: var(--color-primary);
    border-radius: 2px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform-origin: left center;
      ${({ $isOpen }) => $isOpen && css`
        transform: rotate(45deg) translateY(-2px);
      `}
    }
    
    &:nth-child(2) {
      opacity: 1;
      ${({ $isOpen }) => $isOpen && css`
        opacity: 0;
      `}
    }
    
    &:nth-child(3) {
      transform-origin: left center;
      ${({ $isOpen }) => $isOpen && css`
        transform: rotate(-45deg) translateY(2px);
      `}
    }
  }
`;

export const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  display: flex;
`;

export const MobileMenuOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1101;
`;

export const MobileMenuContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85%;
  background: var(--color-white);
  z-index: 1102;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease;

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 16px;
  border-bottom: 1px solid var(--color-primary);
`;

export const MobileMenuCloseButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;

  span {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary);
    border-radius: 1px;
    
    &:nth-child(1) {
      transform: rotate(45deg);
    }
    
    &:nth-child(2) {
      transform: rotate(-45deg);
    }
  }
`;

export const MobileTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex: 1;
  overflow-y: auto;
`;

export const MobileTabItem = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isActive ? 'var(--color-toned)' : 'transparent'};
  border-left: 4px solid ${props => props.$isActive ? 'var(--color-primary)' : 'transparent'};

  &:hover {
    background: var(--color-toned);
  }

  .active-indicator {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
  }
`;

export const MobileTabLabel = styled.div<{ $isActive: boolean }>`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: ${props => props.$isActive ? '700' : '500'};
  color: ${props => props.$isActive ? 'var(--color-primary)' : 'var(--color-primary)'};
`;

export const MobileProfileSection = styled.div`
  padding: 20px 16px;
  border-top: 1px solid var(--color-primary);
  background: var(--color-toned);

  .profile-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

export const MobileProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`;

export const MobileProfileName = styled.div`
  font-family: var(--fontfamily);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 4px;
`;

export const MobileProfileSubtitle = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-secondary);
`;

export const MobileProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(38, 49, 69, 0.06);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const MobileLogoutButton = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(38, 49, 69, 0.06);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;