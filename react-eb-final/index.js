// React 정적 웹사이트를 ElasticBeanStalk같은 Node.js 환경에서 배포하기 위한 서버 코드
const express = require('express'); //Express 모듈을 불러와서 express라는 이름으로 사용
const path = require('path');//파일의 경로나 디렉토리 경로를 OS에맞게 안전하게 조합 할 수 있게 해준다.

const app = express(); //express 객체 생성 ,get() ,use(), listen()메서드 사용 가능
const port = process.env.PORT || 8080; //설정한 포트가 있으면 쓰고 없으면 8080

app.use(express.static(path.join(__dirname, 'build')));
//build  폴더 안의 정적 파일을 자동으로 서빙

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); //사용자가 어떤 경로로 들어와도 index.html 리턴
//React Router같은 SPA(Single Page Application)는 
//브라우저 URL로 라우팅을 하기 때문에, 
// 서버는 항상 index.html을 리턴해야한다
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});//실제 서버를 지정한 포트에서 실행
