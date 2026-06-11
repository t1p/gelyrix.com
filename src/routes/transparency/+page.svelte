<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { normalizeLocale, pick, transparencyContent } from '$lib/content';

	$: content = pick(transparencyContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/transparency', currentLocale);
	$: blocks = [
		{ title: isRu ? 'Принципы' : 'Principles', items: content.principles },
		{ title: isRu ? 'Мониторинг' : 'Monitoring', items: content.monitoring },
		{ title: isRu ? 'Правовые и этические вопросы' : 'Legal and ethical questions', items: content.legal }
	];
</script>

<svelte:head>
	<title>{adminSeo?.title || content.metaTitle} | Gelyrix</title>
	<meta name="description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:title" content={`${adminSeo?.title || content.metaTitle} | Gelyrix`} />
	<meta property="og:description" content={adminSeo?.description || content.metaDescription} />
	<meta property="og:image" content={adminSeo?.ogImage || content.image} />
</svelte:head>

<PageHero
	compact
	eyebrow={content.eyebrow}
	title={content.title}
	lead={content.lead}
	image={content.image}
	imageAlt={isRu ? 'Инфраструктура и рабочее место мониторинга' : 'Infrastructure and monitoring workspace'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container grid gap-6 lg:grid-cols-3">
		{#each blocks as block}
			<article class="card">
				<h2 class="text-xl font-semibold">{block.title}</h2>
				<ul class="mt-5 grid gap-3 text-sm leading-6 text-ink/70">
					{#each block.items as item}
						<li class="flex gap-3">
							<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-sun"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section class="full-bleed-band section">
	<div class="page-container grid gap-8 lg:grid-cols-[1fr_1fr]">
		<div>
			<h2 class="section-title">{isRu ? 'Дорожная карта мониторинга' : 'Monitoring roadmap'}</h2>
			<p class="section-lead">
				{isRu
					? 'Архитектура сайта оставляет место для будущего API-дашборда, но сейчас мы показываем только публичные резюме и статусы в подготовке.'
					: 'The site architecture leaves room for a future API-backed dashboard, but for now we show only public summaries and items in preparation.'}
			</p>
		</div>
		<div class="grid gap-3">
			<div class="rounded-lg border border-mist bg-white/80 p-4 text-sm text-ink/70">Dewar status: planned / in preparation</div>
			<div class="rounded-lg border border-mist bg-white/80 p-4 text-sm text-ink/70">Sample events: planned / in preparation</div>
			<div class="rounded-lg border border-mist bg-white/80 p-4 text-sm text-ink/70">Partner audits: planned / in preparation</div>
			<div class="rounded-lg border border-mist bg-white/80 p-4 text-sm text-ink/70">Public summary / публичное резюме</div>
		</div>
	</div>
</section>
