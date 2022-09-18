import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { IPInfoType } from '../App';

type TextType = string;
type PopUpButtonType = {
  icon: string,
  text: string,
  ipInfo: IPInfoType | undefined,
  IPAddress: string
}

function MyApp(props: PopUpButtonType) {
  const { enqueueSnackbar } = useSnackbar();
  
  function getIP(toCopy:TextType) {
    console.log(toCopy, props.ipInfo);
    if(props.ipInfo && toCopy=='IP') {
      navigator.clipboard.writeText(props.ipInfo?.ip)

      return 'success';
    } else if(props.ipInfo && props.text=='Location') {
      navigator.clipboard.writeText(`${props.ipInfo?.location?.region}, ${props.ipInfo?.location?.country}`);
      
      return 'success';
    } else if(props.ipInfo && props.text=='Time Zone') {
      navigator.clipboard.writeText(props.ipInfo?.location.timezone)
      
      return 'success';
    } else if(props.ipInfo && props.text=='ISP') {
      navigator.clipboard.writeText(props.ipInfo.isp)
      
      return 'success';
    }
    else {
      return 'error';
    }
  }

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (variant: VariantType, toCopy:TextType) => () => {
    // variant could be success, error, warning, info, or default
    variant = getIP(toCopy);
    {variant == 'error' ? enqueueSnackbar(`Text not copied! Invalid ${props.text} !`, { variant }) : enqueueSnackbar(`${props.text} copied with ${ variant }!`, { variant });}
  };

  return (
    <React.Fragment>
      <Button 
        onClick={handleClickVariant('success', props.text)}
      >
        <img src={props.icon} alt="" />
      </Button>
    </React.Fragment>
  );
}

export function PopUpButton(props: PopUpButtonType) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp icon = {props.icon} text={props.text} ipInfo={props.ipInfo} IPAddress={props.IPAddress} />
    </SnackbarProvider>
  );
}
