import React from 'react';
import { GithubOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <p> @2020 Yi Ren All Rights reserved</p>
      <a href="https://github.com/YIREN1">
        <GithubOutlined />
      </a>
    </div>
  );
}

export default Footer;
