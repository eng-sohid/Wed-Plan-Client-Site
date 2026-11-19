import Link from "next/link";
import {
  Camera,
  Building2,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  Shirt,
} from "lucide-react";

const items = [
  { name: "Photography & Videography", icon: Camera },
  { name: "Wedding Venues", icon: Building2 },
  { name: "Decoration & Florist", icon: Flower2 },
  { name: "Catering Services", icon: UtensilsCrossed },
  { name: "Makeup & Styling", icon: Sparkles },
  { name: "Wedding Fashion", icon: Shirt },
];

export default function Categories() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Wedding Service Categories
          </h2>
          <p className="mt-2 text-gray-500">
            Explore services by what you need
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              href={`/services?category=${encodeURIComponent(name)}`}
              className="flex h-full flex-col items-center gap-3 rounded-2xl border bg-rose-50/50 p-6 text-center transition hover:-translate-y-1 hover:border-rose-300 hover:shadow-md"
            >
              <span className="rounded-full bg-rose-100 p-4 text-rose-600">
                <Icon className="h-7 w-7" />
              </span>
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
