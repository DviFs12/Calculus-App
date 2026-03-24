# ∂ Calculus App VIBECODED

Uma plataforma de aprendizado de Cálculo interativa, gratuita e 100% offline.

## 🚀 Como usar

### Localmente
Basta abrir o arquivo `index.html` no navegador. Não precisa de servidor, build ou dependências.

## 📚 Conteúdo

### Unidade 1 — Limites
- O que é um Limite?
- Limites Laterais
- Continuidade
- Regra de L'Hôpital

### Unidade 2 — Derivadas
- Definição de Derivada
- Regras de Derivação
- Máximos e Mínimos

### Unidade 3 — Integrais
- Integral Indefinida
- Integral Definida
- Técnicas de Integração

## 💾 Persistência de dados

O progresso é salvo automaticamente no `localStorage` do navegador — sem necessidade de conta ou servidor. Inclui:

- XP acumulado
- Lições concluídas com precisão e data
- Streak de dias estudados
- Calendário de atividade (28 dias)

## 🛠 Tecnologias

- HTML5, CSS3, JavaScript vanilla
- Fontes: Fraunces, JetBrains Mono, Plus Jakarta Sans (Google Fonts)
- Sem frameworks, sem build step, sem dependências externas

## ➕ Como adicionar conteúdo

O currículo fica no array `CURRICULUM` dentro do `<script>` do `index.html`. Cada lição tem `steps` que podem ser:

```js
// Teoria
{ type: 'theory', title: '...', blocks: [ ... ] }

// Múltipla escolha
{ type: 'mcq', formula: '...', stem: '...', opts: [...], correct: 0, exp: '...' }

// Resposta aberta
{ type: 'input', formula: '...', stem: '...', correct: '42', exp: '...' }
```
VIBECODED IN CLAUDE

## 📝 Licença

MIT — use, modifique e distribua livremente.
