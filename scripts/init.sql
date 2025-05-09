-- Tabela de usuários
CREATE TABLE IF NOT EXISTS public.usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS public.categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabela de tarefas
CREATE TABLE IF NOT EXISTS public.tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pendente',
    data_limite DATE,
    usuario_id INTEGER NOT NULL,
    categorias_id INTEGER,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (categorias_id) REFERENCES public.categorias(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
