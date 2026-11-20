export function Avatar({
  src,
  name,
  size = 32,
}: {
  src?: string | null;
  name?: string | null;
  size?: number;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name || "avatar"}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full border border-[#d8b68c]/30 object-cover"
      />
    );
  }

  return (
    <span
      style={{
        width: size,
        height: size,
        fontSize: size / 2.4,
      }}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#d8b68c]/30 bg-[#d8b68c]/10 font-semibold text-[#d8b68c]"
    >
      {(name || "?").charAt(0).toUpperCase()}
    </span>
  );
}
