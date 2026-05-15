<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import type { AdminLocale } from '$lib/adminContent';
	import { articles, blogContent, images, normalizeLocale, pick } from '$lib/content';
	import { localizeHref } from '$lib/locales';

	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: articleList = $page.data.cmsArticles?.[currentLocale] ?? pick(articles, $locale);
	$: article = articleList.find((item) => item.slug === $page.params.slug) ?? articleList[0];
	$: content = pick(blogContent, $locale);
</script>

<svelte:head>
	<title>{article.title} | Gelyrix</title>
	<meta name="description" content={article.description} />
	<meta property="og:title" content={`${article.title} | Gelyrix`} />
	<meta property="og:description" content={article.description} />
	<meta property="og:image" content={images.research} />
</svelte:head>

<PageHero
	compact
	eyebrow={article.category}
	title={article.title}
	lead={article.description}
	image={images.research}
	imageAlt={isRu ? 'Рабочее место для исследовательской статьи' : 'Research article workspace'}
	breadcrumbs={[{ label: content.eyebrow, href: '/blog' }, { label: article.title }]}
/>

<article class="section">
	<div class="page-container max-w-3xl">
		<div class="mb-8 text-sm font-semibold uppercase text-evergreen">{article.readTime}</div>
		<div class="space-y-6 text-lg leading-8 text-ink/80">
			{#each article.body as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>
		<div class="mt-10 flex flex-wrap gap-3">
			<a class="btn-ghost" href={localizeHref('/blog', $locale ?? 'en')}>{isRu ? 'К списку статей' : 'Back to articles'}</a>
			<a class="btn-primary" href={localizeHref('/contacts', $locale ?? 'en')}>{isRu ? 'Обсудить тему' : 'Discuss this topic'}</a>
		</div>
	</div>
</article>
