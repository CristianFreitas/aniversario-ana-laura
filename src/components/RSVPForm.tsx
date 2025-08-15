'use client'

import { useState, useEffect } from 'react'
import { supabase, type Guest } from '@/lib/supabase'

export default function RSVPForm() {
  const [guestName, setGuestName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [guestStatus, setGuestStatus] = useState<'not_found' | 'pending' | 'confirmed' | 'checking'>('checking')
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Lista de convidados local (fallback caso o Supabase não esteja configurado)
  const guestList = [
    'michele', 'cacilda', 'vó cida', 'vô cicero', 'Tio Mazione', 'Tio Thales', 'Tia Re', 'Rian', 
    'Bernardo', 'Selma', 'Tia beth', 'Tio Bastião', 'Tio Luís', 'Tio Jorge', 'Tio Eduardo', 
    'Tia Maria Do Carmo', 'Tia Eva', 'Ednei', 'Vagner', 'Eninha', 'Tia Marilene', 'dinda milene',
    'Dada e Delvina', 'Taissa', 'dinda jussara e tio dudu', 'tia bel, márcio e maria tereza',
    'Victoria, Murilo e Giselle', 'Maria clara,Iago,Tia Sintya e Lúcio', 'Sarah', 'Lara', 'Isabella',
    'Gabriel', 'Heitor', 'Lucca', 'Caua', 'kayke', 'Kayque', 'Lucas', 'Afonso', 'Ana Clara',
    'Mariana BH', 'Lisa', 'Clarisse', 'Bernardo Dias', 'Bernardo lage', 'Letícia', 'Laís',
    'Priscilla', 'Elis, Miguel, Milena e Serginho', 'gabriel roxo', 'Gabi - carmesia', 'Dani',
    'Maria Eduarda - Carmesia', 'Carol - carmesia', 'Emanuelle', 'Larissa', 'Luara', 'Cirlene',
    'Tátila', 'Lidiane', 'Nara', 'Natecia', 'Maria cruz', 'Mileide', 'ângela e arthur',
    'Tia Ana e Dilson', 'Tia Simone', 'Rosilene e Bengala', 'Mariana e Dona Marta', 'Caio',
    'Adriana', 'Alex', 'Do carmo', 'Douglas', 'Graziele (ótica)', 'Grazielle (unha)', 'Tia Viviane',
    'Lu e Cica', 'Soninha', 'Tia Aline', 'Tia Jessica', 'Arthur lage', 'Pedro Cardoso', 'Sabrina',
    'Natasha', 'Kelly', 'Regi', 'Luiza', 'Erick', 'Kyara', 'Patricia', 'Lister', 'Madalena',
    'Marcelo', 'Syang', 'Aldria', 'Ana Elis', 'Wanderlei', 'Luana', 'Luísa bosi', 'M. Clara Mafra',
    'Bernardo Mafra', 'Arthur Mafra', 'Elis Sana', 'Maria Eduarda, Marco Antônio, Marcela e Miguel',
    'Sarah Lage', 'Cecília, jaqueline e helena', 'Helena magalhães', 'Luiza Soares', 'Duda maciel',
    'Ana Vitória', 'Mateus Lage', 'Gabrielle', 'Maria Clara Duarte', 'Laura Rosa', 'Livia Rolla',
    'Livia', 'Isadora', 'Ana Beatriz', 'Thiago', 'Manuela', 'guizin', 'giselly', 'ariadina'
  ]

  const checkGuest = async () => {
    if (!guestName.trim()) {
      setGuestStatus('checking')
      return
    }

    setGuestStatus('checking')

    // Verificar na lista local primeiro
    const foundInList = guestList.find(guest => 
      guest.toLowerCase().includes(guestName.toLowerCase()) ||
      guestName.toLowerCase().includes(guest.toLowerCase())
    )

    if (foundInList) {
          // Tentar buscar no Supabase se estiver configurado
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .ilike('name', `%${guestName}%`)
          .single()

        if (data && !error) {
          setCurrentGuest(data)
          setGuestStatus(data.confirmed ? 'confirmed' : 'pending')
        } else {
          // Criar entrada no Supabase se não existir
          const newGuest: Guest = {
            name: foundInList,
            confirmed: false
          }
          setCurrentGuest(newGuest)
          setGuestStatus('pending')
        }
      } else {
        // Modo sem Supabase
        const newGuest: Guest = {
          name: foundInList,
          confirmed: false
        }
        setCurrentGuest(newGuest)
        setGuestStatus('pending')
      }
    } catch {
        // Fallback para modo offline
        const newGuest: Guest = {
          name: foundInList,
          confirmed: false
        }
        setCurrentGuest(newGuest)
        setGuestStatus('pending')
      }
    } else {
      setGuestStatus('not_found')
      setCurrentGuest(null)
    }
  }

  const confirmPresence = async () => {
    if (!currentGuest) return

    setIsSubmitting(true)
    try {
      const guestData = {
        ...currentGuest,
        confirmed: true,
        updated_at: new Date().toISOString()
      }

      if (supabase) {
        const { error } = await supabase
          .from('guests')
          .upsert(guestData)

        if (!error) {
          setCurrentGuest(guestData)
          setGuestStatus('confirmed')
          setShowConfirmation(true)
          setMessage('Presença confirmada com sucesso! 🎉')
          setTimeout(() => setShowConfirmation(false), 5000)
        } else {
          throw new Error('Erro ao confirmar presença')
        }
      } else {
        // Modo sem Supabase - simular confirmação
        setCurrentGuest(guestData)
        setGuestStatus('confirmed')
        setShowConfirmation(true)
        setMessage('Presença confirmada com sucesso! 🎉 (modo demonstração)')
        setTimeout(() => setShowConfirmation(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao confirmar presença:', error)
      setMessage('Erro ao confirmar presença. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const delayedCheck = setTimeout(() => {
      checkGuest()
    }, 500)

    return () => clearTimeout(delayedCheck)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestName])

  const rsvpDeadline = new Date('2025-09-26T23:59:59.000Z')
  const isDeadlinePassed = new Date() > rsvpDeadline

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Confirme sua Presença
          </h3>
          <p className="text-gray-600">
            Digite seu nome para confirmar sua presença na festa
          </p>
          <p className="text-sm text-red-500 mt-2">
            Confirmações até: 26 de Setembro de 2025
          </p>
        </div>

        {isDeadlinePassed ? (
          <div className="text-center p-8 bg-red-50 rounded-2xl">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Prazo de Confirmação Encerrado
            </h3>
            <p className="text-red-500">
              O prazo para confirmação de presença foi até 26 de setembro.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Digite seu nome..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            {guestStatus === 'checking' && guestName && (
              <div className="text-center py-4">
                <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-gray-600">Verificando...</p>
              </div>
            )}

            {guestStatus === 'not_found' && (
              <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-yellow-600 mb-2">
                  Nome não encontrado
                </h3>
                <p className="text-yellow-600">
                  Verifique se digitou o nome corretamente ou entre em contato conosco.
                </p>
              </div>
            )}

            {guestStatus === 'pending' && currentGuest && (
              <div className="text-center">
                <div className="p-6 bg-blue-50 rounded-2xl mb-6">
                  <div className="text-4xl mb-4">👋</div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">
                    Olá, {currentGuest.name}!
                  </h3>
                  <p className="text-blue-600 mb-4">
                    Você está na nossa lista de convidados!
                  </p>
                  <button
                    onClick={confirmPresence}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Presença ✨'}
                  </button>
                </div>
              </div>
            )}

            {guestStatus === 'confirmed' && currentGuest && (
              <div className="text-center p-6 bg-green-50 rounded-2xl">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Presença Confirmada!
                </h3>
                <p className="text-green-600">
                  Obrigada, {currentGuest.name}! Mal podemos esperar para celebrar com você!
                </p>
              </div>
            )}

            {showConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-3xl p-8 mx-4 max-w-md text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Confirmado!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sua presença foi confirmada com sucesso!
                  </p>
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {message && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl text-center text-blue-600">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
