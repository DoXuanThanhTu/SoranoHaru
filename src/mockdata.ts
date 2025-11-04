import {
  MovieType,
  EpisodeType,
  CommentType,
  CategoryType,
  CountryType,
} from "./types";

export const categories = [
  {
    id: "620f3d2b91fa4af90ab697fe",
    name: "Chính kịch",
    slug: "chinh-kich",
  },
];

export const countries = [
  {
    id: "62093063196e9f4ab6b448b8",
    name: "Trung Quốc",
    slug: "trung-quoc",
    isoCode: "CN",
  },
];

export const movie = {
  id: "6904354cc8c161856f6a0590",
  slug: "nu-y-tien-kich-luc",
  name: "Nữ Y Tiến Kích Lục",
  originName: "Doctor's Attack",
  description:
    "Sau khi bị vu oan, nữ y sĩ tài ba Dung Trạch Lan tiến vào hoàng cung, quyết tâm đột nhập vào Y viện Hoàng gia, nơi nam giới thống trị. Bất chấp sự chế giễu và định kiến, cô chứng minh tài năng y thuật của mình trong cung điện - biến những khó khăn của mình thành một câu chuyện đầy cảm hứng về lòng dũng cảm, công lý và bình đẳng trên hành trình trở thành nữ quan đầu tiên của đế chế.",
  type: "series",
  status: "ongoing",
  year: 2025,
  duration: "? phút/tập",
  quality: "HD",
  language: "Vietsub",
  viewCount: 0,
  thumbUrl:
    "https://img.ophim.live/uploads/movies/nu-y-tien-kich-luc-thumb.jpg",
  posterUrl:
    "https://img.ophim.live/uploads/movies/nu-y-tien-kich-luc-poster.jpg",
  categoryIds: ["620f3d2b91fa4af90ab697fe"],
  countryIds: ["62093063196e9f4ab6b448b8"],
  actor: ["洪瀟", "楊澤", "沈芝弈", "徐子璇", "趙啟玥"],
  director: [""],
  imdb: { voteAverage: 0, voteCount: 0 },
  tmdb: { voteAverage: 0, voteCount: 0 },
  episodeCount: 28,
  latestEpisode: "Tập 12",
};

export const episodes = [
  {
    id: "server1",
    movieId: "6904354cc8c161856f6a0590",
    serverName: "Vietsub #1",
    isAI: false,
    serverData: [
      {
        name: "1",
        slug: "1",
        filename: "Nữ Y Tiến Kích Lục - Tập 1",
        linkEmbed:
          "https://vip.opstream10.com/share/446ce3c52d4376f1e86faa0c9edd702d",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31006_446ce3c5/index.m3u8",
      },
      {
        name: "2",
        slug: "2",
        filename: "Nữ Y Tiến Kích Lục - Tập 2",
        linkEmbed:
          "https://vip.opstream10.com/share/71c53d2fa50393f9549979e3488cab04",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31007_71c53d2f/index.m3u8",
      },
      {
        name: "3",
        slug: "3",
        filename: "Nữ Y Tiến Kích Lục - Tập 3",
        linkEmbed:
          "https://vip.opstream10.com/share/0972350bc45d5d235a2e01d7a1a5b43c",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31008_0972350b/index.m3u8",
      },
      {
        name: "4",
        slug: "4",
        filename: "Nữ Y Tiến Kích Lục - Tập 4",
        linkEmbed:
          "https://vip.opstream10.com/share/27c8efa32c0738c9d83b37d1882d97ea",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31009_27c8efa3/index.m3u8",
      },
      {
        name: "5",
        slug: "5",
        filename: "Nữ Y Tiến Kích Lục - Tập 5",
        linkEmbed:
          "https://vip.opstream10.com/share/4d5392d91f16d558eef803211e81f4f2",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31010_4d5392d9/index.m3u8",
      },
      {
        name: "6",
        slug: "6",
        filename: "Nữ Y Tiến Kích Lục - Tập 6",
        linkEmbed:
          "https://vip.opstream10.com/share/f81b2a1d75d01e35b2ac8c0f6a8ec78b",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31012_f81b2a1d/index.m3u8",
      },
      {
        name: "7",
        slug: "7",
        filename: "Nữ Y Tiến Kích Lục - Tập 7",
        linkEmbed:
          "https://vip.opstream10.com/share/8becabfd3781cac86c0988f11d76e690",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31013_8becabfd/index.m3u8",
      },
      {
        name: "8",
        slug: "8",
        filename: "Nữ Y Tiến Kích Lục - Tập 8",
        linkEmbed:
          "https://vip.opstream10.com/share/6b8df87e67318f5c70bf4ffad3485829",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31014_6b8df87e/index.m3u8",
      },
      {
        name: "9",
        slug: "9",
        filename: "Nữ Y Tiến Kích Lục - Tập 9",
        linkEmbed:
          "https://vip.opstream10.com/share/f28dc7008533c025bedbdc88b3640ae9",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31030_f28dc700/index.m3u8",
      },
      {
        name: "10",
        slug: "10",
        filename: "Nữ Y Tiến Kích Lục - Tập 10",
        linkEmbed:
          "https://vip.opstream10.com/share/8c711b2a61cccea42c643ce986dc203a",
        linkM3u8:
          "https://vip.opstream10.com/20251102/31031_8c711b2a/index.m3u8",
      },
      {
        name: "11",
        slug: "11",
        filename: "Nữ Y Tiến Kích Lục - Tập 11",
        linkEmbed:
          "https://vip.opstream10.com/share/eb8348943495b531aad669701d56f569",
        linkM3u8:
          "https://vip.opstream10.com/20251103/31046_eb834894/index.m3u8",
      },
      {
        name: "12",
        slug: "12",
        filename: "Nữ Y Tiến Kích Lục - Tập 12",
        linkEmbed:
          "https://vip.opstream10.com/share/c1eb1949c87d3bb139951cb0ae9ddeee",
        linkM3u8:
          "https://vip.opstream10.com/20251103/31047_c1eb1949/index.m3u8",
      },
    ],
  },
];

export const comments: CommentType[] = [
  {
    id: "c001",
    movieId: "m002",
    content: "Xem tập 3 phê cực 😎",
    likes: 12,
    dislikes: 0,
    createdAt: new Date(),
  },
  {
    id: "c002",
    movieId: "m002",
    content: "Tony quá ngầu luôn!",
    likes: 7,
    dislikes: 0,
    createdAt: new Date(),
  },
];
export const cast = [
  {
    name: "Cho Yeo-jeong",
    role: "Phóng viên Baek Sun-ju",
    image:
      "https://cdn.kbizoom.com/media/2022/04/20110750/lee-sun-bin-lee-kwang-soo-20042022-1.webp",
  },
  {
    name: "Jung Sung-il",
    role: "Bác sĩ Lee Young-hoon",
    image:
      "https://cdn.kbizoom.com/media/2022/04/20110750/lee-sun-bin-lee-kwang-soo-20042022-1.webp",
  },
  {
    name: "Kim Tae-han",
    role: "Thanh tra Park",
    image:
      "https://cdn.kbizoom.com/media/2022/04/20110750/lee-sun-bin-lee-kwang-soo-20042022-1.webp",
  },
  {
    name: "Park Ji-yeon",
    role: "Nạn nhân Han Mi-jung",
    image:
      "https://cdn.kbizoom.com/media/2022/04/20110750/lee-sun-bin-lee-kwang-soo-20042022-1.webp",
  },
  {
    name: "Lee Sun-bin",
    role: "Cảnh sát nữ Kim Hye-jin",
    image:
      "https://cdn.kbizoom.com/media/2022/04/20110750/lee-sun-bin-lee-kwang-soo-20042022-1.webp",
  },
];
export const recommendations = [
  {
    title: "Lời Chưa Nói (Family Secret)",
    year: 2025,
    category: "Tâm lý",
    image:
      "https://6.soompi.io/wp-content/uploads/image/20250611001648_Lee-Sun-Bin.jpg?s=900x600&e=t",
  },
  {
    title: "Nhân Diện (The Ugly)",
    year: 2024,
    category: "Hình sự",
    image:
      "https://6.soompi.io/wp-content/uploads/image/20250611001648_Lee-Sun-Bin.jpg?s=900x600&e=t",
  },
  {
    title: "Bọ Ngựa (Mantis)",
    year: 2025,
    category: "Kinh dị",
    image:
      "https://6.soompi.io/wp-content/uploads/image/20250611001648_Lee-Sun-Bin.jpg?s=900x600&e=t",
  },
  {
    title: "Chuyện Tình Tóc Rối (Love Entangled)",
    year: 2024,
    category: "Lãng mạn",
    image:
      "https://6.soompi.io/wp-content/uploads/image/20250611001648_Lee-Sun-Bin.jpg?s=900x600&e=t",
  },
];
