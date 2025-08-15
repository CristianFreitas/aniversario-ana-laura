'use client'

import { useState } from 'react'

export default function GiftList() {
  const [showPix, setShowPix] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)
  
  const pixKey = "31 99526-8925"
  const pixName = "Maria Rosa Fernandes"

  const giftSuggestions = [
    {
      category: "Calçados",
      items: ["Tênis", "Sandálias", "Sapatilhas"],
      size: "37/38",
      icon: "👠"
    },
    {
      category: "Roupas",
      items: ["Blusas", "Vestidos", "Casacos"],
      size: "M",
      icon: "👚"
    },
    {
      category: "Calças e Shorts",
      items: ["Jeans", "Shorts", "Leggings"],
      size: "38/40",
      icon: "👖"
    },
    {
      category: "Perfumes e Cosméticos",
      items: ["Perfumes", "Cremes", "Fragrâncias doces"],
      size: "",
      icon: "💄"
    },
    {
      category: "Acessórios",
      items: ["Joias", "Bijuterias", "Bolsas"],
      size: "Prata e Dourado",
      icon: "💍"
    },
    {
      category: "Maquiagem",
      items: ["Paletas", "Batons", "Base"],
      size: "",
      icon: "💋"
    }
  ]

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopiedPix(true)
      setTimeout(() => setCopiedPix(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar PIX:', err)
    }
  }

  return (
    <section id="gifts" className="py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Lista de Presentes
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {giftSuggestions.map((category) => (
            <div 
              key={category.category}
              className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">
                  {category.category}
                </h3>
                {category.size && (
                  <p className="text-purple-600 font-semibold">
                    Tamanho: {category.size}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-3 text-center"
                  >
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PIX Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              💝 Prefere presentear com PIX?
            </h3>
            <p className="text-gray-600 mb-6">
              Sua contribuição será muito especial para tornar este dia ainda mais memorável!
            </p>
          </div>

          <button
            onClick={() => setShowPix(!showPix)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 mb-6"
          >
            {showPix ? '🔒 Ocultar PIX' : '💳 Mostrar Dados PIX'}
          </button>

          {showPix && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 animate-fadeIn">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">📱</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Dados para PIX
                </h4>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Chave PIX (Telefone):</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800">{pixKey}</span>
                    <button
                      onClick={copyPixKey}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      {copiedPix ? '✓ Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Nome:</p>
                  <p className="text-xl font-semibold text-gray-800">{pixName}</p>
                </div>

                <div className="text-sm text-gray-500 mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="flex items-center justify-center">
                    <span className="mr-2">💡</span>
                    Não esqueça de colocar seu nome na descrição do PIX!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 italic">
              &ldquo;O presente mais importante é a sua presença em meu dia especial! 💖&rdquo;
            </p>
          </div>
        </div>

        {/* QR Code Section Placeholder */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 Dica: Salve este site nos seus favoritos para consultar as informações sempre que precisar!
          </p>
        </div>
      </div>
    </section>
  )
}
