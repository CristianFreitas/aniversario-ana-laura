'use client'

import { useState, useEffect } from 'react'
import { supabase, type Message } from '@/lib/supabase'

export default function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [guestName, setGuestName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Mensagens exemplo para demonstração
  const sampleMessages: Message[] = [
    {
      id: 1,
      guest_name: "Família Santos",
      message: "Ana Laura, que este novo ciclo seja repleto de alegrias, conquistas e muita felicidade! Parabéns pelos seus 15 anos! 🎉💖",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      guest_name: "Tia Maria",
      message: "Minha querida sobrinha, você é uma menina especial e tenho certeza de que o futuro te reserva coisas maravilhosas! ✨",
      created_at: "2024-01-15T14:20:00Z"
    },
    {
      id: 3,
      guest_name: "Amigos da escola",
      message: "Ana, você é uma amiga incrível! Que seus 15 anos sejam o início de muitas aventuras e momentos especiais! 🌟",
      created_at: "2024-01-15T16:45:00Z"
    }
  ]

  useEffect(() => {
    loadMessages()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const loadMessages = async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (data && !error) {
          setMessages(data)
        } else {
          // Fallback para mensagens de exemplo
          setMessages(sampleMessages)
        }
      } else {
        // Modo sem Supabase - usar mensagens de exemplo
        setMessages(sampleMessages)
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
      setMessages(sampleMessages)
    }
  }

  const submitMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !newMessage.trim()) return

    setIsSubmitting(true)
    try {
      const messageData: Message = {
        guest_name: guestName.trim(),
        message: newMessage.trim(),
        created_at: new Date().toISOString()
      }

      if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .insert([messageData])
          .select()

        if (data && !error) {
          setMessages(prev => [data[0], ...prev])
          setNewMessage('')
          setGuestName('')
          setShowForm(false)
        } else {
          // Fallback para modo offline
          const localMessage = {
            ...messageData,
            id: Date.now()
          }
          setMessages(prev => [localMessage, ...prev])
          setNewMessage('')
          setGuestName('')
          setShowForm(false)
        }
      } else {
        // Modo sem Supabase
        const localMessage = {
          ...messageData,
          id: Date.now()
        }
        setMessages(prev => [localMessage, ...prev])
        setNewMessage('')
        setGuestName('')
        setShowForm(false)
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      // Ainda assim adiciona localmente
      const localMessage = {
        id: Date.now(),
        guest_name: guestName.trim(),
        message: newMessage.trim(),
        created_at: new Date().toISOString()
      }
      setMessages(prev => [localMessage, ...prev])
      setNewMessage('')
      setGuestName('')
      setShowForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section id="messages" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Mural de Recados
        </h2>
        
        {/* Button to add message */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            {showForm ? '❌ Cancelar' : '💌 Deixar Recado'}
          </button>
        </div>

        {/* Message Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 animate-fadeIn">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              ✨ Deixe seu recado para Ana Laura
            </h3>
            
            <form onSubmit={submitMessage} className="space-y-6">
              <div>
                <label htmlFor="guestName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu Nome:
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Digite seu nome..."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sua Mensagem:
                </label>
                <textarea
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Escreva uma mensagem carinhosa para Ana Laura..."
                  required
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !guestName.trim() || !newMessage.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : '💖 Enviar Recado'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message, index) => (
            <div 
              key={message.id || index}
              className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {message.guest_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 truncate">
                    {message.guest_name}
                  </h4>
                  {message.created_at && (
                    <p className="text-xs text-gray-500">
                      {formatDate(message.created_at)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4">
                <p className="text-gray-700 leading-relaxed">
                  {message.message}
                </p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <span className="text-pink-500">💖</span>
              </div>
            </div>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💌</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Nenhum recado ainda
            </h3>
            <p className="text-gray-500">
              Seja o primeiro a deixar uma mensagem especial para Ana Laura!
            </p>
          </div>
        )}

        {/* Inspirational message */}
        <div className="mt-12 text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-lg text-gray-700 italic">
            &ldquo;Cada mensagem é um presente especial que guardará para sempre no coração.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
