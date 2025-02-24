import React, { useState, useEffect, useRef, useCallback } from 'react';

import { AppDispatch } from '@/app/store/store';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import './daumAPI.style.css';

declare global {
  interface Window {
    daum: any;
  }
}

const PostcodeWidget = styled.div`
  &.open {
    position: absolute;
    z-index: 9999;
    background: blue;
  }
`;

interface AddressChangeProps {
  setAddress: (address: string) => void;
}

const AddressChange: React.FC<AddressChangeProps> = ({ setAddress }) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const togglePostcode = useCallback(() => {
    setIsPostcodeOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPostcodeOpen && elementRef.current) {
      window.daum.postcode.load(() => {
        new window.daum.Postcode({
          oncomplete: (data: any) => {
            let fullAddress = data.address;
            const extraAddress = data.extraAddress ? ` (${data.extraAddress})` : '';
            if (data.userSelectedType === 'R') {
              fullAddress += extraAddress;
            }
            setAddress(fullAddress);
            togglePostcode();
          },
          width: '100%',
          height: '100%',
        }).embed(elementRef.current);
      });
    } else if (elementRef.current) {
      elementRef.current.innerHTML = '';
    }
  }, [isPostcodeOpen, setAddress, togglePostcode, dispatch]);

  return (
    <>
      <div className="address-change-container">
        <button className="change-button" onClick={togglePostcode}>
          지역 선택 {'▾'}
        </button>
        <Typography sx={{ fontSize: '12px', color: 'red' }}>수도권과 부산은 하루배송 가능 지역입니다.</Typography>
      </div>
      <PostcodeWidget className={`postcode-widget ${isPostcodeOpen ? 'open' : ''}`} ref={elementRef} />
    </>
  );
};

export default AddressChange;
