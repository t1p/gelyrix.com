<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import PageHero from '$lib/components/PageHero.svelte';
	import { getSeoForPath, type AdminLocale } from '$lib/adminContent';
	import { contactsContent, normalizeLocale, pick } from '$lib/content';

	$: content = pick(contactsContent, $locale);
	$: currentLocale = normalizeLocale($locale) as AdminLocale;
	$: isRu = currentLocale === 'ru';
	$: adminSeo = getSeoForPath($page.data.adminContent, '/contacts', currentLocale);
	$: telegramUrl = 'https://t.me/CryomBot';
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
	imageAlt={isRu ? 'Рабочее место для связи и поддержки' : 'Contact and support workspace'}
	breadcrumbs={[{ label: content.eyebrow }]}
/>

<section class="section">
	<div class="page-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
		<aside class="surface">
			<h2 class="text-xl font-semibold">{isRu ? 'Способы связи' : 'Contact methods'}</h2>
			<ul class="mt-5 grid gap-3 text-sm leading-6 text-ink/70">
				<li class="flex gap-3">
					<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-evergreen"></span>
					<a class="font-semibold text-evergreen hover:text-tide" href={`mailto:${content.email}`}>
						{content.email}
					</a>
				</li>
				<li class="flex gap-3">
					<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-evergreen"></span>
					<a class="font-semibold text-evergreen hover:text-tide" href={telegramUrl}>@CryomBot</a>
				</li>
				{#each content.methods as item}
					<li class="flex gap-3">
						<span class="mt-2 h-2 w-2 shrink-0 rounded-sm bg-evergreen"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</aside>

		<div class="grid gap-6">
			<form class="card">
				<h2 class="text-xl font-semibold">{content.consultationTitle}</h2>
				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="consultation-name">
							{content.name}
						</label>
						<input class="input" id="consultation-name" name="name" type="text" autocomplete="name" required />
					</div>
					<div>
						<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="consultation-contact">
							{content.contact}
						</label>
						<input class="input" id="consultation-contact" name="contact" type="text" required />
					</div>
				</div>
				<label class="mt-4 block text-xs font-semibold uppercase text-ink/50" for="consultation-message">
					{content.message}
				</label>
				<textarea class="input mt-2 min-h-[120px]" id="consultation-message" name="message" required></textarea>
				<label class="sr-only" for="consultation-company">{content.spam}</label>
				<input class="hidden" id="consultation-company" name="company" tabindex="-1" autocomplete="off" />
				<a class="btn-primary mt-5 inline-flex" href={telegramUrl} target="_blank" rel="noreferrer">{content.submit}</a>
				<p class="mt-4 text-sm text-ink/60">{content.disclaimer}</p>
			</form>

			<form class="card">
				<h2 class="text-xl font-semibold">{content.communityTitle}</h2>
				<div class="mt-5 grid gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="community-name">
							{content.name}
						</label>
						<input class="input" id="community-name" name="name" type="text" autocomplete="name" required />
					</div>
					<div>
						<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="community-contact">
							{content.contact}
						</label>
						<input class="input" id="community-contact" name="contact" type="text" required />
					</div>
				</div>
				<label class="mt-4 block text-xs font-semibold uppercase text-ink/50" for="community-interest">
					{content.interest}
				</label>
				<select class="input mt-2" id="community-interest" name="interest" required>
					{#each content.options as option}
						<option>{option}</option>
					{/each}
				</select>
				<label class="mt-4 block text-xs font-semibold uppercase text-ink/50" for="community-message">
					{content.message}
				</label>
				<textarea class="input mt-2 min-h-[120px]" id="community-message" name="message" required></textarea>
				<label class="sr-only" for="community-company">{content.spam}</label>
				<input class="hidden" id="community-company" name="company" tabindex="-1" autocomplete="off" />
				<a class="btn-primary mt-5 inline-flex" href={telegramUrl} target="_blank" rel="noreferrer">{content.submit}</a>
				<p class="mt-4 text-sm text-ink/60">{content.disclaimer}</p>
			</form>
		</div>
	</div>
</section>
