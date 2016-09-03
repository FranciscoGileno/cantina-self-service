import React from 'react';
import Center from './Center';
import { Spinner } from 'react-mdl';

const Loading = () => (
  <Center className="mdl-color--grey-200">
    <Spinner />
  </Center>
);

export default Loading;
