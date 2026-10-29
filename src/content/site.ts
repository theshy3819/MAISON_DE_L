/**
 * Every piece of copy and every asset path lives here, so content changes are a one-file edit.
 * Photos under /images/gen/ were generated with Codex (image_gen) from the hall renders and mood briefs;
 * /images/*.jpg without "gen" are the original renders from the Figma file.
 */

export const contact = {
  phone: "010-8296-3579",
  instagram: "https://www.instagram.com/maisondel.weddinghall/",
  // TODO: 네이버 예약 페이지 URL
  naverBooking: "https://booking.naver.com/",
  hours: "상담 시간 10:00 – 17:30",
};

export const hero = {
  image: { src: "/images/gen/hero-hall.jpg", alt: "크리스털 샹들리에 아래 꽃길과 미러 버진로드가 이어진 메종드엘 홀" },
  opening: "2026년 8월 그랜드 오픈",
  place: "광주 상무지구",
  statement: ["도심 속", "별빛이", "머무는 곳"],
  intro:
    "샤이니 블랙의 홀 위로 크리스털이 쏟아지고, 순백의 꽃길이 거울처럼 빛납니다. 메종드엘은 2026년 8월, 광주 상무지구에 문을 엽니다.",
};

export type Space = {
  id: string;
  name: string;
  subtitle: string;
  copy: string;
  shots: { src: string; alt: string; label: string }[];
};

export const spaces: Space[] = [
  {
    id: "hall",
    name: "Luxury Hall",
    subtitle: "가장 찬란하게 빛날 당신을 위해",
    copy: "샤이니 블랙 무드의 정제된 홀. 섬세한 조명과 꽃이 어우러져 버진로드 위에 경이로운 아우라를 만듭니다.",
    shots: [
      { src: "/images/gen/hero-hall.jpg", alt: "럭셔리 홀 전경", label: "홀 전경" },
      { src: "/images/gen/hall-aisle.jpg", alt: "샹들리에가 비치는 미러 버진로드", label: "버진로드" },
      { src: "/images/gen/hall-detail.jpg", alt: "크리스털과 흰 오키드 장식", label: "플라워 디테일" },
    ],
  },
  {
    id: "bridal",
    name: "Bridal Room",
    subtitle: "아름다운 신부를 위한 공간",
    copy: "은은한 빛을 담은 프라이빗 공간. 벽을 가득 채운 화이트 플로럴과 모던한 마감이 신부를 가장 돋보이게 합니다.",
    shots: [
      { src: "/images/gen/bridal.jpg", alt: "화이트 플로럴 월이 있는 브라이덜 룸", label: "브라이덜 룸" },
      { src: "/images/bridal-01.jpg", alt: "브라이덜 룸에서 대기 중인 신부", label: "신부 대기" },
    ],
  },
  {
    id: "lobby",
    name: "Lobby Lounge",
    subtitle: "넓고 탁 트인 메종드엘 로비",
    copy: "도심 속 편안한 고품격 라운지. 동선이 넉넉해 하객이 붐빌 걱정 없이 머무를 수 있습니다.",
    shots: [
      { src: "/images/gen/lobby.jpg", alt: "대리석 마감의 로비 라운지", label: "로비 라운지" },
      { src: "/images/lobby-01.jpg", alt: "엘리베이터 홀과 조형 작품", label: "엘리베이터 홀" },
    ],
  },
];

export const spacesNote = "공간 이미지는 이해를 돕기 위한 연출 이미지로, 공사 진행에 따라 변경될 수 있습니다.";

export const day = {
  title: "The Day",
  subtitle: "메종드엘에서 보내는 하루",
  text: "입장의 떨림부터 마지막 건배까지. 빛과 꽃, 그리고 두 사람만을 위한 장면을 준비합니다.",
  shots: [
    { src: "/images/gen/moment-veil.jpg", alt: "빛을 받은 웨딩 베일과 나비", ratio: "2 / 3" },
    { src: "/images/gen/moment-table.jpg", alt: "촛불과 크리스털 잔이 놓인 만찬 테이블", ratio: "3 / 2" },
    { src: "/images/gen/moment-rings.jpg", alt: "실크 위의 웨딩 링", ratio: "4 / 5" },
    { src: "/images/gen/moment-bouquet.jpg", alt: "작약과 장미 부케", ratio: "4 / 5" },
  ],
};

export const buffet = {
  title: "Star Chef's Buffet",
  subtitle: "스타 셰프 레시피의 5성급 호텔 뷔페",
  closing: "한식, 일식, 중식, 프렌치까지 호텔급 뷔페의 진수를 메종드엘에서 경험하세요.",
  menu: [
    { name: "숯불 바비큐 스테이션", detail: "비장탄으로 즉석에서 굽는 스테이크와 그릴 요리", image: "/images/gen/buffet-steak.jpg" },
    { name: "스시와 사시미 스테이션", detail: "셰프가 바로 쥐어 내는 스시와 사시미", image: "/images/gen/buffet-sushi.jpg" },
    { name: "캐비어 & 샐러드", detail: "캐비어 스테이션과 프레시한 샐러드 바", image: "/images/gen/buffet-caviar.jpg" },
    { name: "트러플 앙쿠르트 스프", detail: "페이스트리를 덮어 구운 트러플 버섯 스프", image: "/images/gen/buffet-soup.jpg" },
    { name: "베이커리 & 디저트", detail: "5성급 호텔 수준의 파티세리", image: "/images/gen/buffet-dessert.jpg" },
    { name: "즉석 한식 코너", detail: "갈비탕을 비롯한 정갈한 즉석 한식", image: "/images/gen/buffet-galbitang.jpg" },
  ],
};

const mapQuery = "광주 서구 시청로 67";
const parkQuery = "광주 서구 평화공원";

export const location = {
  title: "오시는 길",
  address: "광주 서구 시청로 67, 3층",
  building: "상무지구 CGV 건물",
  // 카카오 지도 JavaScript 키가 있으면 NEXT_PUBLIC_KAKAO_MAP_KEY 로 실제 지도가 뜹니다.
  coords: null as null | { lat: number; lng: number },
  query: mapQuery,
  staticMap: "/images/placeholder/map.png",
  info: [
    { title: "교통", text: "지하철 역세권, 광주 송정역과 순환도로에서 가깝습니다." },
    { title: "주차", text: "건물 주차장과 바로 옆 평화공원 주차장을 이용할 수 있습니다." },
  ],
  links: [
    { label: "네이버 지도", href: `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}` },
    { label: "카카오맵", href: `https://map.kakao.com/link/search/${encodeURIComponent(mapQuery)}` },
    { label: "T map", href: `tmap://search?name=${encodeURIComponent(mapQuery)}`, app: true },
    { label: "평화공원 주차장", href: `https://map.naver.com/p/search/${encodeURIComponent(parkQuery)}` },
  ],
};

export const reservation = {
  title: "상담 예약",
  text: "성함과 연락처, 예정일을 남겨주시면 상담 시간 안에 먼저 연락드립니다. 상담을 신청하시면 오픈 이벤트 혜택을 함께 안내해 드려요.",
  image: { src: "/images/gen/hall-aisle.jpg", alt: "샹들리에가 비치는 메종드엘 홀의 미러 버진로드" },
};

export const company = {
  name: "메종드엘 웨딩홀",
  ceo: "최금복",
  address: "광주 서구 시청로 67, 3층(상무지구 CGV건물)",
  bizNo: "866-86-03677",
  tel: "010-8296-3579",
  email: "acehyun2675@naver.com",
  privacyOfficer: "최금복",
};
