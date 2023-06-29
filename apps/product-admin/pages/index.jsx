import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function Index() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between text-blue-900">
      <h2>
        Hello, <b> {session?.user?.name} </b>
      </h2>
      <div className="flex gap-2 pr-2 overflow-hidden text-black bg-gray-300 rounded-lg">
        <Image
          className="w-6 h-6"
          src={session?.user?.image}
          alt=""
          width={50}
          height={50}
        />
        <span>{session?.user?.name}</span>
      </div>
    </div>
  );
}

export default Index;
