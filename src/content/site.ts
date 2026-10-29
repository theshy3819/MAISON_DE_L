/**
 * Every piece of copy and every asset path lives here, so content changes are a one-file edit.
 *
 * Photos under /images/real/ come from the venue's Instagram (@maisondel_weddinghall),
 * cropped clear of the text overlays used in the posts. /images/gen/ holds images generated
 * with Codex: people-free high-resolution re-shoots of the real halls and bridal room, plus
 * the lobby and buffet dishes where no real photo exists yet.
 */

import { asset } from "@/lib/asset";

export const contact = {
  phone: "062-716-0101",
  instagram: "https://www.instagram.com/maisondel_weddinghall/",
  instagramHandle: "@maisondel_weddinghall",
  // TODO: 네이버 예약 페이지 URL
  naverBooking: "https://booking.naver.com/",
  hours: "상담 시간 10:00 – 17:30",
};

export const hero = {
  image: { src: asset("/images/gen/hero-aster.jpg"), alt: "하트 모양 크리스털 샹들리에 아래 꽃길과 버진로드가 이어진 아스테르홀" },
  status: "2027 예식 상담 진행 중",
  place: "광주시청 앞, 상무지구",
  statement: ["별빛처럼", "찬란한 순간을", "선물합니다"],
  intro:
    "상무지구 시청 앞, 가장 빛나는 순간을 위한 프리미엄 웨딩 베뉴. 밤하늘이 쏟아지는 아스테르홀과 은하수처럼 빛나는 루센트홀에서 두 사람의 하루를 준비합니다.",
};

export type Shot = { src: string; blur: string; alt: string; label: string };

export type Space = {
  id: string;
  name: string;
  ko: string;
  subtitle: string;
  copy: string;
  shots: Shot[];
  /** Shown when the photos are renders or staged images rather than the finished space */
  note?: string;
};

const shot = (folder: "real" | "gen") => (name: string, alt: string, label: string): Shot => ({
  src: asset(`/images/${folder}/${name}.jpg`),
  blur: asset(`/images/${folder}/${name}-blur.jpg`),
  alt,
  label,
});
const real = shot("real");
// High-resolution re-shoots generated with Codex from the venue's own photos (no people)
const gen = shot("gen");
const genNote = "실제 공간 사진을 바탕으로 제작한 고화질 연출 이미지입니다.";

export const spaces: Space[] = [
  {
    id: "aster",
    name: "Aster Hall",
    ko: "아스테르홀",
    subtitle: "밤하늘의 별빛이 쏟아지듯",
    copy: "눈부신 빛으로 물드는 홀. 오래 기다려온 한 장면처럼, 순간이 멈춘 듯 아름답게 펼쳐지는 웨딩을 완성합니다.",
    note: "신부 입장 외 사진은 실제 공간 사진을 바탕으로 제작한 고화질 연출 이미지입니다.",
    shots: [
      real("aster-bride", "샹들리에 아래 버진로드에 선 신부", "신부 입장"),
      gen("aster-runway", "하트 샹들리에가 비치는 미러 버진로드와 양옆의 꽃길", "버진로드"),
      gen("aster-starlight", "별빛처럼 반짝이는 하트 크리스털 샹들리에 천장", "별빛 천장"),
      gen("aster-florals", "버진로드를 따라 놓인 흰 수국과 장미, 백합 장식", "플라워"),
    ],
  },
  {
    id: "lucent",
    name: "Lucent Hall",
    ko: "루센트홀",
    subtitle: "은하수처럼 쏟아지는 찬란한 빛",
    copy: "하늘 위 별을 옮겨놓은 듯한 샹들리에 아래, 별빛보다 아름답게 빛날 당신의 순간을 만나보세요.",
    note: genNote,
    shots: [
      gen("lucent-cascade", "천장에서 은하수처럼 쏟아지는 루센트홀의 크리스털", "크리스털 캐노피"),
      gen("lucent-detail", "빛을 머금은 크리스털 장식", "디테일"),
    ],
  },
  {
    id: "bridal",
    name: "Bridal Room",
    ko: "신부대기실",
    subtitle: "신부의 설렘이 머무는 공간",
    copy: "밝은 공간에 자연스럽게 스며드는 빛과 플로럴 월. 예식 전 설레는 시간까지 가장 아름다운 모습으로 머무를 수 있도록 준비했습니다.",
    note: genNote,
    shots: [
      gen("bridal-front", "정면에서 본 신부대기실: 플로럴 월과 곡선형 부클레 소파", "대기 공간"),
      gen("bridal-candle", "크리스털 캔들 홀더와 흰 장미 장식", "캔들 디테일"),
      gen("bridal-florals", "신부대기실을 채운 화이트 플로럴 월", "플로럴 월"),
    ],
  },
  {
    id: "lobby",
    name: "Lobby Lounge",
    ko: "로비 라운지",
    subtitle: "넓고 탁 트인 메종드엘 로비",
    copy: "도심 속 편안한 고품격 라운지. 동선이 넉넉해 하객이 붐빌 걱정 없이 머무를 수 있습니다.",
    note: "로비 사진은 설계 렌더 기반의 연출 이미지로, 실제와 다를 수 있습니다.",
    shots: [
      { src: asset("/images/gen/lobby.jpg"), blur: asset("/images/gen/lobby-blur.jpg"), alt: "대리석 마감의 로비 라운지", label: "로비 라운지" },
      { src: asset("/images/lobby-01.jpg"), blur: asset("/images/lobby-01-blur.jpg"), alt: "엘리베이터 홀과 조형 작품", label: "엘리베이터 홀" },
    ],
  },
];

export const day = {
  title: "The Day",
  subtitle: "하객의 시선에 담긴 순간까지",
  text: "객석에 앉아 바라보는 순간, 두 사람의 가장 아름다운 장면이 시작됩니다. 가까이에서 마주하는 순간부터 멀리서 바라보아도 오래 기억될 장면까지.",
  shots: {
    welcome: { src: asset("/images/real/welcome.jpg"), alt: "웨딩 사진이 놓인 웰컴 테이블", ratio: "762 / 680" },
    veil: { src: asset("/images/real/couple-veil.jpg"), alt: "베일을 길게 늘어뜨리고 걷는 신랑 신부", ratio: "1086 / 520" },
    candles: { src: asset("/images/real/candles.jpg"), alt: "흰 꽃과 캔들 장식", ratio: "1087 / 617" },
    back: { src: asset("/images/real/couple-back.jpg"), alt: "샹들리에 아래 마주 선 신랑 신부의 뒷모습", ratio: "954 / 470" },
  },
};

export const buffet = {
  title: "Star Chef's Buffet",
  subtitle: "스타 셰프 레시피의 5성급 호텔 뷔페",
  closing: "한식, 일식, 중식, 프렌치까지 호텔급 뷔페의 진수를 메종드엘에서 경험하세요.",
  note: "메뉴 사진은 연출 이미지입니다.",
  menu: [
    { name: "숯불 바비큐 스테이션", detail: "비장탄으로 즉석에서 굽는 스테이크와 그릴 요리", image: asset("/images/gen/buffet-steak.jpg") },
    { name: "스시와 사시미 스테이션", detail: "셰프가 바로 쥐어 내는 스시와 사시미", image: asset("/images/gen/buffet-sushi.jpg") },
    { name: "캐비어 & 샐러드", detail: "캐비어 스테이션과 프레시한 샐러드 바", image: asset("/images/gen/buffet-caviar.jpg") },
    { name: "트러플 앙쿠르트 스프", detail: "페이스트리를 덮어 구운 트러플 버섯 스프", image: asset("/images/gen/buffet-soup.jpg") },
    { name: "베이커리 & 디저트", detail: "5성급 호텔 수준의 파티세리", image: asset("/images/gen/buffet-dessert.jpg") },
    { name: "즉석 한식 코너", detail: "갈비탕을 비롯한 정갈한 즉석 한식", image: asset("/images/gen/buffet-galbitang.jpg") },
  ],
};

const mapQuery = "광주광역시 서구 시청로 67";
const parkQuery = "광주 서구 평화공원";

export const location = {
  title: "오시는 길",
  address: "광주 서구 시청로 67, 3층",
  building: "광주시청 앞, 상무지구 CGV 건물",
  // Google Maps embed — no API key needed for the q= form
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=ko&z=17&output=embed`,
  info: [
    { title: "교통", text: "지하철 역세권, 광주 송정역과 순환도로에서 가깝습니다." },
    { title: "주차", text: "건물 주차장과 바로 옆 평화공원 주차장을 이용할 수 있습니다." },
  ],
  links: [
    { label: "네이버 지도", href: `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}` },
    { label: "카카오맵", href: `https://map.kakao.com/link/search/${encodeURIComponent(mapQuery)}` },
    { label: "구글 지도", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` },
    { label: "T map", href: `tmap://search?name=${encodeURIComponent(mapQuery)}`, app: true },
    { label: "평화공원 주차장", href: `https://map.naver.com/p/search/${encodeURIComponent(parkQuery)}` },
  ],
};

export const reservation = {
  title: "2027 예식 상담",
  text: "성함과 연락처, 예정일을 남겨주시면 상담 시간 안에 먼저 연락드립니다.",
  image: { src: asset("/images/gen/aster-aisle-hd.jpg"), alt: "커튼과 흰 꽃 사이로 이어진 아스테르홀의 미러 버진로드" },
};

export const company = {
  name: "메종드엘 웨딩홀",
  ceo: "최금복",
  address: "광주 서구 시청로 67, 3층(상무지구 CGV건물)",
  bizNo: "866-86-03677",
  tel: "062-716-0101",
  email: "acehyun2675@naver.com",
  privacyOfficer: "최금복",
};
