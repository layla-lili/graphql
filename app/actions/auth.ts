'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  (await cookies()).delete('JWT')
  ;(await cookies()).delete('Id')
  redirect('/login')
}

export async function setAuthCookies(token: string, userId: string) {
  const expiration = new Date(new Date().getTime() + 60 * 60 * 1000)
  
  ;(await cookies()).set('JWT', token, {
    expires: expiration,
    path: '/',
    secure: true,
    sameSite: 'strict'
  })
  
  ;(await cookies()).set('Id', userId, {
    expires: expiration,
    path: '/',
    secure: true,
    sameSite: 'strict'
  })
  
  redirect('/')
} 