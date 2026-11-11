import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import HackathonsSection from './components/HackathonsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import profile from './data/profile';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1C1A19] font-inter selection:bg-[#FDF2EE] selection:text-[#A9533A]">
      <Navbar />

      <main id="main" className="relative">
        {/* 01. Intro */}
        <HeroSection profile={profile} />

        {/* 02. About: story, timeline, experience, research, skills */}
        <AboutSection profile={profile} />
        <ExperienceSection profile={profile} />
        <SkillsSection profile={profile} />

        {/* 03. Projects: featured, more, hackathons, GitHub */}
        <ProjectsSection profile={profile} />
        <HackathonsSection profile={profile} />
        <GitHubSection profile={profile} />

        {/* 04. Contact */}
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
