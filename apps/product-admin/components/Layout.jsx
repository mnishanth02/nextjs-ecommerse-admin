import { useSession, signIn } from 'next-auth/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Nav from './nav';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Layout({ children }) {
  const { data: session } = useSession();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {},
    },
  });

  if (!session) {
    return (
      <div className="flex items-center w-screen h-screen bg-blue-900">
        <div className="w-full text-center">
          <button
            className="p-2 px-4 bg-white rounded-lg"
            onClick={() => signIn('google')}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen bg-blue-900">
      <QueryClientProvider client={queryClient}>
        <Nav />
        <div className="flex-grow p-4 mt-2 mb-2 mr-2 bg-white rounded-lg">
          {children}
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default Layout;
