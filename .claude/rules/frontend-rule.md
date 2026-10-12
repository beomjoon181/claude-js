---
paths: 
  - "src/**/*.html, src/**/*.js, src/**/*.css"
---

# Frontend Rules

## 스택
- HTML5, CSS3, ES6+ Vanilla JavaScript (타입 안정성이 필요한 경우 JSDoc 또는 TypeScript 사용 가능 시 준수)
  - 설명: 프론트엔드에서 사용할 기본 웹 표준 기술 지정
- 스타일링: Tailwind CSS (또는 순수 CSS/SCSS) 사용, 인라인 스타일 및 CSS-in-JS 금지
- 상태 관리: 가벼운 커스텀 Pub/Sub 패턴 또는 Vanilla JS 기반 상태 저장소 사용 (`Redux`/`Zustand` 같은 무거운 상태 라이브러리 지양)
- 폼: HTML5 Native Validation 또는 가벼운 JS 검증 로직 활용 (`react-hook-form` 등 불필요)

## 컨벤션 관리룰
- 컴포넌트(재사용 가능한 UI 모듈)는 ES6 클래스 또는 모듈화된 함수형 구조 활용, 전역 오염 방지 (`IIFE` 또는 ES Modules 사용)
- 파일명은 `kebab-case` (예: `user-profile.js`, `user-profile.css`), 폴더명도 `kebab-case`
- 하나의 JS 파일에는 밀접하게 연관된 모듈 단위로 export 구성
- 전역 변수 오염 금지 (모듈형 `import/export` 또는 네임스페이스 패턴 활용)

## 임포트/스크립트 로드 순서 (JS 기준)
1. 외부 서드파티 라이브러리 (CDN 또는 번들러)
2. 내부 유틸리티 및 코어 모듈 (`@/utils`, `@/services` 등)
3. 개별 컴포넌트 및 스타일 파일
4. 상대 경로 모듈

## 절대 하지 말 것
- 초기 HTML 렌더링을 완전히 막는 비동기 클라이언트 사이드 `fetch`로 전체 콘텐츠 로딩 금지 (SSR/SSG 또는 서버 렌더링 결과물 활용)
- HTML 내 `style="..."` 속성을 통한 inline style 사용 금지 (CSS 클래스로 분리)
- 불필요한 서드파티 라이브러리 임의 설치 금지 (바닐라 JS 구현 가능 기능은 순수 코드로 작성)
- DOM 요소 선택 시 `document.getElementById` 등을 무분별하게 남발하지 않고 모듈화된 셀렉터 관리

## 접근성
- 모든 인터랙티브 요소(`<button>`, `<a>`, `<input>` 등)는 키보드 접근(`tabindex`, 포커스 스타일) 가능해야 함
- 모든 이미지에 의미 있는 `alt` 텍스트 필수 (빈 태그나 무의미한 값 지양)

## 테스트
- 주요 유틸리티 및 컴포넌트 로직은 Jest 또는 Vitest 기반의 단위 테스트 작성
- DOM 테스트 시 구현 디테일(내부 변수나 함수) 대신 사용자 관점의 인터랙션 및 결과 위주로 테스트