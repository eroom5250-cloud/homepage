# Vercel 배포

현재 홈페이지는 HTML과 SVG로 구성된 정적 사이트입니다.
프로젝트에 설치된 Vercel CLI로 dist 폴더를 직접 배포합니다.

```powershell
cd C:\Users\eroom\Downloads\test2\all-in-one
powershell -ExecutionPolicy Bypass -File .\vercel.ps1 login
powershell -ExecutionPolicy Bypass -File .\vercel.ps1 preview
powershell -ExecutionPolicy Bypass -File .\vercel.ps1 deploy
```

로그인 명령의 안내에 따라 브라우저에서 본인 계정을 연결합니다.
첫 배포 시 본인 계정 또는 팀을 선택하고 새 프로젝트를 생성합니다.
Framework Preset은 Other, 빌드 명령은 없음, 출력 폴더는 현재 폴더(.)로 선택합니다.
미리보기 주소에서 확인한 뒤 deploy 명령으로 정식 게시합니다.

홈페이지 수정 후 같은 deploy 명령으로 다시 배포할 수 있습니다.
계정 연결 정보가 저장되는 dist/.vercel 폴더를 다른 사람에게 공유하지 마세요.

CLI 배포 안내: https://vercel.com/docs/cli/deploying-from-cli
