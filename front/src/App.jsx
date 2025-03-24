// import React from 'react'
import AllRoutes from './config/AllRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const App = () => {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={ queryClient }>
        <AllRoutes />
      </QueryClientProvider>
    </>
  )
}

export default App