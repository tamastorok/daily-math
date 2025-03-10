"use client";

import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { DaimoPayProvider, getDefaultConfig } from '@daimo/pay'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, WagmiProvider as BaseWagmiProvider } from 'wagmi'

const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'GLOW',
    ssr: false,
  })
)

const queryClient = new QueryClient()

export function Providers({ session, children }: { session: Session | null, children: React.ReactNode }) {
  return (
    <SessionProvider session={session}>
      <BaseWagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DaimoPayProvider>{children}</DaimoPayProvider>
        </QueryClientProvider>
      </BaseWagmiProvider>
    </SessionProvider>
  );
}

