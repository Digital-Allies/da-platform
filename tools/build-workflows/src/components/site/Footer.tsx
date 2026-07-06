import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin } from 'lucide-react'
import { type SiteSettings } from '@/lib/types'

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal bg-charcoal text-canvas">
      <div className="section-inner mx-auto max-w-site px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            {settings.logo_url ? (
              <Image
                src={settings.logo_url}
                alt={settings.site_title}
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert mb-4"
              />
            ) : (
              <p className="font-headline font-bold text-lg mb-4">{settings.site_title}</p>
            )}
            {settings.tagline && (
              <p className="text-sm text-neutral-400 leading-relaxed">{settings.tagline}</p>
            )}
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-headline font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <address className="not-italic text-sm text-neutral-400 space-y-2">
              {settings.phone && <p>{settings.phone}</p>}
              {settings.email && (
                <p>
                  <a href={`mailto:${settings.email}`} className="hover:text-canvas transition-colors">
                    {settings.email}
                  </a>
                </p>
              )}
              {settings.address && <p className="whitespace-pre-line">{settings.address}</p>}
              {settings.business_hours && (
                <p className="mt-3 whitespace-pre-line">{settings.business_hours}</p>
              )}
            </address>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-headline font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2 text-sm text-neutral-400">
              <Link href="/#services" className="hover:text-canvas transition-colors">Services</Link>
              <Link href="/#about" className="hover:text-canvas transition-colors">About</Link>
              <Link href="/blog" className="hover:text-canvas transition-colors">Blog</Link>
              <Link href="/#contact" className="hover:text-canvas transition-colors">Contact</Link>
            </nav>

            {/* Social */}
            {(settings.instagram_url || settings.facebook_url || settings.linkedin_url) && (
              <div className="flex gap-3 mt-6">
                {settings.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-400 hover:text-canvas transition-colors">
                    <Instagram size={18} />
                  </a>
                )}
                {settings.facebook_url && (
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-400 hover:text-canvas transition-colors">
                    <Facebook size={18} />
                  </a>
                )}
                {settings.linkedin_url && (
                  <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-400 hover:text-canvas transition-colors">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-neutral-500">
          <p>&copy; {year} {settings.site_title}. All rights reserved.</p>
          <p>
            Site by{' '}
            <a href="https://digitalallies.co" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">
              Digital Allies
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
