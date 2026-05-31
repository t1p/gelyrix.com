# System Full Info (x200)

Подробная информация о среде выполнения, системе и конфигурации для хоста x200.

2026-05-31 12:52:45 - Последняя редакция базового описания.

## Правила редактирования

* Записи в разделах должны быть отсортированы в обратном хронологическом порядке.
* Каждая запись должна начинаться с даты редакции в формате ГГГГ-ММ-ДД ЧЧ:ММ:СС.

2026-05-31 12:52:45 - Последняя редакция правил редактирования.

## Информация о хосте

2026-05-31 12:52:45 - Hostname: x200. ОС: Linux 6.6. Shell: /usr/bin/zsh. Home Directory: /home/voyager. Current Workspace Directory: /home/voyager/dev/gelyrix.com.

## Окружение Node.js и npm

2026-05-31 12:52:45 - Проект использует npm для управления зависимостями. Основные скрипты: npm run dev (Vite dev server), npm run build (production build), npm run start (Node adapter server), npm run preview (preview production), npm run check (type checking), npm run check:watch (watch mode для checking), npm run setup:appwrite-cms (setup script для Appwrite CMS).

## Версии зависимостей

2026-05-31 12:52:45 - SvelteKit: 2.49.1. Svelte: 5.45.6. TailwindCSS: 3.4.17. TypeScript: 5.9.3. Vite: 7.2.6. Appwrite (client): 21.5.0. node-appwrite (server): 24.0.0. svelte-i18n: 4.0.1. Node adapter: @sveltejs/adapter-node 5.4.0.

## Структура директорий проекта

2026-05-31 12:52:45 - Корневые файлы: .env.example, package.json, README.md, AGENTS.md, ecosystem.config.js, postcss.config.js, svelte.config.js, tailwind.config.js, tsconfig.json, vite.config.ts. Директории: .github/, nginx/, scripts/, src/, static/, versions/, memory-bank/, backups/, docs/.

## Структура src/

2026-05-31 12:52:45 - src/app.css (глобальные стили). src/app.d.ts (типы приложения). src/app.html (HTML шаблон). src/env.d.ts (типы переменных окружения). src/hooks.server.ts (серверные хуки). src/hooks.ts (универсальные хуки). src/lib/ (shared библиотеки). src/routes/ (маршруты приложения).

## src/lib Структура

2026-05-31 12:52:45 - src/lib/i18n.ts (инициализация localization). src/lib/locales.ts (поддерживаемые локали). src/lib/appwrite.ts (Appwrite client initialization). src/lib/content.ts (типы и функции контента). src/lib/adminContent.ts (контент администратора). src/lib/index.ts (экспорт публичного API). src/lib/assets/ (статические активы). src/lib/components/ (Svelte компоненты). src/lib/translations/ (JSON-файлы переводов). src/lib/server/ (server-side модули, e.g., adminAuth.ts).

## Маршруты (src/routes)

2026-05-31 12:52:45 - Главная: src/routes/+page.svelte. Layout: src/routes/+layout.svelte, +layout.server.ts, +layout.ts. About: src/routes/about/+page.svelte. Admin: src/routes/admin/+page.svelte, +page.server.ts. Blog: src/routes/blog/. Contacts: src/routes/contacts/+page.svelte. FAQ: src/routes/faq/+page.svelte. How-it-works: src/routes/how-it-works/+page.svelte. Investors: src/routes/investors/+page.svelte. Lab: src/routes/lab/+page.svelte. Legal: src/routes/legal/+page.svelte. Services: src/routes/services/+page.svelte. Transparency: src/routes/transparency/+page.svelte. Sitemap: src/routes/sitemap.xml/.

## Конфигурация Deployment

2026-05-31 12:52:45 - ecosystem.config.js: PM2 конфигурация для production. nginx/gelyrix.com.conf: nginx reverse proxy конфигурация. scripts/setup-appwrite-cms.mjs: Setup script для инициализации Appwrite CMS (database, collections).

## Переменные окружения

2026-05-31 12:52:45 - .env.example содержит: PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID (public), APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY (private), APPWRITE_DATABASE_ID=gelyrix_cms, APPWRITE_CMS_COLLECTION_ID=cms_documents, ADMIN_LOGIN=admin, ADMIN_PASSWORD (change-me), ADMIN_SESSION_SECRET.

## Версионирование контента

2026-05-31 12:52:45 - versions/v0.1.md: Базовая версия контента, сохраняется неизменной. versions/v0.2.md: Обновленная версия контента. Новые версии создаются по мере необходимости.

## Memory Bank

2026-05-31 12:52:45 - memory-bank/: Директория для файлов контекста проекта. activeContext.md: Текущий статус проекта. productContext.md: Описание продукта и архитектуры. systemPatterns.md: Архитектурные паттерны и соглашения. decisionLog.md: Логирование архитектурных решений. progress.md: Отслеживание прогресса. system_full_info_x200.md: Этот файл (информация о системе для хоста x200). backups/: Директория для бэкапов Memory Bank. memory-bank-analysis-hashes.txt: Файл с хешами MD5/SHA256 для валидации изменений.
