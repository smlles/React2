import {useState, useEffect} from 'react'
import logo from './logo.svg';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography} from '@mui/material'
import {call, signout} from './service/ApiService'

//Container
//레이아웃의 가로 폭을 제한하고, 중앙 정렬 및 기본 패딩을 자동으로 적용해주는 컴포넌트

//주요 props
//maxWidth : 최대 너비를 지정(xs,sm,md,lg,xl,false)
//fixed : maxWidth와 관계없이 항상 고정폭 적용


function App() {

  //하나의 할 일을 객체로 관리할 것이다.
  //{id, title, done}
  const [items, setItems] = useState([])
  const [loading, setLoading] =useState(true);

  //최초 렌더링시 1번만 실행
  useEffect(() => {
    //조회
    call("/todo","GET")
      .then(result => { // 해서 결과값을 받았으면 (그래서 result)
        setItems(result);
        setLoading(false)})
  },[]);

  const add = (item) => {
    //데이터베이스에 추가하기 위해 백엔드로 데이터를 전달
    //call메서드의 호출 결과는 결국 Promise이기 때문에 .then을 이어서 쓸 수 있다.
    call("/todo","POST",item)
    //데이터를 추가하고, 전체 데이터를 반환받아서 state에 세팅을 하여
    //다시 렌더링이 일어남
      .then(result => setItems(result.data))
  }

  //삭제를 해주는 deleteItem()함수 만들기
  //delete from 테이블 where id=0;
  const deleteItem = (item) => {
    call("/todo","DELETE",item)
      .then(result => setItems(result.data))
  }


  const editItem = (item) => {
    call("/todo","PUT",item)
      .then(result => setItems(result.data))
  }

    //react는 key속성에 들어있는 값을 참고해서, 리스트의 요소가 변경될 경우
    //어떤 요소가 변경되었는지 빠르게 파악할 수 있다.
    const todoItems = items?.length > 0 && 
      //Paper컴포넌트
      //종이 같은 표면 효과를 제공하는 컨테이너 컴포넌트
      //elevation(그림자깊이)를 통해 높낮이를 표현하고
      //배경색과 그림자 효과로 콘텐츠를 돋보이게 한다.
      <Paper style={{margin: 16}}>
         <List>{/*일련의 항목을 세로로 나열하는 컨테이너 역할 */}
          {items.map((item) => (
            <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
          ))}
        </List>
      </Paper>
// const resetTodo = ()=>{setItems([])};
//네비게이션 바
let navigationBar=(
  <AppBar position="static">
    <Toolbar>
      <Grid justifyContent="space-between" container sx={{flexGrow :1}}>
        <Typography variant='h6'>오늘의 할 일</Typography>
      </Grid>
      {/* <Grid item>
        <Button color='inherit' raised onClick={resetTodo}>
          새로고침
        </Button>
      </Grid> */}
      <Grid item>
        <Button color='inherit' raised onClick={signout}>
          로그아웃
        </Button>
      </Grid>
    </Toolbar>
  </AppBar>
)
//로딩중이 아닐 때 렌더링 할 것
let todoListPage =(
  <div>
      <Container maxWidth="md">
        {navigationBar}
        {/* AddTodo에 add함수를 전달  {add : function add(item) {~} */}
        <AddTodo add={add} />
        {todoItems}
      </Container>
    </div>
)

//로딩중일 때 렌더링 할 부분
let loadingPage = <h1>로딩 중...</h1>
let content = loadingPage;

if(!loading){
  content = todoListPage;
}
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
