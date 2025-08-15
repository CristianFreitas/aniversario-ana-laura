-- Criação das tabelas para o site de aniversário da Ana Laura

-- Tabela de convidados
CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    confirmed BOOLEAN DEFAULT FALSE,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens do mural
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir lista de convidados
INSERT INTO guests (name, confirmed) VALUES
('michele', FALSE),
('cacilda', FALSE),
('vó cida', FALSE),
('vô cicero', FALSE),
('Tio Mazione', FALSE),
('Tio Thales', FALSE),
('Tia Re', FALSE),
('Rian', FALSE),
('Bernardo', FALSE),
('Selma', FALSE),
('Tia beth', FALSE),
('Tio Bastião', FALSE),
('Tio Luís', FALSE),
('Tio Jorge', FALSE),
('Tio Eduardo', FALSE),
('Tia Maria Do Carmo', FALSE),
('Tia Eva', FALSE),
('Ednei', FALSE),
('Vagner', FALSE),
('Eninha', FALSE),
('Tia Marilene', FALSE),
('dinda milene', FALSE),
('Dada e Delvina', FALSE),
('Taissa', FALSE),
('dinda jussara e tio dudu', FALSE),
('tia bel, márcio e maria tereza', FALSE),
('Victoria, Murilo e Giselle', FALSE),
('Maria clara,Iago,Tia Sintya e Lúcio', FALSE),
('Sarah', FALSE),
('Lara', FALSE),
('Isabella', FALSE),
('Gabriel', FALSE),
('Heitor', FALSE),
('Lucca', FALSE),
('Caua', FALSE),
('kayke', FALSE),
('Kayque', FALSE),
('Lucas', FALSE),
('Afonso', FALSE),
('Ana Clara', FALSE),
('Mariana BH', FALSE),
('Lisa', FALSE),
('Clarisse', FALSE),
('Bernardo Dias', FALSE),
('Bernardo lage', FALSE),
('Letícia', FALSE),
('Laís', FALSE),
('Priscilla', FALSE),
('Elis, Miguel, Milena e Serginho', FALSE),
('gabriel roxo', FALSE),
('Gabi - carmesia', FALSE),
('Dani', FALSE),
('Maria Eduarda - Carmesia', FALSE),
('Carol - carmesia', FALSE),
('Emanuelle', FALSE),
('Larissa', FALSE),
('Luara', FALSE),
('Cirlene', FALSE),
('Tátila', FALSE),
('Lidiane', FALSE),
('Nara', FALSE),
('Natecia', FALSE),
('Maria cruz', FALSE),
('Mileide', FALSE),
('ângela e arthur', FALSE),
('Tia Ana e Dilson', FALSE),
('Tia Simone', FALSE),
('Rosilene e Bengala', FALSE),
('Mariana e Dona Marta', FALSE),
('Caio', FALSE),
('Adriana', FALSE),
('Alex', FALSE),
('Do carmo', FALSE),
('Douglas', FALSE),
('Graziele (ótica)', FALSE),
('Grazielle (unha)', FALSE),
('Tia Viviane', FALSE),
('Lu e Cica', FALSE),
('Soninha', FALSE),
('Tia Aline', FALSE),
('Tia Jessica', FALSE),
('Arthur lage', FALSE),
('Pedro Cardoso', FALSE),
('Sabrina', FALSE),
('Natasha', FALSE),
('Kelly', FALSE),
('Regi', FALSE),
('Luiza', FALSE),
('Erick', FALSE),
('Kyara', FALSE),
('Patricia', FALSE),
('Lister', FALSE),
('Madalena', FALSE),
('Marcelo', FALSE),
('Syang', FALSE),
('Aldria', FALSE),
('Ana Elis', FALSE),
('Wanderlei', FALSE),
('Luana', FALSE),
('Luísa bosi', FALSE),
('M. Clara Mafra', FALSE),
('Bernardo Mafra', FALSE),
('Arthur Mafra', FALSE),
('Elis Sana', FALSE),
('Maria Eduarda, Marco Antônio, Marcela e Miguel', FALSE),
('Sarah Lage', FALSE),
('Cecília, jaqueline e helena', FALSE),
('Helena magalhães', FALSE),
('Luiza Soares', FALSE),
('Duda maciel', FALSE),
('Ana Vitória', FALSE),
('Mateus Lage', FALSE),
('Gabrielle', FALSE),
('Maria Clara Duarte', FALSE),
('Laura Rosa', FALSE),
('Livia Rolla', FALSE),
('Livia', FALSE),
('Isadora', FALSE),
('Ana Beatriz', FALSE),
('Thiago', FALSE),
('Manuela', FALSE),
('guizin', FALSE),
('giselly', FALSE),
('ariadina', FALSE);

-- Adicionar algumas mensagens de exemplo
INSERT INTO messages (guest_name, message) VALUES
('Família Santos', 'Ana Laura, que este novo ciclo seja repleto de alegrias, conquistas e muita felicidade! Parabéns pelos seus 15 anos! 🎉💖'),
('Tia Maria', 'Minha querida sobrinha, você é uma menina especial e tenho certeza de que o futuro te reserva coisas maravilhosas! ✨'),
('Amigos da escola', 'Ana, você é uma amiga incrível! Que seus 15 anos sejam o início de muitas aventuras e momentos especiais! 🌟');

-- Policies para Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy para leitura de convidados (qualquer um pode ler)
CREATE POLICY "Anyone can read guests" ON guests
    FOR SELECT USING (true);

-- Policy para atualização de convidados (qualquer um pode atualizar)
CREATE POLICY "Anyone can update guests" ON guests
    FOR UPDATE USING (true);

-- Policy para leitura de mensagens (qualquer um pode ler)
CREATE POLICY "Anyone can read messages" ON messages
    FOR SELECT USING (true);

-- Policy para inserção de mensagens (qualquer um pode inserir)
CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT WITH CHECK (true);

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente na tabela guests
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_guests_name ON guests(name);
CREATE INDEX IF NOT EXISTS idx_guests_confirmed ON guests(confirmed);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_guest_name ON messages(guest_name);

-- Comentários nas tabelas
COMMENT ON TABLE guests IS 'Lista de convidados para a festa de 15 anos da Ana Laura';
COMMENT ON TABLE messages IS 'Mural de recados para a aniversariante';

COMMENT ON COLUMN guests.name IS 'Nome do convidado';
COMMENT ON COLUMN guests.confirmed IS 'Se o convidado confirmou presença';
COMMENT ON COLUMN guests.message IS 'Mensagem opcional do convidado';

COMMENT ON COLUMN messages.guest_name IS 'Nome de quem deixou o recado';
COMMENT ON COLUMN messages.message IS 'Conteúdo do recado';
