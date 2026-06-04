import { useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Clock, Users, Wrench, FileCheck, Phone, Mail, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Wrench,
      title: 'Cambio de Parabrisas',
      description: 'Instalación profesional de parabrisas originales y de alta calidad para todo tipo de vehículos.'
    },
    {
      icon: Shield,
      title: 'Reparación de Vidrios',
      description: 'Reparamos astilladuras y grietas menores para extender la vida útil de tu parabrisas.'
    },
    {
      icon: FileCheck,
      title: 'Trabajo con Aseguradoras',
      description: 'Gestionamos todo el trámite con tu aseguradora para que no te preocupes por nada.'
    }
  ];

  const howWeWork = [
    {
      step: '1',
      title: 'Diagnóstico',
      description: 'Evaluamos el estado del vidrio y determinamos si necesita reparación o reemplazo completo.'
    },
    {
      step: '2',
      title: 'Reparación o Reemplazo',
      description: 'Nuestros técnicos especializados realizan el trabajo con materiales de primera calidad.'
    },
    {
      step: '3',
      title: 'Entrega del Vehículo',
      description: 'Te devolvemos tu vehículo en perfectas condiciones, listo para circular con total seguridad.'
    }
  ];

  const features = [
    { icon: CheckCircle, text: 'Más de 15 años de experiencia' },
    { icon: Shield, text: 'Garantía en todos nuestros trabajos' },
    { icon: Clock, text: 'Servicio rápido y eficiente' },
    { icon: Users, text: 'Técnicos certificados' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0b0f2f] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">FG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">FULLGLASS</h1>
                <p className="text-xs text-gray-600">Especialistas en Parabrisas</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-[#0b0f2f] hover:text-[#1a1f4f] font-medium transition-colors"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-[#0b0f2f] text-white rounded-lg hover:bg-[#1a1f4f] transition-colors font-medium"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1772032057765-3970ebba6e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXIlMjBnbGFzc3xlbnwxfHx8fDE3NzY3OTE4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f2f]/90 to-[#0b0f2f]/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            FULLGLASS
          </h1>
          <p className="text-2xl md:text-3xl text-blue-200 mb-4">
            Especialistas en Parabrisas
          </p>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Más de 15 años brindando soluciones profesionales para el cuidado y reemplazo de vidrios automotrices
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0b0f2f] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-bold text-lg"
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#0b0f2f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-800">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
              <p className="text-lg text-gray-600 mb-4">
                FULLGLASS es una empresa líder en el mercado de vidrios automotrices, con más de 15 años de experiencia
                brindando servicios de excelencia a nuestros clientes.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Contamos con un equipo de técnicos altamente capacitados y certificados, utilizando únicamente materiales
                de primera calidad que garantizan la seguridad y durabilidad de cada instalación.
              </p>
              <p className="text-lg text-gray-600">
                Nuestra misión es brindar soluciones rápidas, confiables y profesionales para el cuidado de los vidrios
                de tu vehículo, trabajando en conjunto con las principales aseguradoras del país.
              </p>
            </div>

            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771340012378-3c86cb649193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwc2VydmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzY3OTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mecánico profesional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Trabajamos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Cómo Trabajamos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro proceso es simple, rápido y profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howWeWork.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#0b0f2f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales para el cuidado de los vidrios de tu vehículo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#0b0f2f] to-[#1a1f4f] rounded-xl shadow-xl p-8 text-white hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-blue-100">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galería de Trabajos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Trabajos</h2>
            <p className="text-lg text-gray-600">Calidad garantizada en cada instalación</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1738769527012-375706b0d36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjYXIlMjB3aW5kc2hpZWxkJTIwcmVwYWlyfGVufDF8fHx8MTc3Njc5MTg2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Trabajo de reparación"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618866157430-b4d2e6a8800b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBnbGFzc3xlbnwxfHx8fDE3NzY3OTE4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Interior de auto de lujo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770656505709-fd97236989b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxhdXRvbW90aXZlJTIwc2VydmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzY3OTE4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Técnico trabajando"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#0b0f2f] to-[#1a1f4f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Regístrate ahora y accede a nuestro sistema de gestión para solicitar tus servicios de forma rápida y sencilla
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-[#0b0f2f] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
          >
            Crear cuenta gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">FG</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">FULLGLASS</h3>
                  <p className="text-xs text-gray-400">Especialistas en Parabrisas</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Soluciones profesionales para el cuidado de los vidrios de tu vehículo desde 2010.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">+54 11 5555-1234</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">contacto@fullglass.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/login')} className="block text-sm hover:text-white transition-colors">
                  Iniciar sesión
                </button>
                <button onClick={() => navigate('/register')} className="block text-sm hover:text-white transition-colors">
                  Registrarse
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © 2026 FULLGLASS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
