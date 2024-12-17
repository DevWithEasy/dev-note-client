import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/notes/edit/1'>
      <p>New Note</p>
      </Link>
    </div>
  );
}
