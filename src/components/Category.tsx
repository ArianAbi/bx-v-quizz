export default function Category({ category }: { category: string }) {
  if (category === "essentials") {
    return (
      <span className="px-3 py-1 rounded-full bg-sky-500 text-white">
        {category}
      </span>
    );
  }
  if (category === "varyan expert") {
    return (
      <span className="px-3 py-1 rounded-full bg-amber-500 text-white">
        {category}
      </span>
    );
  }
  if (category === "esoteric to varyan") {
    return (
      <span className="px-3 py-1 rounded-full bg-red-500 text-white">
        {category}
      </span>
    );
  }
}
