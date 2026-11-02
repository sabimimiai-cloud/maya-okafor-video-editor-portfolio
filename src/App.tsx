import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Showreel } from './components/Showreel';
import { SelectedWork } from './components/SelectedWork';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesAndProcess } from './components/ServicesAndProcess';
import { AboutAndCTA } from './components/AboutAndCTA';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { Project } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleOpenContact = (service?: string) => {
    if (service) setSelectedService(service);
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F1E8] flex flex-col selection:bg-[#FF5A4F]/30 selection:text-white">
      {/* Navigation */}
      <Navigation onOpenContact={(s) => handleOpenContact(s)} />

      <main className="flex-1">
        {/* SECTION 1: Deep Charcoal (#111111) — Hook & Large Vertical Showreel */}
        <Hero onOpenContact={() => handleOpenContact()} />
        <Showreel onOpenContact={() => handleOpenContact()} />

        {/* SECTION 2: Warm Cream (#F6F1E8) — Selected Work (4 Large Vertical 9:16 Cards) */}
        <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />

        {/* SECTION 3: Deep Charcoal (#111111) — Raw Footage ↔ Final Edit Slider */}
        <BeforeAfterSlider />

        {/* SECTION 4: Warm Cream (#F6F1E8) — Services (What I Edit) & Simple 4-Step Process */}
        <ServicesAndProcess onOpenContact={(s) => handleOpenContact(s)} />

        {/* SECTION 5: Deep Charcoal (#111111) — Human About Maya & High-Conversion Got Footage CTA */}
        <AboutAndCTA onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => handleOpenContact()} />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        allProjects={PROJECTS}
      />

      {/* Simplified Project Inquiry Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => {
          setContactOpen(false);
          setSelectedService('');
        }}
        preselectedService={selectedService}
      />
    </div>
  );
}
