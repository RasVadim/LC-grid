# Инструкции по публикации

## Настройка NPM

1. Создай аккаунт на npmjs.com
2. Войди в аккаунт в терминале:
   ```bash
   npm login
   ```

## Настройка GitHub Secrets

Для автоматической публикации нужно добавить секреты в GitHub:

1. Перейди в Settings → Secrets and variables → Actions
2. Добавь `NPM_TOKEN` с твоим npm токеном

### Получение NPM токена:
1. Зайди на npmjs.com
2. Перейди в Account → Access Tokens
3. Создай новый токен с правами на публикацию

## Публикация

### Автоматическая публикация (рекомендуется)
1. Создай тег с версией:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. GitHub Actions автоматически опубликует пакет

### Ручная публикация
```bash
npm run build
npm publish
```

## Версионирование

Используй семантическое версионирование:
- `v1.0.0` - первая стабильная версия
- `v1.0.1` - патч (багфиксы)
- `v1.1.0` - минор (новые функции)
- `v2.0.0` - мажор (breaking changes)

## Настройка GitHub Pages

1. Перейди в Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. Folder: / (root)

Storybook будет доступен по адресу: `https://username.github.io/repo-name`

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск Storybook
npm run storybook

# Сборка
npm run build

# Тестовая публикация (без публикации)
npm pack
``` 