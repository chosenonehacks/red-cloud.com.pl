import React, { useState } from 'react';
import { Shield, Shield as Shield2, ShieldAlert, Lock, Server, Cloud, Send, Menu, X, Award, Briefcase, Bot } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SimpleCaptcha } from './components/SimpleCaptcha';

// Email protection
const encodedEmail = 'cmVkY2xvdWRAcmVkLWNsb3VkLmNvbS5wbA=='; // Base64 encoded email
const decodeEmail = (encoded: string): string => {
  try {
    return atob(encoded);
  } catch {
    return '';
  }
};

function App() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      return;
    }

    // Create email content
    const subject = `Contact from ${formData.name} - ${formData.company}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}`;

    // Create mailto URL with decoded email
    const mailtoUrl = `mailto:${decodeEmail(encodedEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoUrl;
    
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsCaptchaValid(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-red-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield2 className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold">Red Cloud</span>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white">{t('nav.services')}</a>
              <a href="#about" className="text-gray-300 hover:text-white">{t('nav.about')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white">{t('nav.contact')}</a>
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-white">{t('nav.services')}</a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white">{t('nav.about')}</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">{t('nav.contact')}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <a href="#contact" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-900 rounded-lg">
              <ShieldAlert className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('services.redTeam.title')}</h3>
              <p className="text-gray-400">{t('services.redTeam.description')}</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <Lock className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('services.penTest.title')}</h3>
              <p className="text-gray-400">{t('services.penTest.description')}</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <Cloud className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('services.cloud.title')}</h3>
              <p className="text-gray-400">{t('services.cloud.description')}</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
              <Bot className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t('services.genAI.title')}</h3>
              <p className="text-gray-400">{t('services.genAI.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('about.title')}</h2>
            <h3 className="text-xl text-red-500 mb-6">{t('about.subtitle')}</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">{t('about.description')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Qualifications */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold">{t('about.qualifications.title')}</h3>
              </div>
              <div className="space-y-6">
                {t('about.qualifications.items').map((item: any, index: number) => (
                  <div key={index} className="border-l-2 border-red-600 pl-4">
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.certs.map((cert: string, certIndex: number) => (
                        <span
                          key={certIndex}
                          className="px-3 py-1 bg-gray-700 text-sm rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Briefcase className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold">{t('about.experience.title')}</h3>
              </div>
              <ul className="space-y-4">
                {t('about.experience.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 bg-red-600 rounded-full mt-2 mr-3" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('contact.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300">{t('contact.form.company')}</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="mt-1 block w-full rounded-md bg-gray-900 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                ></textarea>
              </div>
              <SimpleCaptcha onValidate={setIsCaptchaValid} />
              <button
                type="submit"
                disabled={!isCaptchaValid}
                className={`w-full flex justify-center items-center gap-2 px-8 py-3 rounded-lg transition-colors ${
                  isCaptchaValid
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-600 cursor-not-allowed text-gray-300'
                }`}
              >
                {t('contact.form.send')}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield2 className="h-6 w-6 text-red-600" />
              <span className="ml-2 text-lg font-bold">Red Cloud</span>
            </div>
            <p className="text-gray-400 text-sm">{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;