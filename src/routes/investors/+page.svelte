<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { investorsContent, normalizeLocale, pick } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: content = pick(investorsContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/investors', currentLocale);
	$: blocks = [
		{ title: isRu ? 'Форматы финансирования' : 'Funding formats', items: content.formats },
		{ title: isRu ? 'Принципы' : 'Principles', items: content.principles },
		{ title: isRu ? 'Слоты поддержки' : 'Support slots', items: content.focus }
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
	imageAlt={isRu ? 'Планирование исследовательского проекта' : 'Research planning table'}
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
							<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-evergreen"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section class="section pt-0">
	<div class="page-container">
		<div class="grid gap-6 rounded-lg bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
			<div>
				<h2 class="text-2xl font-semibold">{isRu ? 'Поддержать измеримый этап' : 'Fund a measurable milestone'}</h2>
				<p class="mt-3 max-w-2xl text-sm leading-6 text-white/75">
					{isRu
						? 'Используйте форму сообщества, чтобы описать грант, пожертвование, DAO-предложение или инфраструктурное партнерство.'
						: 'Use the community form to describe a grant, donation, DAO proposal, or infrastructure partnership.'}
				</p>
			</div>
			<a class="btn-light" href={localizeHref('/contacts', $locale ?? 'en')}>{isRu ? 'Открыть форму' : 'Open form'}</a>
		</div>
	</div>
</section>
