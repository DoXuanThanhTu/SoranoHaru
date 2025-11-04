// // components/CategorySection.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
// }

// interface Movie {
//   _id: string;
//   title: string;
//   slug: string;
//   thumbnail: string;
//   episodes: number;
// }

// interface Props {}

// const Categories: React.FC<Props> = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [moviesByCategory, setMoviesByCategory] = useState<
//     Record<string, Movie[]>
//   >({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const catRes = await axios.get<Category[]>("/categories");
//         setCategories(catRes.data);

//         // Fetch movies for each category
//         const moviesRes = await axios.get<Movie[]>("/movies");
//         const moviesMap: Record<string, Movie[]> = {};

//         catRes.data.forEach((cat) => {
//           moviesMap[cat.slug] = moviesRes.data.filter(
//             (movie) => movie.slug === cat.slug
//           );
//         });

//         setMoviesByCategory(moviesMap);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-10">
//       {categories.map((cat) => (
//         <div key={cat._id}>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">{cat.name} mới</h2>
//             <a
//               href={`/categories/${cat.slug}`}
//               className="text-sm text-gray-400 hover:underline"
//             >
//               Xem toàn bộ &gt;
//             </a>
//           </div>
//           <div className="flex overflow-x-auto gap-4">
//             {moviesByCategory[cat.slug]?.map((movie) => (
//               <div key={movie._id} className="min-w-[150px]">
//                 <img
//                   src={movie.thumbnail}
//                   alt={movie.title}
//                   className="w-full h-40 object-cover rounded-lg"
//                 />
//                 <h3 className="mt-2 font-medium">{movie.title}</h3>
//                 <p className="text-sm text-gray-400">{movie.episodes} tập</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;
