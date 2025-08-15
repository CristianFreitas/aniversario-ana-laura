'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import CountdownTimer from '@/components/CountdownTimer'
import RSVPForm from '@/components/RSVPForm'
import LocationSection from '@/components/LocationSection'
import GiftList from '@/components/GiftList'
import MessageWall from '@/components/MessageWall'
import PhotoGallery from '@/components/PhotoGallery'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header com imagem de fundo */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/family.jpeg"
            alt="Ana Laura"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-500/20 to-indigo-500/20"></div>
        </div>
        
        <div className={`relative z-10 text-center px-4 sm:px-6 md:px-8 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-3 sm:mb-4">
              Ana Laura
            </h1>
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-light text-gray-700">
              <span className="animate-pulse">✨</span>
              <span>15 Anos</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-3xl p-3 sm:p-6 md:p-8 mx-2 sm:mx-4 md:mx-auto max-w-2xl shadow-2xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-4 md:mb-6 italic leading-relaxed text-center px-1">
              &ldquo;A felicidade pode ser encontrada até nos momentos mais difíceis, 
              se você lembrar de acender a luz.&rdquo;
            </p>
            <CountdownTimer targetDate="2025-10-11T21:00:00.000Z" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* RSVP Section */}
      <section id="rsvp" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
            Confirme sua Presença
          </h2>
          <RSVPForm />
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Date & Time */}
            <div className="text-center bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-lg">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Data & Horário</h3>
              <p className="text-xl text-gray-600">11 de Outubro de 2025</p>
              <p className="text-lg text-gray-600">às 21:00h</p>
            </div>

            {/* Dress Code */}
            <div className="text-center bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-8 shadow-lg">
              <div className="text-6xl mb-4">👗</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Dress Code</h3>
              <p className="text-xl text-gray-600 font-semibold">Passeio Completo</p>
              <p className="text-sm text-gray-500 mt-2">Vista-se com elegância!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <LocationSection />

      {/* Gift List */}
      <GiftList />

      {/* Message Wall */}
      <MessageWall />

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Ana Laura</h3>
            <p className="text-pink-100">15 Anos ✨</p>
          </div>
          <div className="text-sm text-pink-100">
            <p>&ldquo;Mesmo a noite mais escura vai terminar, e o sol vai nascer.&rdquo;</p>
            <p className="mt-2">Feito com 💖 para um dia especial</p>
          </div>
        </div>
      </footer>
    </div>
  )
}