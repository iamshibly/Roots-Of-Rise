import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-light to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Image
          src="/images/logo/roots-of-rise-logo.png"
          alt="Roots of Rise"
          width={64}
          height={64}
          className="mx-auto mb-6 object-contain"
        />
        <h1 className="font-heading text-6xl font-extrabold text-brand-green mb-2">404</h1>
        <p className="font-heading text-xl font-bold text-neutral-text mb-3">Page Not Found</p>
        <p className="text-neutral-muted text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/contact" className="btn-outline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
