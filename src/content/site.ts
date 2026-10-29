/**
 * Every piece of copy and every asset path lives here, so swapping the
 * Figma placeholders for final exports is a one-file change.
 *
 * Paths under /images/placeholder/ are stand-ins (crops of the Figma render
 * or detail crops of the real photos). Replace them with the original exports.
 */

export const contact = {
  phone: "010-8296-3579",
  instagram: "https://www.instagram.com/maisondel.weddinghall/",
  // TODO: 네이버 예약 페이지 URL
  naverBooking: "https://booking.naver.com/",
  address: "광주 서구 시청로 67, 3층 (상무지구 CGV건물)",
  hours: "[상담 가능 시간] 10시 ~ 17시 30분까지",
};

export const hero = {
  eyebrow: "2026.08 GRAND OPEN",
  title: "MAISON DE L",
  tagline: "A New Beginning in Luxury Wedding Venues",
  caption: "메종드엘 웨딩홀, 2026년 8월 오픈",
  /**
   * Higgsfield 영상이 준비되면 public/videos/ 에 넣고 경로를 지정하세요.
   * 영상이 있으면 슬라이드 대신 영상이 재생되고, poster 는 첫 프레임 대체 이미지입니다.
   */
  video: null as null | { mp4: string; webm?: string; mobileMp4?: string; poster: string },
  slides: [
    { src: "/images/hall-main.jpg", alt: "메종드엘 럭셔리 홀 전경" },
    { src: "/images/lobby-01.jpg", alt: "메종드엘 로비 라운지" },
    { src: "/images/bridal-01.jpg", alt: "메종드엘 브라이덜 룸" },
  ],
};

export const opening = {
  lines: ["2026.08", "Grand Open"],
  title: "MAISON DE L",
  lead: ["도심 속 별빛이 머무는 곳", "광주광역시 럭셔리 웨딩의 새로운 기준"],
  note: "메종드엘 웨딩홀, 2026.08 그랜드 오픈",
  // TODO(figma): con2 아치 이미지 원본으로 교체
  image: { src: "/images/hall-main.jpg", alt: "샹들리에가 빛나는 메종드엘 홀" },
  disclaimer: "*상기 이미지는 고객님의 이해를 돕기 위한 이미지로 공사 진행간 변경될 수 있습니다.",
  ring: "MAISON DE L  ·  A New Beginning in Luxury Wedding Venues  ·  ",
  features: [
    { title: "Luxury Wedding Venues", text: "이때까지 경험해 보지 못한 최고의 결혼식" },
    { title: "The best in Gwangju", text: "광주 상무지구에 위치한 신상 웨딩홀" },
    { title: "Star Chef’s Buffet", text: "5성급 호텔 스타 셰프 레시피의 뷔페" },
  ],
  closing: ["도심의 중심, 특별함의 시작", "밤하늘 별빛처럼 찬란한 순간을", "가장 세련된 방식으로 표현해드립니다."],
};

export type Space = {
  id: string;
  accent: string;
  rest: string;
  subtitle: string;
  tone: "white" | "gray";
  /** width / height of the photo frame in the Figma design */
  ratio: number;
  slides: { src: string; alt: string }[];
  copy: [string, string];
};

export const spaces: Space[] = [
  {
    id: "hall",
    accent: "Luxury",
    rest: " Hall",
    subtitle: "가장 찬란하게 빛날 당신을 위해",
    tone: "white",
    ratio: 1424 / 888,
    slides: [
      { src: "/images/hall-main.jpg", alt: "샤이니 블랙 무드의 럭셔리 홀" },
      // TODO(figma): Luxury Hall 베리언트2 이미지로 교체
      { src: "/images/placeholder/hall-02.jpg", alt: "럭셔리 홀 버진로드와 샹들리에" },
    ],
    copy: [
      "고급스러움을 물씬 풍기는 샤이니 블랙 무드의 정제된 공간,",
      "찬란히 빛나는 섬세한 조명과 아름다운 꽃이 어우러져 경이로운 아우라를 완성합니다.",
    ],
  },
  {
    id: "bridal",
    accent: "Bridal",
    rest: " room",
    subtitle: "아름다운 신부를 위한 공간",
    tone: "gray",
    ratio: 1424 / 835,
    slides: [
      { src: "/images/bridal-01.jpg", alt: "화이트 플로럴 월이 있는 브라이덜 룸" },
      // TODO(figma): Bridal room 베리언트2 이미지로 교체
      { src: "/images/placeholder/bridal-02.jpg", alt: "브라이덜 룸의 신부 대기 공간" },
    ],
    copy: [
      "은은한 빛을 담아낸 신부를 위한 프라이빗 공간,",
      "공간을 가득 채우는 플로럴 장식과 화이트 모던 무드를 베이스로 합니다.",
    ],
  },
  {
    id: "lobby",
    accent: "Lobby",
    rest: " Lounge",
    subtitle: "넓고 탁트인 메종드엘 로비",
    tone: "white",
    ratio: 1424 / 801,
    slides: [
      { src: "/images/lobby-01.jpg", alt: "대리석 마감의 넓은 로비 라운지" },
      // TODO(figma): Lobby Lounge 베리언트2 이미지로 교체
      { src: "/images/placeholder/lobby-02.jpg", alt: "로비 라운지의 조형 작품" },
    ],
    copy: ["도심속 편안한 고품격 라운지,", "편리한 이동 동선으로 붐빌 걱정이 없이 쾌적한 공간입니다."],
  },
];

export const buffet = {
  title: "Luxury Buffet",
  subtitle: "스타셰프 레시피의 5성급 호텔 뷔페",
  // TODO(figma): 배경 사진과 8개 음식 이미지를 원본으로 교체. 현재는 시안 렌더에서 잘라낸 합성 이미지입니다.
  background: "/images/placeholder/buffet-bg.jpg",
  wheel: "/images/placeholder/buffet-wheel.jpg",
  menu: [
    "비장탄을 사용한 다양한 즉석 숯불 바베큐 스테이션",
    "즉석 스시와 사시미 스테이션",
    "캐비어 스테이션과 프레시한 샐러드",
    "앙쿠르트 트러플 버섯 스프",
    "5성급 호텔수준의 베이커리와 디저트",
    "즉석 갈비탕 코너 등 즉석 한식 메뉴",
  ],
  closing: ["한식, 일식, 중식, 프렌치 등 호텔급 뷔페의 진수를", "메종드엘에서 경험하실 수 있습니다."],
};

const mapQuery = "광주 서구 시청로 67";
const parkQuery = "광주 서구 평화공원";

export const location = {
  title: "Location",
  subtitle: "메종드엘 오시는 길",
  // 카카오 지도 JavaScript 키가 있으면 NEXT_PUBLIC_KAKAO_MAP_KEY 로 실제 지도가 뜹니다.
  coords: null as null | { lat: number; lng: number },
  query: mapQuery,
  staticMap: "/images/placeholder/map.png",
  info: [
    { title: "광주 교통의 중심지", text: "지하철 역세권을 중심으로 광주 송정역, 순환도로 등 교통 접근성 우수" },
    { title: "주차 정보", text: "건물 주차장, 바로 옆 평화공원 주차장 이용 가능" },
  ],
  places: [
    {
      label: "메종드엘",
      links: {
        naver: `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}`,
        kakao: `https://map.kakao.com/link/search/${encodeURIComponent(mapQuery)}`,
        tmap: `tmap://search?name=${encodeURIComponent(mapQuery)}`,
      },
    },
    {
      label: "평화공원",
      links: {
        naver: `https://map.naver.com/p/search/${encodeURIComponent(parkQuery)}`,
        kakao: `https://map.kakao.com/link/search/${encodeURIComponent(parkQuery)}`,
        tmap: `tmap://search?name=${encodeURIComponent(parkQuery)}`,
      },
    },
  ],
};

export const company = {
  name: "메종드엘 웨딩홀",
  ceo: "최금복",
  address: "광주 서구 시청로 67, 3층(상무지구 cgv건물)",
  bizNo: "866-86-03677",
  tel: "010-8296-3579",
  email: "acehyun2675@naver.com",
  privacyOfficer: "최금복",
};
