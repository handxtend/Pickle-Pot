
'use client'
import { useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase'
import Button from '@/components/Button'

export default function AuthPage(){
  const [email,setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const supabase = supabaseBrowser()

  async function handleMagicLink(){
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    if(!error) setSent(true)
    else alert(error.message)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-5 shadow-sm">
      <h1 className="text-xl font-bold text-navy">Sign in</h1>
      <p className="text-gray-600 text-sm mt-1">We’ll send you a magic link.</p>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className="mt-4 w-full border rounded-xl px-3 py-2" />
      <Button className="mt-3" onClick={handleMagicLink}>Send link</Button>
      {sent && <p className="text-green-700 mt-2">Check your inbox!</p>}
    </div>
  )
}
