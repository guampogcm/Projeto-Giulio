CREATE TABLE IF NOT EXISTS mentoria (
    id_mentoria INT AUTO_INCREMENT PRIMARY KEY, -- ID gerado automaticamente pelo banco
    data_inicio DATE NULL,                      -- Data de inicio (formato AAAA-MM-DD)
    data_fim    DATE NULL,                      -- Data de termino (formato AAAA-MM-DD)
    status      VARCHAR(50) NOT NULL,           -- Status da mentoria (ex.: Em andamento, Concluída, Cancelada, Pendente)
    objetivo    TEXT NOT NULL                   -- Objetivo ou descricao da mentoria
);