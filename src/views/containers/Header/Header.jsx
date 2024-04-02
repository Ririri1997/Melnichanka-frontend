import { Header as StyledHeader, Logo, HeaderWrapper } from './Header.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton, Container, Grid} from '@mui/material';
import { SpanBold } from '../../../style/settings.styles';
import { useEffect, useState } from 'react';
import axios from "axios";

function Header() {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const datafetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');

      const {data} = await axios.get('http://127.0.0.1:8000/api/v1/users/edit/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      setUserName(data.full_name)
      } catch(error){
        console.log(error);
      }
    }
    datafetchData();
  }, [] );
  return (
    <StyledHeader>
      <Container maxWidth="lg"> 
        <HeaderWrapper>
          <Logo src="./img/logo.png" alt="logo"/>
          <Grid display="flex" alignItems="center" item sx={{ marginLeft: 'auto' }}>
            <SpanBold style={{ marginRight: '8px' }}>{userName}</SpanBold>
            <IconButton aria-label="delete" href="/logout" >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Grid>
        </HeaderWrapper>
      </Container>
    </StyledHeader>
  );
}

export default Header;
