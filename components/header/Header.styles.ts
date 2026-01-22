import styled, { css } from 'styled-components';

export const HeaderContainer = styled.header`
  background: var(--color-white);
  border-bottom: 3px solid var(--color-secondary);
  height: 90px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;
  max-width: 1440px;
  margin: 0 auto;
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const HeaderTabs = styled.nav`
  display: flex;
  gap: 16px;
`;

export const HeaderTab = styled.div<{
  $isActive: boolean;
}>`
  button {
    ${props => props.$isActive && css`
      background: var(--color-primary);
      color: var(--color-white);
      border: none;
    `}
  }
`;

export const HeaderProfile = styled.div`
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s ease;
  object-fit: cover;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: var(--color-white);
  border: 2px solid var(--color-primary);
  border-radius: 0;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  padding: 16px;
`;

export const ProfileInfo = styled.div`
  font-family: var(--fontfamily);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(38, 48, 69, 0.1);
  text-align: center;
`;

export const ProfileDropdownItem = styled.div`
  font-family: var(--fontfamily);
  font-size: 14px;
  color: var(--color-primary);
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 8px;
  text-align: center;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(38, 48, 69, 0.1);
    border: 2px solid var(--color-primary);
  }
`;

export const LogoutButton = styled.div`
  margin-top: 8px;
`;