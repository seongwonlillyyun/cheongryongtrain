# 지하철 도착 서비스 웹사이트 - 청룡 열차 

## 🖥️ 프로젝트 소개
저의 개인프로젝트로 서울시에서 제공하는 공공 API를 이용하여 특정 지하철 역에 도착하는 열차들의 정보를 제공하며
사용자들이 쉽게 도착하는 열차의 정보를 얻는 것을 목적으로 제작하였습니다.


## 🕰️ 개발 기간
24.11.07 2025.01.31 - 1차 개발 완료 및 배포 
(추후 피드백을 토대로 개선 할 예정 입니다) 

## 📍배포주소
http://cheongryongtrain.kro.kr/

## ⚙️ 개발 환경
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/GIT-05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">

   
## 📌 주요 기능
- 모바일 최적화 웹
- 검색 결과 필터링 기능 (호선 별, 추후 상행/하행선 추가 예정) 
- 관리자 페이지 구현 (공지사항 업로드 용)

## 🚨 에러 및 해결 방법
=> 자세한 내용은 저의 노션 페이지에서 확인 가능 합니다! 
https://www.notion.so/seongwonlillyyun/Seongwon-Lilly-Yun-270c7a81531044bfbccb635df5911e18?p=14014cf87dd78034be62dc992c22af8b&pm=c
1. 사용자가 입력 후 엔터 키로 검색 가능 하도록 (완료) 
2. 헤더에서 저장된 검색 정보를 전역으로 관리 할 수 있도록 (zustand 이용하여 완료) 
3. 새로고침 후에도 사용자가 선택한 역은 그대로 = > 도착 정보만 새로고침 되도록 (로컬스토리지에 저장하여 완료) 
4. F5 누르면 검색 시간 뜨도록
5. 필터링 (하행/상행 선택, 특정 호선만 보이도록)
6. 검색 후 가끔 호선 색깔 반영 안되는 경우 해결하기
7. 로딩 중 화면 구현하기
8. 사용자의 아이피를 가져와서 관리자인지 아닌지 1차 구분하기 
