'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const photos = [
    {
      src: '/images/family.jpeg',
      alt: 'Família',
      caption: 'Momentos especiais em família 💕'
    },
    {
      src: '/images/image-invite.jpeg',
      alt: 'Convite',
      caption: 'O convite especial ✨'
    },
    {
      src: '/images/IMG_1340.JPG',
      alt: 'Momento especial 1',
      caption: 'Recordações preciosas 📸'
    },
    {
      src: '/images/IMG_1351.JPG',
      alt: 'Momento especial 2',
      caption: 'Sorrisos que ficam no coração 😊'
    },
    {
      src: '/images/IMG_6899.JPG',
      alt: 'Momento especial 3',
      caption: 'Cada momento é único 🌟'
    },
    {
      src: '/images/Convite_AnaLaura_12x18cm.png',
      alt: 'Convite Oficial',
      caption: 'Convite oficial da festa 🎉'
    }
  ]

  const openLightbox = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc)
    setImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (imageIndex + 1) % photos.length
    setImageIndex(nextIndex)
    setSelectedImage(photos[nextIndex].src)
  }

  const prevImage = () => {
    const prevIndex = (imageIndex - 1 + photos.length) % photos.length
    setImageIndex(prevIndex)
    setSelectedImage(photos[prevIndex].src)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <section id="gallery" className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Galeria de Momentos
        </h2>
        
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600">
            Relembre os momentos especiais e veja os detalhes da festa ✨
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(photo.src, index)}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-square relative">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{photo.caption}</p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gray-800">🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Mais fotos em breve!
          </h3>
          <p className="text-gray-600 mb-6">
            Após a festa, adicionaremos aqui todas as fotos e vídeos especiais do evento.
            Volte depois para reviver esses momentos únicos!
          </p>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-2xl">
            <span className="text-purple-600">📅</span>
            <span className="text-purple-600 font-semibold">Fotos da festa disponíveis após 11/10/2025</span>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt={photos[imageIndex].alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                priority
              />
              
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <span className="text-gray-800 text-xl">✕</span>
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <span className="text-gray-800 text-xl">‹</span>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <span className="text-gray-800 text-xl">›</span>
              </button>

              {/* Image caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-xl text-center">
                <p className="font-medium">{photos[imageIndex].caption}</p>
                <p className="text-sm opacity-75 mt-1">
                  {imageIndex + 1} de {photos.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo sharing info */}
        <div className="mt-8 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <div className="text-3xl mb-3">📱</div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Compartilhe seus momentos!
          </h4>
          <p className="text-gray-600 text-sm">
            Use a hashtag <span className="font-bold text-purple-600">#AnaLaura15Anos</span> nas suas redes sociais
          </p>
        </div>
      </div>
    </section>
  )
}
