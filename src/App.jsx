import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import profile from './data/profile';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1C1A19] font-inter selection:bg-[#FDF2EE] selection:text-[#C86D51]">
      {/* Floating Pill Header */}
      <Navbar />

      {/* 3-Layered 3D Scroll Presentation */}
      <main className="relative">
        {/* Layer 1: Hero & Architectural Intro */}
        <HeroSection profile={profile} />

        {/* Layer 2: About, Identity, Timeline & Skills */}
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />

        {/* Layer 3: System Architecture, Projects & Repos */}
        <ProjectsSection profile={profile} />
        <GitHubSection profile={profile} />

        {/* Layer 3 Finish: Contact & Footer */}
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
