import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <div >
    <div className="text-3xl text-teal-700">JWT TOKEN</div>
    <Link href={"/login"}>Login Page</Link> <br/>
    <Link href={"/protect"}>Protect Page</Link><br/>
   
  </div>;
}
