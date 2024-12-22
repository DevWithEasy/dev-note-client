import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/note/edit/1'>
      <p>New Note</p>
      </Link>
      <Link href='/user/signin'>
      <p>Signin</p>
      </Link>
      <Link href='/user/signup'>
      <p>signup</p>
      </Link>
    </div>
  );
}
