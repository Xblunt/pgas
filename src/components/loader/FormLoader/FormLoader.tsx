import React from 'react';
import { FormLoaderCircle, FormLoaderWrapper } from './FormLoader.styles';

const FormLoader: React.FC = () => {
  return (
    <FormLoaderWrapper>
      <FormLoaderCircle />
    </FormLoaderWrapper>
  );
};

export default FormLoader;