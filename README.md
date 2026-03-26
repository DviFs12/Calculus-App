# ∂ Calculus App v3.0

Aplicativo de aprendizado de Cálculo estilo Duolingo, com todas as funcionalidades expandidas.

## 🗂️ Estrutura do Projeto

```
calculus-app/
├── index.html              ← Arquivo principal (abre no navegador)
├── data/
│   ├── curriculum.json     ← Índice das unidades
│   └── units/
│       ├── u1-limites.json     ← Conteúdo da Unidade 1
│       ├── u2-derivadas.json   ← Conteúdo da Unidade 2
│       └── u3-integrais.json   ← Conteúdo da Unidade 3
└── README.md
```

## ✨ Funcionalidades

### 1. Sistema de Níveis e Pontos
- **XP**: Ganho a cada resposta correta (+15) e ao completar lições (+80~120)
- **Moedas**: Ganhas por respostas corretas (+5) e lições completas (+40~60)
- **8 níveis**: Iniciante → Aprendiz → Estudante → Analista → Especialista → Mestre → Sábio → Lenda
- Barra de progresso de nível na sidebar

### 2. Temas Dinâmicos
- **Sistema de temas** com base clara/escura + cor de destaque
- Ao mudar o tema, apenas a cor de destaque muda — sem reescrever CSS
- 2 temas gratuitos (Claro e Escuro) desbloqueados por padrão

### 3. Loja de Temas
- 8 temas disponíveis (2 grátis + 6 pagos)
- Compre com Moedas ganhas estudando
- Preview visual com swatches de cada tema
- Preços: 200~500 moedas

### 4. Conteúdo em JSON
Para adicionar conteúdo novo:
1. Crie um arquivo `uN-nome.json` na pasta `data/units/`
2. Adicione o nome do arquivo em `data/curriculum.json`
3. Siga o schema dos arquivos existentes

**Tipos de bloco suportados na teoria:**
- `para` — parágrafo com título
- `formula` — box de código
- `callout` — aviso (info/warn/tip)
- `example` — box de exemplo
- `image` — imagem com legenda (`src`, `caption`, `alt`)
- `video` — embed YouTube/Vimeo (`url`, `caption`)

### 5. Mobile Completo
- Sidebar deslizante no mobile
- Layout responsivo em todos os tamanhos
- Botão ☰ para abrir menu
- Touch-friendly em todas as interações

### 6. Pular Etapas
- Botão "Pular →" disponível durante lições
- Opções: pular etapa, completar lição, ou explorar outras unidades

### 7. Apostila do Curso
- Toda a teoria reunida em um só lugar
- Índice com links rápidos por unidade
- Botão de impressão / salvar como PDF

### 8. Tutorial Inicial
- Tour guiado com highlight de elementos
- Aparece automaticamente para novos usuários
- Compatível com mobile (posicionamento adaptativo)
- Pode ser pulado a qualquer momento

### 9. Imagens e Vídeos nas Lições
- Suporte a imagens com legenda nos blocos de teoria
- Embed de vídeos (YouTube, Vimeo) nos blocos de teoria
- Layout responsivo para ambos

## 📝 Como adicionar uma lição nova

```json
{
  "id": "u4",
  "emoji": "🌀",
  "title": "Séries",
  "desc": "Sequências e Séries Infinitas",
  "lessons": [
    {
      "id": "u4l1",
      "title": "Séries Geométricas",
      "steps": [
        {
          "type": "theory",
          "title": "O que é uma Série?",
          "blocks": [
            { "type": "para", "heading": "Definição", "text": "..." },
            { "type": "image", "src": "URL_DA_IMAGEM", "caption": "Legenda", "alt": "Alt text" },
            { "type": "video", "url": "https://www.youtube.com/embed/ID_DO_VIDEO", "caption": "Título" }
          ]
        },
        {
          "type": "mcq",
          "formula": "Σ (1/2)ⁿ",
          "stem": "Qual a soma desta série geométrica?",
          "opts": ["1", "2", "3", "∞"],
          "correct": 1,
          "exp": "Para r=1/2, soma = a/(1-r) = 1/(1-0.5) = 2."
        }
      ]
    }
  ]
}
```

## 🌐 Deploy no GitHub Pages
1. Faça upload de todos os arquivos para um repositório GitHub
2. Ative GitHub Pages nas configurações (pasta raiz)
3. Acesse `https://seuusuario.github.io/nome-do-repositorio`

O app carrega os JSONs automaticamente quando servido via HTTP. Em modo offline (abrir arquivo local), usa os dados embutidos no HTML.
