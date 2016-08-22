import React from 'react';

const flexCenter = {
  alignItems: 'center',
  justifyContent: 'center',
};

const Loading = () => (
  <div className="mdl-layout mdl-js-layout mdl-color--grey-200" style={flexCenter}>
    <div className="mdl-spinner mdl-js-spinner is-active"></div>
  </div>
);

export default Loading;
