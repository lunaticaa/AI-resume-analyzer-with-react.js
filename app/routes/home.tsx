import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "smart and intelligance resume" },
  ];
}


export default function Home() {
  return <>
  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
  <Navbar />
  <section className="main-section">
    <div className="page-heading">
      <h1>Track Your Applications</h1>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
    </div>
  </section>
  </main>
  </>
}
