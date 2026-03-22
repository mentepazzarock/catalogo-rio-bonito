import React from 'react'
import LoginPage from '@/app/login/page'

export default function CadastroConsumerPage() {
    // Directly point consumer registrations to the login/auth flow that we already made robust.
    return <LoginPage />
}
