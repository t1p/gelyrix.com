# Product Context

Общий обзор проекта gelyrix.com, его целей, архитектуры и ключевых характеристик.

2026-05-31 12:52:45 - Последняя редакция базового описания.

## Правила редактирования

* Записи в разделах должны быть отсортированы в обратном хронологическом порядке.
* Каждая запись должна начинаться с даты редакции в формате ГГГГ-ММ-ДД ЧЧ:ММ:СС.

2026-05-31 12:52:45 - Последняя редакция правил редактирования.

## Проектная цель

2026-05-31 12:52:45 - Gelyrix.com — это локализованное веб-приложение, предоставляющее информацию о проекте, услугах, инвестиционных возможностях и научных лабораториях. Цель: создать масштабируемую CMS-интегрированную платформу с поддержкой трёх языков (RU, EN, ES), администраторским интерфейсом и управлением контентом через Appwrite.

## Ключевые особенности

2026-05-31 12:52:45 - Многоязычность (русский, английский, испанский) с локализацией на уровне файлов и localStorage. Администраторская панель для управления контентом (admin-панель). Интеграция с Appwrite для хранения документов CMS. Responsive дизайн (TailwindCSS). Versioning контента через версионные файлы (v0.1.md, v0.2.md). Развёртывание через Node adapter и PM2 с nginx в качестве обратного прокси.

## Общая архитектура

2026-05-31 12:52:45 - Frontend: SvelteKit + TailwindCSS + svelte-i18n для локализации. Backend: Appwrite (auth, database, storage), Node-appwrite SDK для server-side операций. Маршруты: SPA-подход с серверными hooks для аутентификации. Хранилище контента: Appwrite database (APPWRITE_DATABASE_ID=gelyrix_cms, APPWRITE_CMS_COLLECTION_ID=cms_documents). Deployment: Node adapter -> PM2 (ecosystem.config.js) -> nginx reverse proxy.

## Технический стек

2026-05-31 12:52:45 - SvelteKit 2.49.1 (framework), TailwindCSS 3.4.17 (styling), Appwrite 21.5.0 + node-appwrite 24.0.0 (backend), svelte-i18n 4.0.1 (localization), TypeScript 5.9.3 (type safety), Vite 7.2.6 (bundler), svelte-check 4.3.4 (linting).

## Структура маршрутов

2026-05-31 12:52:45 - Главная: /. About: /about. Admin панель: /admin (защищена аутентификацией). Blog: /blog. Контакты: /contacts. FAQ: /faq. How-it-works: /how-it-works. Investors: /investors. Lab: /lab. Legal (условия, политика): /legal. Services: /services. Transparency: /transparency. Sitemap: /sitemap.xml.

## Переменные окружения

2026-05-31 12:52:45 - PUBLIC_APPWRITE_ENDPOINT (public, client-side). PUBLIC_APPWRITE_PROJECT_ID (public, client-side). APPWRITE_ENDPOINT (server-side). APPWRITE_PROJECT_ID (server-side). APPWRITE_API_KEY (server-side, защищённый). APPWRITE_DATABASE_ID=gelyrix_cms. APPWRITE_CMS_COLLECTION_ID=cms_documents. ADMIN_LOGIN (default: admin). ADMIN_PASSWORD (требует изменения). ADMIN_SESSION_SECRET (длинная случайная строка для сессии).
