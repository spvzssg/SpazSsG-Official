import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin Management', description: 'Admin management placeholder.' }

export default function AdminStaticPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Static site export</div><h1 className="page-heading">Admin CMS</h1><p>The site is exported as static HTML for InfinityFree hosting. The database-backed admin CMS requires a Node.js server (such as Vercel or Supabase Studio) and has been excluded from this static build.</p><div className="hero__actions"><Link className="button" href="/">Return home</Link></div></div></section>
  </>
}
