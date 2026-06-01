<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { labContent, normalizeLocale, pick } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: content = pick(labContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/lab', currentLocale);
	$: blocks = [
		{ title: isRu ? 'Направления исследований' : 'Research areas', items: content.areas },
		{ title: isRu ? 'Формат отчетности' : 'Reporting format', items: content.reporting },
		{ title: isRu ? 'Как присоединиться' : 'How to join', items: content.join }
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
	imageAlt={isRu ? 'Лабораторное оборудование' : 'Laboratory equipment'}
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
	<div class="page-container grid gap-6">
		<div class="card">
			<h2 class="text-2xl font-semibold">{isRu ? 'Публичные материалы лаборатории (MVP)' : 'Public lab materials (MVP)'}</h2>
			<div class="mt-5 grid gap-4 md:grid-cols-2">
				<article class="rounded-lg border border-mist bg-white/70 p-4">
					<div class="text-xs font-semibold uppercase text-evergreen">{isRu ? 'Протокол эксперимента' : 'Experiment protocol'}</div>
					<h3 class="mt-2 text-lg font-semibold">{isRu ? 'GLX-LAB-001: Витрификация биообразца v1.0' : 'GLX-LAB-001: Biosample vitrification v1.0'}</h3>
					<p class="mt-2 text-sm text-ink/70">{isRu ? 'Пошаговый публичный протокол для BioSample с контрольными точками качества и рисков.' : 'Step-by-step public BioSample protocol with quality and risk checkpoints.'}</p>
				</article>
				<article class="rounded-lg border border-mist bg-white/70 p-4">
					<div class="text-xs font-semibold uppercase text-evergreen">{isRu ? 'Публичный отчёт' : 'Public report'}</div>
					<h3 class="mt-2 text-lg font-semibold">{isRu ? 'GLX-REP-001: Отчёт по стабильности хранения Q2' : 'GLX-REP-001: Q2 storage stability report'}</h3>
					<p class="mt-2 text-sm text-ink/70">{isRu ? 'Публичная сводка по мониторингу, отклонениям и действиям по корректировке в контуре Lab.' : 'Public summary of monitoring, deviations, and corrective actions within the Lab track.'}</p>
				</article>
			</div>
		</div>
		<div class="grid gap-6 rounded-lg bg-ink p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
			<div>
				<h2 class="text-2xl font-semibold">{isRu ? 'Предложить эксперимент' : 'Propose an experiment'}</h2>
				<p class="mt-3 max-w-2xl text-sm leading-6 text-white/75">
					{isRu
						? 'Отправьте методику, оборудование или сценарий финансирования. Мы привяжем его к конкретному исследовательскому треку.'
						: 'Send a method, equipment proposal, or funding scenario. We will map it to a concrete research track.'}
				</p>
			</div>
			<a class="btn-light" href={localizeHref('/contacts', $locale ?? 'en')}>{isRu ? 'Связаться' : 'Contact us'}</a>
		</div>
	</div>
</section>
