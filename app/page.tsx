import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className=" flex flex-row justify-between m-3">
        <div> logo</div>
        <ul className="flex justify-between gap-x-5">
          <li>
            <Link href="#"> about</Link>
          </li>
          <li>
            <Link href="#"> our offering </Link>
          </li>
          <li>
            <Link href="#"> set up my busing </Link>
          </li>
        </ul>
        <div>
          <button className="rounded-lg bg-yellow-500">contact us </button>
        </div>
      </div>
    </main>
  );
}
