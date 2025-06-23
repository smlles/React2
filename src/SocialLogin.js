import { Navigate } from "react-router-dom";
import { useEffect } from "react";


const SocialLogin = (props) => {
  const getUrlParameter=(name)=>{
    let search = window.location.search; 
    //주소에서 ? 뒤의 쿼리 스트링을 추출
    let params = new URLSearchParams(search);
    //파라미터 추출 Map 형태로 저장
    return params.get(name);
    //해당 이름의 파라미터 반환
  }

  useEffect(()=>{
    const token = getUrlParameter("token");
     console.log("토큰 파싱"+token)

     if(token){
    
    localStorage.setItem("ACCESS_TOKEN",token)
    console.log("로컬스토리지저장",localStorage.getItem("ACCESS_TOKEN"))
    window.location.replace("/");
  }else{
     window.location.replace("/login");
  }

  },[])

  
return <div>로그인 처리 중 .....</div>
 

  
}

export default SocialLogin;