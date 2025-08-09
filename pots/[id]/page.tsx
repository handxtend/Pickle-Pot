
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase'
import Button from '@/components/Button'

export default function PotPage(){
  const params = useParams()
  const id = params?.id as string
  const supabase = supabaseBrowser()
  const [pot,setPot] = useState<any>(null)
  const [players,setPlayers] = useState<any[]>([])
  const [name,setName] = useState('')
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      const { data: pot } = await supabase.from('pots').select('*').eq('id', id).single()
      setPot(pot)
      const { data: roster } = await supabase.from('entries').select('*').eq('pot_id', id).order('created_at')
      setPlayers(roster || [])
      setLoading(false)
    })()
  },[id])

  async function join(){
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) { location.href='/auth'; return }
    // free join in template; replace with Stripe Checkout in production
    const { error } = await supabase.from('entries').insert({ pot_id: id, name })
    if(error) return alert(error.message)
    setPlayers(p=>[...p,{ pot_id:id, name }]); setName('')
  }

  if(loading) return <p>Loading…</p>
  if(!pot) return <p>Not found.</p>

  const total = (players?.length || 0) * (pot.buy_in || 0)

  return (
    <div className="grid gap-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h1 className="text-xl font-bold text-navy">{pot.name}</h1>
        <p className="text-gray-600 mt-1">Buy-in ${pot.buy_in} • Max {pot.max_players} players</p>
        <p className="mt-2 font-semibold">Total pot: ${total}</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-navy">Join this pot</h2>
        <div className="flex gap-2 mt-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="flex-1 border rounded-xl px-3 py-2" />
          <Button onClick={join}>Join</Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Payment flow is stubbed in this template. Hook up Stripe in /app/api/checkout for real charges.</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-navy mb-2">Players ({players.length})</h2>
        <ul className="divide-y">
          {players.map((p,i)=> <li key={i} className="py-2">{p.name}</li>)}
        </ul>
      </div>
    </div>
  )
}
