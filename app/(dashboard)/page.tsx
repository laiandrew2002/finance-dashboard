import  { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <p>This is an authenticated route</p>
      <UserButton />
    </div>
  );
}
