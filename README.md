# POODADAK

![poodadak](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbGQWfY%2FbtrtMJu9wMi%2F4QCd0m9OKz7Xc4LffbUILk%2Fimg.png)

> 당신의 긴박한 급똥신호를 위해... 오늘도 화장실 푸다닥 찾아 드립니다. 대한민국 급똥 세이버, POODADAK!

- Mockup: https://bit.ly/3JII0Fc
- DB Schema Modeling: https://bit.ly/3IIUbQJ
- 기술검증: https://bright-ogre-698.notion.site/c5a09badb6e44d039366164566b6dd76
- 칸반 스케줄: https://bright-ogre-698.notion.site/e1b79a5d3a4f456ca465d476bfd67ef1?v=6ee28039595044a08eed45b90e8abaa9

## 접속방법

- [poodadak.kr](http://poodadak.kr)
- PC, 아이폰, 안드로이드 모두 접속 가능
- 위치공유 동의 진행할 경우 전체기능 사용 가능 / 동의하지 않아도 조망 가능

## 주요 기능

|               전반적인 구동               |                   SOS 보내기                   |                SOS 돕기                |
| :------------------------------: | :-----------------------------------------------: | :----------------------------------: |
| ![all](https://blog.kakaocdn.net/dn/bMAkkq/btrtEwK36lO/gmDRb4WRMayRkGC0yHAKY0/img.gif) | ![SOS](https://blog.kakaocdn.net/dn/Pvvtz/btrtJD3yxMG/xPTcduJEkmSo8lQ8opm4m0/img.gif) | ![Help](https://blog.kakaocdn.net/dn/Uxcr5/btrtGifdfzK/4Mi2Kl3sDSnlRU8akKauek/img.gif) |


- 지도에서 내 주변 화장실을 찾아 줍니다.
- 선택한 화장실까지 도보경로를 안내해 줍니다. (티맵 연동)
- 내 주변 화장실만 리스트로 보여 줍니다.
- 화장실 상세 정보를 볼 수 있습니다.
  - 회원들이 남긴 화장실 리뷰도 열람할 수 있습니다.
- 소셜로그인(카카오, 네이버)을 통해 회원가입할 수 있습니다.
  - 회원은 화장실에서 급한 도움이 필요할 때 SOS를 보낼 수 있습니다.
  - 회원은 SOS 보낸 사람을 발견한다면 도와줄 수 있습니다.
  - SOS 보낸 사람과 도와주는 사람 사이에는 1:1 채팅창이 연결 됩니다.
  - 회원은 화장실 리뷰를 남길 수 있습니다.
  - 회원은 남긴 화장실 리뷰 개수에 따라 회원등급이 부여됩니다.  
(브론즈 > 실버 > 골드)

## 기술 스택
- Node v16.13.2 (latest LTS at 2022.01.28)
- Frontend
    - React
    - React Redux / Redux Toolkit
    - Socket.io-client
    - styled-components
    - Dayjs
    - Axios
    - browser-image-compression
- Backend
    - ExpressJS
    - MongoDB, Mongoose
    - Socket.io
    - jsonwebtoken
- Common
    - Amazon S3
    - eslint
    - prettier
    - husky
- API
    - [Tmap](tmapapi.sktelecom.com)
    - [전국공중화장실표준데이터 API](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012892)
- Test
    - Front: Jest, React Testing library
    - Back: mocha, chai, sinon, supertest
- Deploy
    - Front: Netlify
    - Back: Amazon Elastic Beanstalk, Amazon ****CodePipeline****

## Installation
POODADAK은 배포가 되어 사용가능합니다.
[poodadak.kr](http://poodadak.kr)

### env설정
로컬에서 구동을 원하시는 경우 아래와 같이 .env 파일 설정이 필요합니다.

**1. Frontend**

```
REACT_APP_KAKAO_REST_API_KEY="..."
REACT_APP_NAVER_CLIENT_ID="..."

REACT_APP_KAKAO_REST_API_REDIRECT_URL=http://localhost:3000/login/process
REACT_APP_NAVER_CALLBACK_URL=http://localhost:3000/login/process

REACT_APP_NAVER_STATE="..."

REACT_APP_AXIOS_BASE_URL=http://localhost:8000

REACT_APP_TMAP_APPKEY="..."

```

**2. Backend**

```
DB_URL="..."
TEST_DB_LOCAL_URL=mongodb://127.0.0.1/test

KAKAO_REST_API_KEY="..."
KAKAO_REST_API_REDIRECT_URL=http://localhost:3000/login/process
KAKAO_REST_API_VERIFY_TOKEN_URL=https://kauth.kakao.com/oauth/token
KAKAO_REST_API_FETCH_USER_INFO_URL=https://kapi.kakao.com/v2/user/me
KAKAO_REST_API_FETCH_ADDITIONAL_USER_INFO_URL=https://kauth.kakao.com/oauth/authorize
KAKAO_REST_API_UNLINK_USER_URL=https://kapi.kakao.com/v1/user/unlink
KAKAO_REST_API_CLIENT_SECRET="..."

NAVER_API_CLIENT_ID="..."
NAVER_API_CLIENT_SECRET="..."
NAVER_API_GET_TOKEN_URL=https://nid.naver.com/oauth2.0/token
NAVER_API_GET_USER_INFO_URL=https://openapi.naver.com/v1/nid/me
NAVER_REST_API_UNLINK_USER_URL=https://nid.naver.com/oauth2.0/token

JWT_EXPIRE_TIME=86400000
JWT_SECRET="..."

AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."

CORS_ORIGIN_URL=http://localhost:3000
```

**3. Test**
Test 명령은 front, Back 모두 동일 합니다.

```node
$ npm test
```

## DB 이용하기

다운받은 DB 또는 새로 만든 DB JSON 파일을 mongoDB compass를 이용해 local에 import 하여 사용할 수 있습니다.

**POODADAK DB Guide**

[DB Repository](https://github.com/POODADAK/poodadak-database)에서 POODADAK local 구동 시 필요한 화장실 DB를 다운로드 및 제작할 수 있습니다. Repository에 있는 script파일로 API를 이용하여 공공데이터 포털에 있는 전국공중화장실표준데이터를 JSON파일로 저장할 수 있습니다.

**DB 생성 script**

1. git clone 받기

```
$ git clone https://github.com/POODADAK/poodadak-database.git
```

2. 해당 폴더로 이동

```
$ cd poodadak-database
```

3. module 설치

```
 $ npm install
```

4. 코드 에디터 실행

```
$ code .
```

5. [전국공중화장실표준데이터](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012892) API키 발급.

6. `getToiletInfoForDeploy.js` 파일에 API_KEY 해당 키 입력.

7. script 실행

```
$ node getToiletInfoForDeploy.js
```

8. 동일 폴더에 newKoreaToiletInfo.json 파일 생성.


## 업데이트 내역
깃허브 Pull Request 내역에서 작업내역을 조망할 수 있습니다.

**Frontend**
[Front: Github Pull Request History](https://github.com/POODADAK/poodadak-client/pulls?q=is%3Apr+is%3Aclosed)

**Backend**
[Back: Github Pull Request History](https://github.com/POODADAK/poodadak-server/pulls?q=is%3Apr+is%3Aclosed)

## 이슈 및 해결

**auth & cookie**
- [추후 작성 예정]

**geo data indexing**
- [추후 작성 예정]

**iPhone Browser geolocation**
- https 통신 규격으로 서비스를 배포 후 PC와 Andoid에서는 문제없이 서비스를 사용할 수 있었으나 iOS 브라우저에서는 geolocation 활용 권한에 제약이 생겨 작동하지 않았습니다.
- 논리적 정합성 문제나 의존성, 전반적인 https 규격을 다시 한번 체크하는 등 다양한 시도를 진행했습니다. 초반에 쉽게 풀리지 않았으나 내부적으로 활용하는 Tmap 지도 객체를 https 호출에 응답할 수 있도록 세팅하는 것으로 해결이 완료되었습니다.

**Socket & Redux**
- 소켓을 redux store에 직접 올리는 방식으로 구현했으나 공식문서 등을 통해 적절한 방법이 아니라는 것을 확인하고 개선작업 진행
- middleware를 활용하는 방식으로 해결했습니다.

## 회고 및 개선사항

**업무분담**

초반 기술검토를 진행했던 사람과 실제 구현하는 사람이 달라서 각각의 러닝커브를 감당해야하는 상황이 있었습니다. 모든 팀원이 다양한 방법으로 해당 기술들을 접하는 장점은 있었으나 실제 구현시간이 그만큼 늘어났습니다. 이 시간을 절약할 수 있었다면 보다 더 다양한 시도를 진행할 수 있지 않았을까 하는 아쉬움도 남습니다.

**PWA, Native App**

poodadak.kr은 모바일웹 최적화 방식으로 구현했습니다. 하지만 궁극적으로는 PWA, 더 나아가 Native App 방식으로 서비스 되는 것이 보다 이상적이라고 생각합니다. 시간 제약상 사용자에게 더 효용높은 제공방식으로 진행하지 못한 것이 아쉬웠습니다.

**전국공중화장실표준데이터 API**

API 명세에는 CCTV, 비상벨, 기저귀 교환대 관련 필드가 있어 초반 기획에는 화장실 기타 정보도 사용자에게 노출될 수 있도록 기획했습니다. 그러나 실제로 API를 이용하여 데이터를 받았을 때는 모두 null 값이었고, 공중화장실 및 개방 화장실 정보 최신화도 아쉬웠습니다. 향후 사용자가 화장실 정보를 직접 입력하고, 다른 사람들이 검증 및 공유할 수 있도록 개선한다면 더 좋은 서비스로 거듭날 수 있지 않을까 기대합니다.

**Socket & Redux**

socket.io의 io(url) 연결객체를 어디에 둘지 고민하다 redux store에 serialize하지 못한 정보를 담아 구현했습니다. 이럴 경우 소켓통신 로직과 뷰 렌더링 로직이 혼재되어, 소켓로직을 필요로하는 컴포넌트가 많아질수록 소켓 이벤트 핸들러 추가/삭제와 같은 로직이 여러곳에 산재되어서 관리가 어려워졌습니다. 고민 후 소켓통신 로직을 리덕스 미들웨어로 분리해주었고 소켓로직이 더이상 여러곳에 산재되지않아서 미들웨어 한곳에서만 관리할수 있었습니다.

**Map marker clustering**

최초에는 사용자 위치기반으로 근처 화장실 정보만 제공하고 활용할 수 있도록 제약했으나 2주라는 프로젝트 기간 제약상 위치기반 동의가 없어도 서비스를 이용할 수 있도록 중간에 Business Logic을 변경 했습니다. 이에 따라서 예상치 못하고 지도에 너무 많은 화장실 marker를 찍을 수 밖에 없었는데, 일부만 적용하고 지도 zoom level을 제약하는 방법으로 마무리지은 부분이 아쉬운 점입니다.

## 만든 사람들

- 김단
<danbsns@gmail.com>
- 윤진호
<breezjin@gmail.com>
- 이양우
<ddonhlyw@gmail.com>
