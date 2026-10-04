# ALL IN ONE 에이아이영어학원

문장 속 구조, 생각의 깊이.

초등부터 고등까지 연결되는 영어교육과 개별진도 수업을 소개하는 반응형 홈페이지입니다.

## 홈페이지 파일

- `dist/index.html`: 홈페이지, 스타일, 상호작용
- `dist/logo.svg`: 학원 로고

## Vercel에서 GitHub 저장소 연결

기존 homepage 프로젝트의 Settings → Git에서 이 저장소를 연결합니다.
Root Directory는 `dist`, Framework Preset은 `Other`로 설정합니다.
Build Command와 Install Command는 Override를 켜고 비워 둡니다.
Output Directory는 `.`로 설정합니다.

이후 연결한 배포 브랜치에 변경사항을 올리면 Vercel이 자동으로 배포합니다.

## 수동 배포

PowerShell에서 프로젝트 폴더를 연 뒤 실행합니다.

```powershell
powershell -ExecutionPolicy Bypass -File .\vercel.ps1 login
powershell -ExecutionPolicy Bypass -File .\vercel.ps1 deploy
```

수동 배포 도구는 package.json에 선언되어 있습니다. pnpm install로 설치할 수 있습니다.
계정 연결 정보, node_modules, .env는 Git에 올리지 않습니다.
