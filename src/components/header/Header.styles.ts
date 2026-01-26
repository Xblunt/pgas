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
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 30px;
  margin: 0 auto;
  gap: 32px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export const TabsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
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
  width: 60px;
`;

export const ProfileButton = styled.div<{ $isOpen: boolean }>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  right: 0;
`;

export const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--color-secondary);
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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