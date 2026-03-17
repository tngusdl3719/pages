# Cloudflare Pages Static Site

이 워크스페이스는 Cloudflare Pages에 바로 배포할 수 있는 정적 사이트 구조로 정리했습니다.

## 구조

- `public/index.html`: 메인 페이지
- `public/styles.css`: 스타일
- `public/404.html`: 기본 404 페이지
- `public/_headers`: 보안 헤더 및 캐시 정책

## 로컬 미리보기

```bash
python3 -m http.server 4173 -d public
```

브라우저에서 `http://localhost:4173` 로 확인하면 됩니다.

## Cloudflare Pages 배포

### 1. Git 연동 방식

- 저장소를 GitHub 또는 GitLab에 푸시
- Cloudflare Dashboard > Workers & Pages > Create application > Pages 선택
- 저장소 연결 후 아래 값 사용
  - Framework preset: `None`
  - Build command: 비워두기
  - Build output directory: `public`

### 2. 직접 업로드 방식

- Cloudflare Pages에서 Direct Upload 선택
- `public/` 디렉터리를 업로드

## 수정 포인트

- `public/index.html`의 문구와 섹션을 실제 서비스 내용으로 교체
- 필요하면 이미지, 로고, 추가 CSS 파일을 `public/` 아래에 추가
- 커스텀 도메인은 Cloudflare Pages 프로젝트의 `Custom domains`에서 연결
