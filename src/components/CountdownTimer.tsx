'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, isClient])

  if (!isClient) {
    return (
      <div className="flex justify-center items-center space-x-4 md:space-x-8">
        <div className="text-center">
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px]">
            <div className="text-2xl md:text-4xl font-bold">--</div>
            <div className="text-xs md:text-sm uppercase tracking-wide">Dias</div>
          </div>
        </div>
        <div className="text-2xl md:text-4xl text-gray-400">:</div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px]">
            <div className="text-2xl md:text-4xl font-bold">--</div>
            <div className="text-xs md:text-sm uppercase tracking-wide">Horas</div>
          </div>
        </div>
        <div className="text-2xl md:text-4xl text-gray-400">:</div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px]">
            <div className="text-2xl md:text-4xl font-bold">--</div>
            <div className="text-xs md:text-sm uppercase tracking-wide">Min</div>
          </div>
        </div>
        <div className="text-2xl md:text-4xl text-gray-400">:</div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px]">
            <div className="text-2xl md:text-4xl font-bold">--</div>
            <div className="text-xs md:text-sm uppercase tracking-wide">Seg</div>
          </div>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days, color: 'from-pink-500 to-purple-500' },
    { label: 'Horas', value: timeLeft.hours, color: 'from-purple-500 to-indigo-500' },
    { label: 'Min', value: timeLeft.minutes, color: 'from-indigo-500 to-pink-500' },
    { label: 'Seg', value: timeLeft.seconds, color: 'from-pink-500 to-purple-500' }
  ]

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div className="text-center">
            <div className={`bg-gradient-to-br ${unit.color} text-white rounded-2xl p-4 md:p-6 shadow-lg min-w-[80px] transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-2xl md:text-4xl font-bold">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <div className="text-2xl md:text-4xl text-gray-400 mx-2">:</div>
          )}
        </div>
      ))}
    </div>
  )
}
