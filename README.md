# 🎉 Site de Aniversário - Ana Laura 15 Anos

Um site moderno e interativo criado para celebrar os 15 anos da Ana Laura, com design responsivo e funcionalidades completas para gerenciar o evento.

## ✨ Funcionalidades

### 🏠 Página Principal
- **Design responsivo** com gradientes e animações suaves
- **Contagem regressiva** dinâmica até a data da festa (11/10/2025 21:00h)
- **Galeria de fotos** interativa com lightbox
- **Frases inspiradoras** da aniversariante

### 📝 Sistema RSVP
- **Confirmação de presença** integrada com Supabase
- **Lista de convidados** pré-cadastrada (103 convidados)
- **Busca inteligente** por nome
- **Prazo limite** para confirmações (26/09/2025)

### 📍 Informações do Evento
- **Local**: Restaurante do Bengala
- **Data**: 11 de Outubro de 2025
- **Horário**: 21:00h
- **Dress Code**: Passeio Completo

### 🗺️ Localização
- **Mapa interativo** (integração com Google Maps)
- **Links diretos** para Google Maps e Waze
- **Informações de acessibilidade** e estacionamento

### 🎁 Lista de Presentes
- **Sugestões organizadas** por categoria:
  - Calçados (37/38)
  - Blusas (M)
  - Shorts/Calças (38/40)
  - Perfumes/Cremes (fragrância doce)
  - Acessórios (prata e dourado)
  - Maquiagem
- **Opção PIX** com dados completos
- **Copiador automático** da chave PIX

### 💌 Mural de Recados
- **Sistema de mensagens** público
- **Interface intuitiva** para deixar recados
- **Armazenamento** no Supabase
- **Moderação** automática de conteúdo

### 📸 Galeria
- **Fotos pré-evento** com as imagens fornecidas
- **Lightbox responsivo** com navegação
- **Seção futura** para fotos do evento
- **Hashtag personalizada**: #AnaLaura15Anos

### 📱 QR Code
- **Gerador de QR Code** para acesso fácil
- **Versão para impressão** nos convites
- **Compatibilidade** com todos os leitores

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React moderno
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Supabase** - Backend as a Service
- **Vercel** - Deploy e hospedagem

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18.18.0 ou superior
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd aniversario-ana-laura
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure o Supabase**
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o script SQL em `supabase-setup.sql`
   - Copie as credenciais do projeto

4. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env.local na raiz do projeto
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

5. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse** [http://localhost:3000](http://localhost:3000)

## 📊 Configuração do Supabase

### Tabelas Criadas

#### `guests` - Lista de Convidados
- `id` - Chave primária
- `name` - Nome do convidado
- `confirmed` - Status de confirmação
- `message` - Mensagem opcional
- `created_at` - Data de criação
- `updated_at` - Data de atualização

#### `messages` - Mural de Recados
- `id` - Chave primária
- `guest_name` - Nome do autor
- `message` - Conteúdo da mensagem
- `created_at` - Data de criação

### Políticas de Segurança (RLS)
- Leitura pública para ambas as tabelas
- Inserção e atualização permitidas para convidados
- Triggers automáticos para timestamps

## 🎨 Design e UX

### Paleta de Cores
- **Primary**: Gradientes roxo/rosa (#a855f7 → #ec4899)
- **Secondary**: Azul/índigo (#3b82f6 → #6366f1)
- **Background**: Tons pastéis e brancos
- **Text**: Cinzas escuros para boa legibilidade

### Responsividade
- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly** - Botões e áreas de toque adequadas

### Acessibilidade
- **WCAG 2.1** - Contraste adequado
- **Keyboard Navigation** - Navegação por teclado
- **Screen Readers** - Semântica adequada
- **Reduced Motion** - Respeita preferências de movimento

## 📱 PWA (Progressive Web App)

O site pode ser instalado como um app no celular:
1. Acesse o site no navegador móvel
2. Toque em "Adicionar à tela inicial"
3. Use como um app nativo

## 🔧 Customização

### Alterando Dados do Evento
Edite os arquivos:
- `src/lib/supabase.ts` - Configurações do banco
- `src/components/CountdownTimer.tsx` - Data/hora do evento
- `src/components/LocationSection.tsx` - Local e endereço
- `src/components/GiftList.tsx` - Lista de presentes e PIX

### Adicionando Fotos
1. Coloque as imagens na pasta `public/images/`
2. Atualize a lista em `src/components/PhotoGallery.tsx`
3. Otimize as imagens para web (recomendado: 1080px max)

### Personalizando Cores
1. Edite `tailwind.config.ts` para cores customizadas
2. Atualize `src/app/globals.css` para animações
3. Teste em diferentes dispositivos

## 📈 Analytics e Monitoramento

### Recomendações para Produção
- **Google Analytics** - Acompanhar visitantes
- **Vercel Analytics** - Performance e Core Web Vitals
- **Sentry** - Monitoramento de erros
- **Hotjar** - Heatmaps e comportamento

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify
1. Conecte o repositório no [Netlify](https://netlify.com)
2. Configure build: `npm run build`
3. Configure as variáveis de ambiente

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📋 TODO / Próximas Funcionalidades

- [ ] Sistema de autenticação para admin
- [ ] Painel administrativo para gerenciar convidados
- [ ] Upload de fotos pelos convidados
- [ ] Integração com redes sociais
- [ ] Notificações push para lembretes
- [ ] Chat em tempo real durante o evento
- [ ] Streaming ao vivo da festa
- [ ] Enquetes e jogos interativos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e foi desenvolvido especificamente para o aniversário da Ana Laura.

## 🎯 Suporte

Para dúvidas ou problemas:
- 📧 Email: [seu-email]
- 📱 WhatsApp: [seu-numero]
- 🐛 Issues: [link-do-repositorio]/issues

---

**Feito com 💖 para Ana Laura** ✨

*"A felicidade pode ser encontrada até nos momentos mais difíceis, se você lembrar de acender a luz."*