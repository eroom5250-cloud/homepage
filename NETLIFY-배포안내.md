# Netlify 배포

PowerShell에서 이 폴더를 열고 실행합니다.

```powershell
cd C:\Users\eroom\Downloads\test2\all-in-one
powershell -ExecutionPolicy Bypass -File .\netlify.ps1 login
powershell -ExecutionPolicy Bypass -File .\netlify.ps1 preview
powershell -ExecutionPolicy Bypass -File .\netlify.ps1 deploy
```

1. login: 브라우저에서 본인의 Netlify 계정으로 로그인하고 연결을 승인합니다.
2. preview: 첫 배포라면 안내에 따라 새 사이트를 생성하거나 기존 사이트를 선택합니다. 확인용 주소를 받습니다.
3. deploy: 확인한 홈페이지를 정식 주소에 게시합니다. 일반적인 Netlify 정식 사이트는 외부에서 접근할 수 있습니다.

홈페이지를 수정한 뒤에도 deploy 명령으로 다시 게시할 수 있습니다.

## 도구 없이 업로드

https://app.netlify.com/drop 에 로그인한 뒤, 이 폴더의 dist 폴더를 끌어다 놓습니다.
dist 안에는 index.html과 logo.svg가 있습니다.
같이 제공한 all-in-one-netlify.zip은 이 두 파일을 담은 업로드용 압축파일입니다.

## 준비된 구성

- netlify.toml: 게시 폴더를 dist로 지정
- netlify.ps1: 프로젝트에 설치된 Netlify CLI 실행
- package.json 및 pnpm-lock.yaml: 도구 버전 관리
- .gitignore: 계정 연결 정보와 설치 파일을 소스 관리에서 제외

공식 안내: https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/
