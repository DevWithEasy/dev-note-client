import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/note/edit/1'>
      <p>New Note</p>
      </Link>
    </div>
  );
}
