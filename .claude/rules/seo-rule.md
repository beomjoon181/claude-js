# SEO 규칙 (HTML / CSS / JS)

### 메타데이터
- 모든 HTML 페이지의 `<head>` 내에 고유한 `<title>`과 `<meta name="description">` 필수 정의
- title은 `"페이지명 | 사이트명"` 형식, **60자 이내**
- description은 **120~155자**, 페이지 핵심 내용을 요약
- 동적 콘텐츠(상품, 블로그 등) 페이지의 경우, **서버 사이드 렌더링(SSR) 시점**에 백엔드에서 `<head>` 영역의 메타 태그(OpenGraph 포함)를 채워서 응답해야 함 (클라이언트 JS로 동적 삽입 시 크롤러가 인식하지 못할 수 있음)
- 새 페이지 추가 시 메타태그 누락 상태로 커밋/배포 금지

#### 예시 (HTML)
```html
<head>
  <title>무선 마우스 | MyStore</title>
  <meta name="description" content="가장 편안한 그립감과 저소음 버튼을 제공하는 무선 마우스 제품 정보입니다.">
  
  <!-- Open Graph -->
  <meta property="og:title" content="무선 마우스 | MyStore">
  <meta property="og:description" content="가장 편안한 그립감과 저소음 버튼을 제공하는 무선 마우스 제품 정보입니다.">
  <meta property="og:image" content="https://example.com/images/mouse-thumbnail.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/products/wireless-mouse-123">
</head>
```

### 구조화 데이터 (JSON-LD)
- 상품/글/조직 정보가 있는 페이지는 반드시 `<script type="application/ld+json">` 스키마 삽입 (Product, Article, Organization, BreadcrumbList 등)
- JSON-LD는 클라이언트 JS로 동적으로 생성하지 말고, **초기 HTML 응답 시점(`<head>` 또는 `<body>` 내)**에 서버에서 직접 렌더링하여 포함

### 렌더링 전략
- SEO가 중요한 페이지(랜딩, 상품, 블로그)는 **서버 사이드 렌더링(SSR)** 또는 **정적 HTML(SSG)** 방식을 사용, 절대 **순수 클라이언트 사이드 렌더링(CSR, 빈 HTML에서 JS로 전체 DOM을 그리는 방식) 금지**
- 페이지 전체 콘텐츠를 JavaScript `fetch`로 받아와서 렌더링하는 구조 지양 (검색엔진 크롤러가 빈 화면이나 미완성 컨텐츠를 수집할 위험이 있음)

### 이미지 & 성능
- HTML 기본 `<img>` 태그 사용 시, **필수 속성(`src`, `alt`, `width`, `height`)** 모두 명시하여 레이아웃 시프트(CLS) 방지
- 모든 이미지에 의미 있는 `alt` 텍스트 제공 (빈 문자열 금지, `"image"`, `"photo"` 같은 무의미한 값도 금지)
- LCP(Largest Contentful Paint) 대상 주요 이미지는 `<link rel="preload">` 등을 활용하여 로딩 최적화

### URL / 라우팅
- URL은 `kebab-case` 사용, 의미 있는 슬러그 포함 (`/products/123` 대신 `/products/wireless-mouse-123`)
- 페이지 이동이나 리다이렉트 필요 시 웹 서버 설정(Nginx, Apache 등)을 통해 **301 Redirect** 처리, 자바스크립트(`location.href`) 기반 리다이렉트로 대체 금지
- 중복 콘텐츠가 발생할 수 있는 페이지는 `<link rel="canonical" href="...">` 태그로 대표 URL 명시

### 시맨틱 마크업
- 페이지당 `<h1>` 태그는 **오직 하나**만 사용
- 의미 없는 `<div>` 남발 금지, 콘텐츠 성격에 맞는 시맨틱 태그 사용 (`<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<main>`)

### 사이트맵 & robots
- 새 라우트(페이지) 추가 시 `sitemap.xml` 파일에 반영 확인
- 검색엔진에 인덱싱되면 안 되는 페이지(관리자 페이지, 검색 결과 페이지 등)는 `robots.txt` 설정 및 해당 페이지 `<head>`에 `<meta name="robots" content="noindex, nofollow">` 명시

### 절대 하지 말 것
- 메타데이터(Title, Description)가 누락된 페이지 배포 금지
- 클라이언트 JavaScript 비동기 요청(`fetch`/`axios`)으로 본문 콘텐츠 전체를 그려내는 구조 사용 금지 (크롤러가 빈 화면을 수집하게 됨)
- 사이트 내 여러 페이지가 동일한 `title`이나 `description`을 중복 사용하지 않도록 관리