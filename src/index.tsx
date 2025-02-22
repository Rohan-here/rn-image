import React from 'react';
import { Image } from 'react-native';

const RNImage = () => {
  return (
    <Image
      source={{
        uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
      }}
      style={{ width: 100, height: 100 }}
    />
  );
};

export default RNImage;
