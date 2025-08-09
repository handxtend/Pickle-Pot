
import Link from 'next/link'
import Button from '@/components/Button'

export default function Home(){
  return (
    <div className="grid gap-6">
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-navy">Create or Join a Pot</h1>
        <p className="text-gray-600 mt-1">Collect buy-ins, track entries, and payout winners.</p>
        <div className="flex gap-3 mt-4">
          <Link href="/pots/new"><Button>Create a Pot</Button></Link>
          <Link href="/pots"><Button className="bg-gray-900 text-white">Browse Pots</Button></Link>
        </div>
      </section>
      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-navy">How it works</h2>
        <ol className="list-decimal ml-5 text-gray-700 mt-2 space-y-1">
          <li>Sign in with email (magic link) to create or join pots.</li>
          <li>Set buy-in amount and max players. Share the pot link.</li>
          <li>Players join and pay. See the live roster and total pot.</li>
          <li>Close the pot and record winners — auto-calculated payouts.</li>
        </ol>
      </section>
    </div>
  )
}
