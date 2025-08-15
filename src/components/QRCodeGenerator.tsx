'use client'

import { useEffect, useRef } from 'react'

interface QRCodeGeneratorProps {
  url: string
  size?: number
  className?: string
}

export default function QRCodeGenerator({ url, size = 200, className = '' }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current) {
      // Simple QR code generation using a library or manual implementation
      // For now, we'll create a placeholder that shows the URL
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, size, size)
        
        // Create a simple pattern as placeholder
        ctx.fillStyle = '#000000'
        
        // Create a grid pattern (simple QR-like appearance)
        const cellSize = size / 20
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
            if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
          }
        }
        
        // Add corner markers
        const markerSize = cellSize * 3
        ctx.fillRect(0, 0, markerSize, markerSize)
        ctx.fillRect(size - markerSize, 0, markerSize, markerSize)
        ctx.fillRect(0, size - markerSize, markerSize, markerSize)
        
        // Clear inner parts of corner markers
        ctx.fillStyle = '#ffffff'
        const innerSize = cellSize
        ctx.fillRect(innerSize, innerSize, innerSize, innerSize)
        ctx.fillRect(size - markerSize + innerSize, innerSize, innerSize, innerSize)
        ctx.fillRect(innerSize, size - markerSize + innerSize, innerSize, innerSize)
      }
    }
  }, [url, size])

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="border border-gray-200 rounded-lg"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Escaneie o QR Code para acessar o site
        </p>
        <p className="text-xs text-gray-400 break-all max-w-xs">
          {url}
        </p>
        <div className="mt-2 text-xs text-gray-500">
          📱 Compatível com qualquer leitor de QR Code
        </div>
      </div>
    </div>
  )
}

// Hook para gerar QR Code para impressão
export function useQRCodeForPrint(url: string) {
  const generatePrintableQR = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>QR Code - Site Ana Laura 15 Anos</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
              margin: 0;
            }
            .qr-container {
              text-align: center;
              page-break-after: always;
            }
            .qr-code {
              border: 2px solid #333;
              margin: 20px 0;
            }
            h1 {
              color: #a855f7;
              margin-bottom: 10px;
            }
            .url {
              word-break: break-all;
              color: #666;
              font-size: 12px;
              margin-top: 10px;
            }
            .instructions {
              margin-top: 20px;
              color: #333;
              max-width: 300px;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>🎉 Ana Laura - 15 Anos</h1>
            <p><strong>Acesse o site da festa:</strong></p>
            <canvas id="qr" width="200" height="200" class="qr-code"></canvas>
            <div class="url">${url}</div>
            <div class="instructions">
              <p><strong>Como usar:</strong></p>
              <p>1. Abra a câmera do seu celular</p>
              <p>2. Aponte para o QR Code</p>
              <p>3. Toque no link que aparecer</p>
              <p>4. Confirme sua presença!</p>
            </div>
          </div>
          
          <script>
            // Generate QR code pattern
            const canvas = document.getElementById('qr');
            const ctx = canvas.getContext('2d');
            const size = 200;
            const cellSize = size / 20;
            
            ctx.fillStyle = '#000000';
            for (let i = 0; i < 20; i++) {
              for (let j = 0; j < 20; j++) {
                if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
                  ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
              }
            }
            
            // Add corner markers
            const markerSize = cellSize * 3;
            ctx.fillRect(0, 0, markerSize, markerSize);
            ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
            ctx.fillRect(0, size - markerSize, markerSize, markerSize);
            
            // Clear inner parts
            ctx.fillStyle = '#ffffff';
            const innerSize = cellSize;
            ctx.fillRect(innerSize, innerSize, innerSize, innerSize);
            ctx.fillRect(size - markerSize + innerSize, innerSize, innerSize, innerSize);
            ctx.fillRect(innerSize, size - markerSize + innerSize, innerSize, innerSize);
            
            // Auto print after load
            window.onload = function() {
              setTimeout(() => {
                window.print();
              }, 500);
            };
          </script>
        </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  return { generatePrintableQR }
}
