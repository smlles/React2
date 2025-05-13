//API를 호출하는 주소를 하드코딩 할 수 있지만 실제 도메인을
//사용하는 것을 염두에 두면 좋은 방법은 아니다
//설정파일에서 어플리케이션이 사용할 백엔드 url을 동적으로
//가져오도록 구현해, 이후 도메인이 바뀌는 경우를 대비하자.

let backendHost;

//window : 브라우저에서 실행되는 모든 코드에 접근할 수 있는 최상위 객체
//웹 페이지에서 실행되는 모든 JavaScript는 window객체를 기반으로 동작한다.

//window.location : 현재 웹 페이지의 URL 정보를 다루는 객체

//window.location.hostname : 현재 페이지의 호스트 이름(도메인)을 반환한다.
//호스트이름은 도메인의 이름 부분으로, 프로토콜(http:// 또는 https://),경로
//쿼리스트링을 제외한 부분을 의미한다.
//https://www.example.com/path/page.html
//www.example.com

//왼쪽부터 차례대로 평가하며 false,null,undefined가 나오면 연산을 중단하고
//그 값을 반환한다.
const hostname = window && window.location && window.location.hostname;

//http://loaclhost:10000
//hostname -> localhost
if(hostname == "localhost"){
    backendHost = "http://localhost:10000";
}

export const API_BASE_URL = `${backendHost}`




