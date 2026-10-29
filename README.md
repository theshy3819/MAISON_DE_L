# MAISON DE L — 메종드엘 웨딩홀

광주 상무지구 메종드엘 웨딩홀 원페이지 사이트. Next.js 16 + React 19, GSAP · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## 디자인 방향

실제 홀의 재료에서 출발했습니다 — 미러 블랙 바닥, 쏟아지는 크리스털, 순백의 꽃, 버진로드의 그라스.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| Mirror Black | `#000000` | 홀·뷔페·예약 배경 |
| Crystal | `#F4F5F2` | 밝은 섹션 배경, 어두운 섹션의 글자 |
| Smoke | `#8C8E89` | 보조 텍스트 |
| Grass | `#A9B994` | 포커스·핀·선택 등 최소한의 포인트 |

- 타입: **Italiana**(공간 이름, 워드마크) + **Pretendard**(본문, 한글 디스플레이는 ExtraLight)
- 시그니처 모먼트: 히어로의 홀 사진이 스크롤에 따라 **아치형 문**으로 닫히며 "도심 속 별빛이 머무는 곳"이 나타남. 아치 모티프는 뷔페 사진 프레임과 예약 섹션에서 반복
- 공간(아스테르홀·루센트홀·신부대기실·로비)은 풀스크린 패널이 차례로 겹쳐 쌓이고, 사진은 아치 프레임 안에 놓임. 썸네일 버튼으로 사진 전환
- 뷔페는 메뉴에 커서를 올리거나 탭하면 해당 요리 사진이 아래에서 위로 바뀜
- `prefers-reduced-motion` 사용자에게는 아치가 닫힌 최종 구도를 정적으로 보여주고 모든 모션·스무스 스크롤·인트로를 끔

## 구조

| 경로 | 내용 |
| --- | --- |
| `src/content/site.ts` | **모든 문구·이미지 경로**. 콘텐츠 교체는 이 파일만 수정 |
| `src/components/` | Intro, Header, Hero, Spaces, Day, Buffet, Location, Reservation, Footer |
| `src/lib/gsap.ts` | GSAP 플러그인 등록, 공용 이징(`silk`, `wipe`) |
| `src/lib/useReveals.ts` | `data-reveal="…"` 속성 기반 스크롤 등장 애니메이션 |
| `src/app/api/reservation/route.ts` | 상담 신청 접수 API (웹훅 전달) |

## 사진

| 폴더 | 출처 | 쓰는 곳 |
| --- | --- | --- |
| `public/images/real/` | 공식 인스타그램 [@maisondel_weddinghall](https://www.instagram.com/maisondel_weddinghall/) 게시물·릴스 커버 (2026.09.30 – 10.26) | 아스테르홀 패널, The Day |
| `public/images/gen/` | Codex CLI `image_gen` 생성 | 히어로·예약(아스테르홀), 루센트홀, 신부대기실, 로비, 뷔페 요리 |
| `public/images/*.jpg` | Figma 시안의 설계 렌더 원본 | 로비 두 번째 사진 |

- 히어로·루센트홀·신부대기실·예약 사진은 인스타 실사를 **참조 이미지로 넣어 같은 공간을 고화질로 재현**한 생성 이미지입니다. 인물은 넣지 않았습니다(`hero-aster`, `aster-aisle-hd`, `lucent-*`, `bridal-*`).
- 인스타 이미지는 게시물에 얹힌 로고·문구를 피해 잘라 썼습니다. `*-blur.jpg` 는 공간 패널 배경용으로 미리 흐리게 만든 사본입니다.
- 실제 하객·커플이 나온 사진은 웹사이트 게시에 대한 당사자 동의를 확인해 주세요.
- 생성 이미지가 쓰인 루센트홀·신부대기실·로비·뷔페에는 "연출 이미지" 안내 문구가 함께 표시됩니다. 촬영 원본이 생기면 같은 파일명으로 교체하고 `site.ts` 의 `note` 를 지우면 됩니다.

## 히어로 영상 (보류)

`site.ts` 의 `hero` 는 현재 사진 기반입니다. 영상을 다시 넣을 때는 `Hero.tsx` 의 `<Image>` 자리에 `<video autoPlay muted loop playsInline poster>` 를 넣으면 아치 전환 연출이 그대로 적용됩니다.

## 지도

오시는 길 지도는 Google 지도 iframe(`site.ts` 의 `location.mapEmbed`, API 키 불필요)입니다. 스크롤을 방해하지 않도록 평소에는 흑백·조작 잠금 상태이고, 클릭하면 컬러로 바뀌며 움직일 수 있습니다.

## 환경 변수

`.env.example` 참고. `RESERVATION_WEBHOOK_URL`(상담 신청 전달), `NEXT_PUBLIC_SITE_URL`(OG 이미지).
