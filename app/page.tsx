import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="w-max ">
     <div className=" flex space-between m-3">
       <div > logo</div>
       <ul>
        <li><Link href="#">  about</Link></li>
        <li><Link href="#">  our offering </Link></li>
        <li><Link href="#">  set up my busing </Link></li>

        
       </ul>
       <div><button className="rounded-lg bg-yellow-500">contact us </button></div>
     </div>
    </main>
  )
}
