import React, { useRef, useState, useEffect } from 'react';
import {
  Props,
} from './types';
import Assets from '../../assets';
import './index.css';
import { Typography } from '@material-ui/core';

const ImageField: React.FC<Props> = (props) => {
  const [image, setImage] = useState<File | string | null>(props.value);
  useEffect(() => {
    setImage(props.value);
  }, [
    props.value,
  ])
  const inputRef = useRef(null);
  return (
    <div
      onClick={() => {
        if (inputRef.current) {
          (inputRef.current as any).click();
        }
      }}
      className="ImageField"
    >
      <input
        type="file"
        accept="image/png,image/jpeg"
        style={{
          display: 'none',
        }}
        ref={inputRef}
        onChange={(value) => {
          if (value.target.files && value.target.files[0]) {
            props.setValue(value.target.files[0]);
            const reader = new FileReader();
            reader.onload = function (e) {
              if (inputRef.current && e.target) {
                setImage(e.target.result as any);
              }
            };
            reader.readAsDataURL(value.target.files[0]);
          }
        }}
      />
      <img
        src={image ? image : Assets.Images.uploadPlaceholder}
        alt=""
      />
      {
        props.error && (
          <Typography
            color="error"
            variant="caption"
            style={{
              margin: '8px 14px 0 14px',
            }}
          >{props.error}</Typography>
        )
      }
    </div>
  );
};

export default ImageField;