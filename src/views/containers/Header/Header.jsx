import { Header as StyledHeader, Logo, HeaderWrapper } from './Header.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton, Container, Grid} from '@mui/material';
import { SpanBold } from '../../../style/settings.styles';

function Header({userName}) {
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
