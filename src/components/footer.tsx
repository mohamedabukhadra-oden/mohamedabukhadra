import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1B3B36] text-white/80">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Mohamed Abu Khadra</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Business Leader · Strategist · Visiting Professor · Author.<br />
              I build systems that have to work in real life.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A86A] mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#C9A86A]">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#C9A86A]">About</Link></li>
              <li><Link href="/books" className="hover:text-[#C9A86A]">Books</Link></li>
              <li><Link href="/speaking" className="hover:text-[#C9A86A]">Speaking & Teaching</Link></li>
              <li><Link href="/insights" className="hover:text-[#C9A86A]">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A86A]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C9A86A] mb-3">Books</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/books/before-you-say-yes-to-the-dog" className="hover:text-[#C9A86A]">Before You Say Yes to the Dog</Link></li>
              <li><Link href="/books/after-you-say-yes-to-the-dog" className="hover:text-[#C9A86A]">After You Say Yes to the Dog <span className="text-white/40">(2026)</span></Link></li>
              <li><Link href="/quick-check" className="hover:text-[#C9A86A]">Family Readiness Quick Check</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Mohamed Abu Khadra. All rights reserved.</p>
          <p className="text-xs text-white/50 font-serif italic">System first. Puppy second. Family always.</p>
        </div>
      </div>
    </footer>
  )
}
