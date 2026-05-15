<script lang="ts">
	import { supportedLocales } from '$lib/adminContent';

	let { data, form } = $props();

	const locales = supportedLocales.map((locale) => ({ key: locale, label: locale.toUpperCase() }));
</script>

<svelte:head>
	<title>Админка | Gelyrix</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<section class="section">
	<div class="page-container space-y-8">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<span class="badge">Admin</span>
				<h1 class="mt-4 text-4xl font-semibold">Админка Gelyrix</h1>
				<p class="mt-3 text-sm text-ink/70">
					Последнее обновление: {new Date(data.adminContent.updatedAt).toLocaleString('ru-RU')}
				</p>
				<p class="mt-2 text-sm text-ink/70">
					Хранилище CMS: <span class="font-semibold text-evergreen">{data.storageMode}</span>
				</p>
			</div>
			<form method="POST" action="?/logout">
				<button class="btn-ghost" type="submit">Выйти</button>
			</form>
		</div>

		{#if form?.message}
			<div class="rounded-lg border border-evergreen/25 bg-evergreen/10 p-4 text-sm text-evergreen">
				{form.message}
			</div>
		{/if}

		<form class="surface space-y-6" method="POST" action="?/saveBlocks">
			<div>
				<h2 class="text-2xl font-semibold">Управление блоками</h2>
				<p class="mt-2 text-sm text-ink/70">
					Анонс появляется под hero на главной. CTA управляет финальным блоком на главной.
				</p>
			</div>

			<div class="rounded-lg border border-mist bg-white/70 p-5">
				<label class="flex items-center gap-3 text-sm font-semibold">
					<input
						class="h-4 w-4 accent-evergreen"
						name="announcement-enabled"
						type="checkbox"
						checked={data.adminContent.blocks.announcement.enabled}
					/>
					Показывать анонс на главной
				</label>

				<div class="mt-5 grid gap-6 lg:grid-cols-3">
					{#each locales as locale}
						<div class="grid gap-4">
							<h3 class="font-semibold">Анонс {locale.label}</h3>
							<input class="input" name={`announcement-${locale.key}-title`} value={data.adminContent.blocks.announcement[locale.key].title} placeholder="Заголовок" />
							<textarea class="input min-h-[110px]" name={`announcement-${locale.key}-text`} placeholder="Текст">{data.adminContent.blocks.announcement[locale.key].text}</textarea>
							<input class="input" name={`announcement-${locale.key}-buttonLabel`} value={data.adminContent.blocks.announcement[locale.key].buttonLabel} placeholder="Текст кнопки" />
							<input class="input" name={`announcement-${locale.key}-buttonHref`} value={data.adminContent.blocks.announcement[locale.key].buttonHref} placeholder="/blog" />
						</div>
					{/each}
				</div>
			</div>

			<div class="rounded-lg border border-mist bg-white/70 p-5">
				<h3 class="font-semibold">Финальный CTA на главной</h3>
				<div class="mt-5 grid gap-6 lg:grid-cols-3">
					{#each locales as locale}
						<div class="grid gap-4">
							<h4 class="font-semibold">CTA {locale.label}</h4>
							<input class="input" name={`homeCta-${locale.key}-title`} value={data.adminContent.blocks.homeCta[locale.key].title} placeholder="Заголовок" />
							<textarea class="input min-h-[110px]" name={`homeCta-${locale.key}-text`} placeholder="Текст">{data.adminContent.blocks.homeCta[locale.key].text}</textarea>
							<input class="input" name={`homeCta-${locale.key}-buttonLabel`} value={data.adminContent.blocks.homeCta[locale.key].buttonLabel} placeholder="Текст кнопки" />
							<input class="input" name={`homeCta-${locale.key}-buttonHref`} value={data.adminContent.blocks.homeCta[locale.key].buttonHref} placeholder="/contacts" />
						</div>
					{/each}
				</div>
			</div>

			<button class="btn-primary" type="submit">Сохранить блоки</button>
		</form>

		<form class="surface space-y-6" method="POST" action="?/saveArticles">
			<div>
				<h2 class="text-2xl font-semibold">Статьи</h2>
				<p class="mt-2 text-sm text-ink/70">
					Публичный блог и карточки на главной читают эти статьи через SSR. Body: один абзац на блок,
					разделение пустой строкой.
				</p>
			</div>

			<div class="grid gap-6">
				{#each locales as locale}
					<div class="rounded-lg border border-mist bg-white/70 p-5">
						<h3 class="text-xl font-semibold">Статьи {locale.label}</h3>
						<input type="hidden" name={`articles-${locale.key}-count`} value={data.cmsArticles[locale.key].length} />
						<div class="mt-5 grid gap-5">
							{#each [...data.cmsArticles[locale.key], { slug: '', category: '', title: '', description: '', readTime: '', body: [] }] as article, index}
								<details class="rounded-lg border border-mist bg-white/75 p-4" open={index === data.cmsArticles[locale.key].length}>
									<summary class="cursor-pointer font-semibold">
										{article.title || 'Новая статья'} <span class="text-sm font-normal text-ink/50">{article.slug}</span>
									</summary>
									<div class="mt-4 grid gap-4">
										<div class="grid gap-4 md:grid-cols-3">
											<label class="grid gap-1 text-xs font-semibold uppercase text-ink/50">
												Slug
												<input class="input" name={`article-${locale.key}-${index}-slug`} value={article.slug} placeholder="slug" />
											</label>
											<label class="grid gap-1 text-xs font-semibold uppercase text-ink/50">
												Категория
												<input class="input" name={`article-${locale.key}-${index}-category`} value={article.category} placeholder="Крионика 101" />
											</label>
											<label class="grid gap-1 text-xs font-semibold uppercase text-ink/50">
												Время чтения
												<input class="input" name={`article-${locale.key}-${index}-readTime`} value={article.readTime} placeholder="6 минут" />
											</label>
										</div>
										<input class="input" name={`article-${locale.key}-${index}-title`} value={article.title} placeholder="Заголовок" />
										<textarea class="input min-h-[90px]" name={`article-${locale.key}-${index}-description`} placeholder="Description">{article.description}</textarea>
										<textarea class="input min-h-[180px]" name={`article-${locale.key}-${index}-body`} placeholder="Body">{article.body.join('\n\n')}</textarea>
										{#if index < data.cmsArticles[locale.key].length}
											<label class="flex items-center gap-3 text-sm text-ink/70">
												<input class="h-4 w-4 accent-sun" name={`article-${locale.key}-${index}-delete`} type="checkbox" />
												Удалить статью при сохранении
											</label>
										{/if}
									</div>
								</details>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<button class="btn-primary" type="submit">Сохранить статьи</button>
		</form>

		<form class="surface space-y-6" method="POST" action="?/saveSeo">
			<div>
				<h2 class="text-2xl font-semibold">SEO страниц</h2>
				<p class="mt-2 text-sm text-ink/70">
					Title, description и OpenGraph image рендерятся на SSR. Поле OG image можно оставить пустым.
				</p>
			</div>

			<div class="grid gap-5">
				{#each data.adminContent.seo as entry, index}
					<details class="rounded-lg border border-mist bg-white/70 p-5">
						<summary class="cursor-pointer text-lg font-semibold">
							{entry.label} <span class="text-sm font-normal text-ink/50">{entry.path}</span>
						</summary>
						<div class="mt-5 grid gap-6 lg:grid-cols-3">
							{#each locales as locale}
								<div class="grid gap-4">
									<h3 class="font-semibold">{locale.label}</h3>
									<input class="input" name={`seo-${index}-${locale.key}-title`} value={entry[locale.key].title} placeholder="Title" />
									<textarea class="input min-h-[120px]" name={`seo-${index}-${locale.key}-description`} placeholder="Description">{entry[locale.key].description}</textarea>
									<input class="input" name={`seo-${index}-${locale.key}-ogImage`} value={entry[locale.key].ogImage} placeholder="https://.../image.jpg" />
								</div>
							{/each}
						</div>
					</details>
				{/each}
			</div>

			<button class="btn-primary" type="submit">Сохранить SEO</button>
		</form>
	</div>
</section>
