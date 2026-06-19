import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import profile from './data/profile';

export default function App() {
  return (
    <div className="min-h-screen bg-base text-gray-200">
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ProjectsSection profile={profile} />
        <SkillsSection profile={profile} />
        <GitHubSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
