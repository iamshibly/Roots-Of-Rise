import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-green-light to-white flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/images/logo/roots-of-rise-logo.png"
          alt="Roots of Rise"
          width={64}
          height={64}
          className="w-16 h-16 object-contain mx-auto mb-4"
        />
        <Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-4" />
        <h1 className="font-heading text-xl font-bold text-neutral-text">Verifying your identity...</h1>
        <p className="text-neutral-muted mt-2 text-sm">Please wait while we sign you in.</p>
      </div>
    </div>
  )
}
