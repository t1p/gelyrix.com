# System Patterns

Документирует архитектурные паттерны, соглашения кодирования и системные паттерны, используемые в проекте gelyrix.com.

2026-05-31 12:52:45 - Последняя редакция базового описания.

## Правила редактирования

* Записи в разделах должны быть отсортированы в обратном хронологическом порядке.
* Каждая запись должна начинаться с даты редакции в формате ГГГГ-ММ-ДД ЧЧ:ММ:СС.

2026-05-31 12:52:45 - Последняя редакция правил редактирования.

## SvelteKit Структура

2026-05-31 12:52:45 - src/routes/ содержит SPA-маршруты в format +page.svelte и +layout.svelte. Каждый маршрут может иметь +page.server.ts для server-side логики. +layout.server.ts и +layout.ts управляют данными на уровне layout. Хуки: src/hooks.server.ts (серверные хуки для аутентификации), src/hooks.ts (универсальные хуки).

## Локализация (i18n)

2026-05-31 12:52:45 - Локали определены в src/lib/locales.ts. JSON-файлы переводов: src/lib/translations/{en,ru,es}.json. Инициализация через src/lib/i18n.ts с использованием svelte-i18n. Автоопределение локали: localStorage > navigator.language > defaultLocale. Функция pick() для выбора контента по локали, normalizeLocale() для нормализации.

## Appwrite Integration

2026-05-31 12:52:45 - Client SDK в src/lib/appwrite.ts (для браузера): Account, Databases, Storage. Server SDK в src/lib/server/adminAuth.ts и других для операций администратора. Инициализация через PUBLIC_APPWRITE_ENDPOINT и PUBLIC_APPWRITE_PROJECT_ID. Database ID: gelyrix_cms, Collection ID: cms_documents.

## Контент и Типы

2026-05-31 12:52:45 - src/lib/content.ts содержит типы (ActionLink, TextCard, Article) и функции локализации. Объект images для хранения URL-ов изображений (Unsplash, Wikimedia). Функция pick() используется для выбора контента по TextCard[locale].

## Именование и Соглашения

2026-05-31 12:52:45 - camelCase для переменных и функций. PascalCase для компонентов Svelte. kebab-case для папок маршрутов (e.g., /how-it-works). ASCII текст предпочтителен, локализованный контент в JSON-файлах. Компоненты в src/lib/components/ (e.g., Breadcrumbs.svelte, PageHero.svelte).

## Styling

2026-05-31 12:52:45 - TailwindCSS для utility-based styling. src/app.css содержит глобальные стили. Responsive design через Tailwind breakpoints. Свои CSS классы только для shared component styles.

## Deployment и Build

2026-05-31 12:52:45 - npm run dev: Vite dev server. npm run build: Production build с Node adapter. npm run start: Запуск production build (используется PM2). npm run preview: Preview production build. npm run check: Type checking через svelte-check. ecosystem.config.js: PM2 configuration. nginx/gelyrix.com.conf: Reverse proxy configuration.

## Управление Контентом

2026-05-31 12:52:45 - Версионирование: versions/v0.1.md (сохраняется неизменным), versions/v0.2.md и далее для новых версий. Новые версии должны начинаться с описания ключевых изменений (Added, Refined, Removed). Admin panel на /admin для управления документами CMS через Appwrite.

## Безопасность

2026-05-31 12:52:45 - ADMIN_SESSION_SECRET используется для сессий администратора. APPWRITE_API_KEY хранится на сервере (не в браузере). Аутентификация проверяется в src/hooks.server.ts. Client-side используются только PUBLIC_* переменные.
