# Конструктор прайса для сторис

Мини-сервис для телефона: загружаешь фото, редактируешь названия, цены и контакт, скачиваешь готовый PNG (1080×1920).

## Что уже настроено

В репозитории уже добавлен workflow `.github/workflows/deploy-pages.yml`, который автоматически деплоит сайт в GitHub Pages при пуше в `main`.

## Как «запустить Pages» (один раз)

1. Запушьте этот репозиторий в GitHub.
2. Откройте **Settings → Pages**.
3. В разделе **Build and deployment** выберите:
   - **Source**: `GitHub Actions`
4. Готово.

После следующего пуша в `main` workflow выполнит деплой автоматически.

## Где будет сайт

- Главная: `https://<username>.github.io/<repo>/`
- Редактор: `https://<username>.github.io/<repo>/price-editor.html`

## Локальный запуск

```bash
python3 -m http.server 4173
```

Открыть: `http://localhost:4173/price-editor.html`
