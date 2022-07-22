<p><img src="https://firebasestorage.googleapis.com/v0/b/elice-cfd-253f0.appspot.com/o/images%2Fteam6.jpg?alt=media&token=a9370269-cd13-4463-b0b3-298e7b9ca88a" width="1000px" /></p>
![license](https://img.shields.io/badge/license-CFD-blue)


# :computer: Community For Developers

**개발자를 위한 커뮤니티 입니다.**
<br /><br />

## :memo: 서비스 소개
- 개발자를 위한 커뮤니티 플랫폼입니다.
- 포트폴리오를 작성하고 공유하며 자신을 어필할 수 있습니다.
- QnA게시판을 이용하여 다른 개발자들과 질의응답을 할 수 있습니다.
<br /><br />

## :memo: 디렉토리 구조
```
community-for-developers
├─ back-end
│  ├─ src
│  │  ├─ db
|  |  |  ├─ models
│  │  │  └─ schemas
|  |  |     └─ joi-schemas
│  │  |
│  │  ├─ interfaces
│  │  ├─ middlewares
│  │  ├─ routers
│  │  ├─ services
│  │  └─ utils
│  │
├─ front-end
│  ├─ .swc\plugins\v2
│  ├─ actions
│  ├─ components
│  │  ├─ Common
│  │  ├─ CreatePortfolio
│  │  ├─ Editor
│  │  ├─ PageLayout
│  │  ├─ Portfolo
│  │  ├─ Questions
│  │  ├─ Sign
│  │  └─ UserProfile
│  │
│  ├─ config
│  ├─ hooks
│  ├─ pages
│  │  ├─ login
│  │  ├─ portfolio
│  │  ├─ profile
│  │  ├─ qna
│  │  └─ signup
│  │
│  ├─ public
│  │  └─ images
│  │
│  ├─ reducers
│  ├─ store
│  └─ styles
```

## :memo: 기능 및 구현 상세
```
- 유저
    - 회원가입
        - 소셜 로그인 -> Oauth [Github,Kakao]
        - 이메일 인증 -> Nodemailer [Gmail SMTP]
    - 로그인
        - access token, refresh token [Jwt]
        - Cookie
    - 로그아웃
    - 회원정보 수정
    - 회원탈퇴
        - soft delete
    - 프로필 조회
    - 작성한 포트폴리오 조회
    - 스크랩한 포트폴리오 조회
    - 질문 글 조회
    - 답변 글 조회
- 포트폴리오
    - 포트폴리오 조회
        - infinite scroll
    - 포트폴리오 작성
      포트폴리오 수정
        - editor.js
        - 이미지 업로드 -> Multer & Firebase storage
    - 포트폴리오 삭제
- QnA
    - QnA 작성
      QnA 수정
        - editor.js
        - 이미지 업로드 -> Multer & Firebase storage
    - QnA 삭제
```
<br />

## :memo: 기술 스택
- **Front-End**
    - Next JS
    - Redux Toolkit
    - CSS AntDesign/Emotions
- **Back-End**
    - Express/Typescript
    - MongoDB
    - Firebase


## 결과물
- 사진첨부예정

## 링크 (api 혹은 회의록 같은거?)


## :memo: 팀원 및 역할
| 이름 | 포지션 | 업무 |
| ------ | ------ | ------ |
| 이준서 | FE | ------ |
| 지의신 | FE | ------ |
| 이형민 | FE | ------ |
| 김태준 | BE | ------ |
| 김용민 | BE | ------ |
