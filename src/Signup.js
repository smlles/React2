import { Container,Grid,Typography,TextField,Button } from "@mui/material";
import { signup } from "./service/ApiService";
import { Link } from "react-router-dom";

function Signup(){

  const handleSubmit =(e)=>{
      e.preventDefault();
      //form태그에 저장된 데이터 가져오기
      const data = new FormData(e.target);
      const username = data.get("username");
      const password = data.get("password");
      
      signup({username:username,password:password})
        .then((response)=>{
          //계정 생성 성공시, login 페이지로 리다이렉트
          window.location.href='/login';
        })
  }

  return(
    <Container component ="main" maxWidth="xs" style={{marginTop:'8%'}} >
      <form noValidate onSubmit={handleSubmit}> {/*버튼 눌렀을 때 호출되는 함수 */}
        <Grid container spacing={2} direction="column"
          align='center'>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" >
              <strong>계정 생성</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete='fname'
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="이메일 주소"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            autoComplete='current-password'
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="비밀번호"
              type='password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' style={{marginTop:'10%'}} >
          <Grid item >
            <Link to ="/login" variant='body2' >
              이미 계정이 있습니까? '로그인 하기'
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Signup;