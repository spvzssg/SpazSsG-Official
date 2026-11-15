import Image from 'next/image'

export default function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/spaz-ssg-logo.png"
      alt="Spaz SsG official logo"
      width={1842}
      height={854}
      sizes="(max-width: 640px) 82vw, (max-width: 920px) 48vw, 640px"
      className={className}
      priority
    />
  )
}
