'use client'

export default function LocationSection() {
  const restaurantName = "Restaurante do Bengala"
  const address = "Endereço do Restaurante do Bengala" // Você pode atualizar com o endereço real
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(restaurantName)}`
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(restaurantName)}`

  return (
    <section id="location" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Local da Festa
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Location Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📍</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {restaurantName}
                  </h3>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">🗺️</span>
                  Google Maps
                </a>
                
                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">🚗</span>
                  Waze
                </a>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Detalhes do Evento
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📅</span>
                  <span className="text-gray-700">11 de Outubro de 2025</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🕘</span>
                  <span className="text-gray-700">21:00h</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">👗</span>
                  <span className="text-gray-700">Passeio Completo</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">🎉</span>
                  <span className="text-gray-700">Festa de 15 Anos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
              {/* Google Maps Embed Placeholder */}
              <iframe
                src={`https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(restaurantName)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 opacity-50"
              ></iframe>
              
              {/* Overlay com informações */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{restaurantName}</h3>
                  <p className="text-sm opacity-90">Clique nos botões acima para abrir no mapa</p>
                </div>
              </div>
              
              {/* Fallback quando não há API key */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-2xl font-bold mb-2">{restaurantName}</h3>
                  <p className="mb-4">{address}</p>
                  <p className="text-sm opacity-90">
                    Use os botões ao lado para abrir no Google Maps ou Waze
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl">
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Informações Importantes
          </h4>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-3">🚗</div>
              <h5 className="font-bold text-gray-800 mb-2">Estacionamento</h5>
              <p className="text-gray-600 text-sm">
                Estacionamento disponível no local
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">♿</div>
              <h5 className="font-bold text-gray-800 mb-2">Acessibilidade</h5>
              <p className="text-gray-600 text-sm">
                Local com acessibilidade para todos
              </p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-3">📞</div>
              <h5 className="font-bold text-gray-800 mb-2">Contato</h5>
              <p className="text-gray-600 text-sm">
                Para dúvidas, entre em contato conosco
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
