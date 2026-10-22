import Image from "next/image"

// Screens are cropped from the App Store sheets in public/screens (732x1596).
export function PhoneFrame({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={`phone ${className}`}>
      <Image src={src} alt={alt} width={732} height={1596} sizes={sizes} priority={priority} />
    </div>
  )
}
