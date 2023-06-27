import { useSession } from 'next-auth/react';

export function Index() {
  const { data: session } = useSession();
  return (
    <div>
      <span>Hello, {session?.user?.name}</span>
      {/* <Image src={session?.user?.image} alt="" width={150} height={150} /> */}
    </div>
  );
}

export default Index;
