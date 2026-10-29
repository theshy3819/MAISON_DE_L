# MAISON DE L — 메종드엘 웨딩홀

광주 상무지구 메종드엘 웨딩홀 원페이지 사이트. Figma 시안(`메종드엘_페이지`)을 기준으로 Next.js 16 + React 19 로 구현하고, GSAP · Lenis 로 인터랙션을 더했습니다.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## 구조

| 경로 | 내용 |
| --- | --- |
| `src/content/site.ts` | **모든 문구·이미지 경로**. 콘텐츠 교체는 이 파일만 수정 |
| `src/components/` | 섹션 컴포넌트 (Intro, Header, Hero, Opening, SpaceSection, Buffet, Location, Reservation, Footer) |
| `src/lib/gsap.ts` | GSAP 플러그인 등록, 공용 이징(`silk`, `wipe`) |
| `src/lib/useReveals.ts` | `data-reveal="…"` 속성 기반 스크롤 등장 애니메이션 |
| `src/app/api/reservation/route.ts` | 상담 신청 접수 API (웹훅 전달) |

## 모션 시스템

awwwards · GDWEB 레퍼런스(Villa Aurelia, White Desert, Tengile MalaMala, SEAMARQ, Parnas, Boutique Weddings)를 REA 로 분석해 값을 가져왔습니다.

- 이징: `silk` = `cubic-bezier(.16,1,.3,1)` (텍스트·페이드·줌아웃), `wipe` = `cubic-bezier(.77,0,.18,1)` (커튼·클립 와이프)
- 스무스 스크롤: Lenis `duration 1.2`, expo-out, GSAP ticker 동기화
- 인트로: 홀 문이 열리듯 좌우 도어 1.8s, 세션당 1회
- 타이틀: 세로 헤어라인 → 단어 마스크 상승 → 서브타이틀 블러 인 (한글은 글자 단위 분할 금지, 줄 단위)
- 사진: 스크롤에 맞춰 카드에서 풀블리드로 확장(scrub) + 내부 줌아웃
- 슬라이더(01/02): 방향성 와이프 1.2s, 5초 자동재생 + 진행 링
- 히어로: 별빛 파티클(캔버스), 마우스 패럴랙스, 스크롤 시 카피 상승·소멸
- `prefers-reduced-motion` 사용자는 모든 모션·스무스 스크롤·인트로 비활성

## 히어로 영상 넣기 (Higgsfield 등)

1. `public/videos/` 에 파일 배치: `hero.mp4`(H.264), 선택적으로 `hero.webm`, 세로형 `hero-mobile.mp4`, 첫 프레임 `hero-poster.jpg`
2. `src/content/site.ts` 의 `hero.video` 를 지정

```ts
video: { mp4: "/videos/hero.mp4", webm: "/videos/hero.webm", mobileMp4: "/videos/hero-mobile.mp4", poster: "/videos/hero-poster.jpg" },
```

영상이 지정되면 슬라이드·화살표 대신 무음 루프 영상이 재생됩니다. 권장: 1920×1080 이상, 8–12초 끊김 없는 루프, 6–8MB 이하.

## 교체가 필요한 임시 에셋

Figma MCP 호출 한도(Starter 플랜) 때문에 일부 원본 이미지를 받지 못해 임시본을 넣었습니다. `public/images/placeholder/` 의 파일과 `site.ts` 의 `TODO(figma)` 주석 위치를 Figma 원본 export 로 바꿔주세요.

| 임시 파일 | 교체할 Figma 레이어 |
| --- | --- |
| `hall-02.jpg`, `bridal-02.jpg`, `lobby-02.jpg` | Luxury Hall / Bridal room / Lobby Lounge 컴포넌트의 `베리언트2` 사진 |
| `buffet-wheel.jpg` | Luxury Buffet 섹션의 음식 사진 8장 (현재 시안 렌더에서 잘라낸 합성본) |
| `buffet-bg.jpg` | Luxury Buffet 배경 사진 |
| `map.png` | 지도 (카카오 키를 넣으면 실제 지도로 대체됨) |
| `opening.image` (현재 `hall-main.jpg`) | con2 아치 안 홀 사진 |

## 환경 변수

`.env.example` 참고. `NEXT_PUBLIC_KAKAO_MAP_KEY`(실제 지도), `RESERVATION_WEBHOOK_URL`(상담 신청 전달), `NEXT_PUBLIC_SITE_URL`(OG 이미지).
