import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";

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
  {/* resume cards */}
  {resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  )}
  </section>
  </main>
  </>
}
