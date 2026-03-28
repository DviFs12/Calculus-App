# ∂ Calculus App — v4.0

Aplicativo de aprendizado de Cálculo estilo Duolingo, com currículo completo de pré-cálculo ao avançado, sistema de progressão, loja de temas e apostila integrada.

---

## 🗂️ Estrutura do Projeto

```
v4/
├── index.html          ← Página inicial / apresentação
├── course.html         ← Curso completo com lições interativas
├── apostila.html       ← Apostila teórica completa (imprimível)
├── store.html          ← Loja de temas
│
├── css/
│   └── shared.css      ← Estilos compartilhados + sistema de temas
│
├── js/
│   └── shared.js       ← Estado, temas, níveis, curriculum loader, debug
│
└── data/
    ├── curriculum.json          ← Índice dos módulos
    ├── themes.json              ← Definição dos 8 temas
    └── units/
        ├── u0-fundamentos.json       ← Módulo 0: Pré-Cálculo
        ├── u1-limites.json           ← Módulo 1: Limites
        ├── u2-derivadas.json         ← Módulo 2: Derivadas
        ├── u3-apl-derivadas.json     ← Módulo 3: Aplicações de Derivadas
        ├── u4-integrais.json         ← Módulo 4: Integrais
        ├── u5-apl-integrais.json     ← Módulo 5: Aplicações de Integrais
        └── u6-tecnicas.json          ← Módulo 6: Técnicas de Integração
```

---

## 📚 Conteúdo do Curso

| Módulo | Título | Lições | Exercícios |
|--------|--------|--------|------------|
| 0 | Fundamentos (Pré-Cálculo) | 3 | 12 |
| 1 | Limites | 5 | 20 |
| 2 | Derivadas | 4 | 16 |
| 3 | Aplicações de Derivadas | 3 | 12 |
| 4 | Integrais | 3 | 12 |
| 5 | Aplicações de Integrais | 2 | 8 |
| 6 | Técnicas de Integração | 2 | 8 |
| **Total** | | **22 lições** | **88 exercícios** |

---

## ✨ Funcionalidades

### Sistema de Progressão
- **XP** — ganho por respostas corretas (+15) e lições completas (+80–120)
- **Moedas** — ganhas por respostas (+5) e lições completas (+40–60)
- **8 Níveis** — Iniciante → Aprendiz → Estudante → Analista → Especialista → Mestre → Sábio → Lenda
- Barra de nível na sidebar com progresso visual

### Temas Dinâmicos
O sistema de temas usa CSS Custom Properties (`--accent`, `data-base`). Ao trocar o tema, apenas as variáveis mudam — sem reescrever CSS.

| Tema | Tipo | Preço |
|------|------|-------|
| Claro | Base clara | Grátis |
| Escuro | Base escura | Grátis |
| Violeta | Base escura | 200 moedas |
| Oceano | Base clara | 200 moedas |
| Floresta | Base clara | 300 moedas |
| Meia-noite | Base escura | 300 moedas |
| Rosa | Base clara | 400 moedas |
| Ouro | Base escura | 500 moedas |

### Navegação
- **Desktop** — sidebar com navegação por módulos e lições
- **Mobile** — bottom navigation bar fixa com ícones SVG (Início, Curso, Apostila, Loja)
- Usa `env(safe-area-inset-bottom)` para suporte a notch/Dynamic Island

### Outras Funcionalidades
- 🎓 **Tutorial inicial** — tour guiado com destaque de elementos, auto-inicia para novos usuários
- 📚 **Apostila** — toda a teoria reunida com índice clicável e botão de impressão/PDF
- ⏭️ **Pular etapas** — permite avançar etapas ou lições para quem já conhece o conteúdo
- 🔥 **Streak** — calendário de atividade dos últimos 28 dias
- 🗺️ **Lições bloqueadas** — desbloqueadas progressivamente ao completar a lição anterior

---

## 🌐 Deploy

### GitHub Pages (recomendado)
1. Faça upload de toda a pasta `v4/` para um repositório GitHub
2. Ative GitHub Pages em **Settings → Pages → Source: Deploy from branch → main → / (root)**
3. Acesse `https://seuusuario.github.io/nome-do-repositorio`

### Servidor local
```bash
cd v4
python3 -m http.server 8000
# Acesse http://localhost:8000
```

> **Nota:** Abrir `index.html` diretamente como `file://` também funciona — os arquivos JSON têm fallback inline embutido no `shared.js`.

---

## ➕ Adicionando Conteúdo

### Adicionar uma lição a um módulo existente
1. Abra o arquivo JSON do módulo (ex: `data/units/u2-derivadas.json`)
2. Adicione um novo objeto no array `lessons`
3. Siga o schema abaixo

### Adicionar um novo módulo
1. Crie `data/units/u7-nome.json` seguindo o schema
2. Adicione `"u7-nome.json"` ao array `units` em `data/curriculum.json`

### Schema de uma lição

```json
{
  "id": "u2l5",
  "title": "Título da Lição",
  "steps": [
    {
      "type": "theory",
      "title": "Título da Teoria",
      "blocks": [
        { "type": "para", "heading": "Subtítulo", "text": "Texto com <strong>HTML</strong>." },
        { "type": "formula", "text": "f'(x) = lim [f(x+h)-f(x)]/h\n        h->0" },
        { "type": "callout", "kind": "info", "icon": "i", "text": "Dica importante." },
        { "type": "callout", "kind": "warn", "icon": "!", "text": "Atenção!" },
        { "type": "callout", "kind": "tip",  "icon": "v", "text": "Truque útil." },
        { "type": "example", "label": "Exemplo resolvido", "body": "Passo 1...\nPasso 2..." },
        { "type": "image", "src": "URL_DA_IMAGEM", "caption": "Legenda", "alt": "Descrição" },
        { "type": "video", "url": "https://www.youtube.com/embed/ID", "caption": "Título do vídeo" }
      ]
    },
    {
      "type": "mcq",
      "formula": "f(x) = x^2 (opcional)",
      "stem": "Enunciado da questão.",
      "opts": ["Opção A", "Opção B", "Opção C", "Opção D"],
      "correct": 0,
      "exp": "Explicação da resposta correta."
    },
    {
      "type": "input",
      "formula": "Fórmula (opcional)",
      "stem": "Enunciado pedindo um valor numérico.",
      "correct": "42",
      "exp": "Explicação de como se chega ao resultado."
    }
  ]
}
```

---

## 🛠️ Comandos de Debug (Console do Navegador)

Abra o DevTools (F12) e use os comandos `calc.*` disponíveis em qualquer página:

```js
calc.help()              // Lista todos os comandos disponíveis
calc.status()            // Mostra XP, moedas, nível, streak, temas

calc.addCoins(500)       // Adiciona 500 moedas
calc.addXP(1000)         // Adiciona 1000 XP
calc.setLevel(5)         // Define o nível diretamente (1–8)
calc.unlockAllThemes()   // Desbloqueia todos os 8 temas
calc.completeAll()       // Marca todas as lições como concluídas
calc.reset()             // Reseta todo o progresso (recarrega a página)
```

---

## 🏗️ Arquitetura Técnica

### Sistema de Temas
```css
/* Aplicar tema = mudar duas variáveis */
html[data-base="dark"]  { /* paleta escura */ }
html[data-base="light"] { /* paleta clara  */ }
--accent: #7c3aed;        /* cor de destaque */
```

### Carregamento do Currículo
O `shared.js` tenta carregar os JSONs via `fetch('data/curriculum.json')`.
Se falhar (ex: `file://`), usa os dados inline embutidos como fallback.

### Persistência
Todo o estado é salvo em `localStorage` com a chave `calculus_v4`:
```js
{ xp, coins, streak, lastStudyDate, completedLessons, activityLog,
  activeTheme, ownedThemes, tutorialDone }
```

---

## 📄 Licença

Conteúdo educacional original criado para fins de aprendizado.
Interface e código: MIT License.
