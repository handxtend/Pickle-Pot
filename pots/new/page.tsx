
'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function NewPot(){
  const [name,setName] = useState('Sunday Round Robin')
  const [buyIn,setBuyIn] = useState(10)
  const [maxPlayers,setMaxPlayers] = useState(16)
  const supabase = supabaseBrowser()
  const router = useRouter()

  async function create(){
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){ return router.push('/auth') }
    const { data, error } = await supabase.from('pots').insert({ name, buy_in: buyIn, max_players: maxPlayers, owner_id: user.id }).select().single()
    if(error) return alert(error.message)
    router.push(`/pots/${data.id}`)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-5 shadow-sm">
      <h1 className="text-xl font-bold text-navy">Create a Pot</h1>
      <label className="block mt-3 text-sm text-gray-600">Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
      <label className="block mt-3 text-sm text-gray-600">Buy-in ($)</label>
      <input type="number" value={buyIn} onChange={e=>setBuyIn(parseFloat(e.target.value))} className="w-full border rounded-xl px-3 py-2" />
      <label className="block mt-3 text-sm text-gray-600">Max players</label>
      <input type="number" value={maxPlayers} onChange={e=>setMaxPlayers(parseInt(e.target.value))} className="w-full border rounded-xl px-3 py-2" />
      <Button className="mt-4" onClick={create}>Create</Button>
    </div>
  )
}
