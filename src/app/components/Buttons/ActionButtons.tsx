import { ReactNode } from 'react';

import { Box, Button, SxProps, useTheme } from '@mui/material';

type ActionButtonsProps = {
  names: string[];
  handleOnClick: (name: string) => void;
  disabledButtons?: (name: string) => boolean;
  icons?: { [key: string]: { component: ReactNode; style?: object } };
  style?: SxProps;
};

const ActionButtons = (props: ActionButtonsProps) => {
  const { names, handleOnClick, disabledButtons, icons = {}, style } = props;
  const theme = useTheme();
  return (
    <>
      {names.map((name, index) => {
        const iconData = icons[name];
        let buttonStyle;
        if (name === '바로구매') {
          buttonStyle = { ...style, border: `2px solid ${theme.palette.primary.main}` };
        } else {
          buttonStyle = { ...style };
        }
        return (
          <Button
            key={index}
            sx={{ ...buttonStyle }}
            variant={name === '장바구니' ? 'contained' : 'outlined'}
            color={name === '장바구니' ? 'primary' : 'inherit'}
            onClick={() => handleOnClick(name)}
            disabled={disabledButtons ? disabledButtons(name) : false}
            startIcon={iconData ? <Box sx={{ ...iconData.style, display: 'flex', justifyContent: 'center' }}>{iconData.component}</Box> : null}>
            {name}
          </Button>
        );
      })}
    </>
  );
};

export default ActionButtons;
