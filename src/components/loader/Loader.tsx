import React from 'react';
import {
  LoaderWrapper,
  LoaderCircle,
  ContentLoaderWrapper,
  ContentLoaderCircle
} from './Loader.styles';

interface LoaderProps {
  inContetnt?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ inContetnt }) => {
  if (inContetnt) {
    return (
      <ContentLoaderWrapper>
        <ContentLoaderCircle />
      </ContentLoaderWrapper>
    );
  }

  return (
    <LoaderWrapper>
      <LoaderCircle />
    </LoaderWrapper>
  );
};

export default Loader;