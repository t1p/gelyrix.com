<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { defaultLocale, localizeHref, supportedLocales, type SupportedLocale } from '$lib/locales';
	import { locale, t } from 'svelte-i18n';
	import { setLocale } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { untrack } from 'svelte';

	let { data, children } = $props();

	untrack(() => setLocale(data.locale ?? defaultLocale));

	const primaryNavItems = [
		{ href: '/', label: 'nav.home' },
		{ href: '/how-it-works', label: 'nav.howItWorks' },
		{ href: '/services', label: 'nav.services' },
		{ href: '/lab', label: 'nav.lab' },
		{ href: '/blog', label: 'nav.blog' },
		{ href: '/about', label: 'nav.about' }
	];

	const secondaryNavItems = [
		{ href: '/transparency', label: 'nav.transparency' },
		{ href: '/investors', label: 'nav.investors' },
		{ href: '/faq', label: 'nav.faq' },
		{ href: '/legal', label: 'nav.legal' },
		{ href: '/contacts', label: 'nav.contacts' }
	];

	const mobileNavItems = [...primaryNavItems, ...secondaryNavItems];

	const closeDropdowns = () => {
		if (!browser) {
			return;
		}

		document.querySelectorAll<HTMLDetailsElement>('header details[open]').forEach((details) => {
			details.open = false;
		});
	};

	const activeLocale = () => data.locale ?? defaultLocale;
	const localizedHref = (href: string) => localizeHref(href, activeLocale());
	const localizedCurrentHref = (nextLocale: SupportedLocale) => {
		const search = browser ? $page.url.search : '';
		return localizeHref(`${$page.url.pathname}${search}`, nextLocale);
	};

	const changeLocale = (nextLocale: SupportedLocale) => {
		setLocale(nextLocale);
		closeDropdowns();
	};

	type TransitionDocument = Document & {
		startViewTransition?: (callback: () => Promise<void> | void) => { finished: Promise<void> };
	};

	onNavigate((navigation) => {
		closeDropdowns();

		if (!browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const transitionDocument = document as TransitionDocument;
		if (!transitionDocument.startViewTransition) {
			return;
		}

		return new Promise<void>((resolve) => {
			transitionDocument.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	$effect(() => {
		if (browser) {
			setLocale(data.locale ?? defaultLocale);
			document.documentElement.lang = data.locale ?? defaultLocale;
		}
	});
</script>

<svelte:head>
	<link rel="icon" type="image/jpeg" href="/logo.jpeg" />
	<link rel="apple-touch-icon" href="/logo.jpeg" />
	{#if data.canonicalUrl}
		<link rel="canonical" href={data.canonicalUrl} />
	{/if}
	{#each data.alternateLinks ?? [] as alternate}
		<link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
	{/each}
	{#if data.xDefaultUrl}
		<link rel="alternate" hreflang="x-default" href={data.xDefaultUrl} />
	{/if}
</svelte:head>

<div class="min-h-screen">
	<header class="sticky top-0 z-40 border-b border-mist/70 bg-white/80 shadow-[0_1px_0_rgba(11,31,26,0.03)] backdrop-blur">
		<div class="page-container flex items-center justify-between gap-4 py-4">
			<a href={localizedHref('/')} class="flex shrink-0 items-center gap-3">
				<img class="h-10 w-10 rounded-lg object-cover shadow-soft" src="/logo.jpeg" alt="Gelyrix" />
				<div class="leading-tight">
					<div class="text-base font-semibold text-ink">{$t('site.name')}</div>
					<div class="hidden text-xs uppercase text-ink/50 2xl:block">{$t('site.tagline')}</div>
				</div>
			</a>

			<nav class="hidden min-w-0 items-center gap-3 lg:flex">
				{#each primaryNavItems as item}
					<a class="nav-link" href={localizedHref(item.href)} onclick={closeDropdowns}>{$t(item.label)}</a>
				{/each}
				<details class="relative">
					<summary class="nav-link cursor-pointer list-none rounded-lg px-2 py-2">
						{$t('common.more')}
					</summary>
					<div
						class="absolute right-0 mt-3 flex w-56 flex-col gap-2 rounded-lg border border-mist/90 bg-white/95 p-4 shadow-soft backdrop-blur"
					>
						{#each secondaryNavItems as item}
							<a class="nav-link" href={localizedHref(item.href)} onclick={closeDropdowns}>{$t(item.label)}</a>
						{/each}
					</div>
				</details>
			</nav>

			<div class="flex shrink-0 items-center gap-2">
				<details class="relative hidden md:block">
					<summary
						class="cursor-pointer list-none rounded-lg border border-mist/80 bg-white/75 px-3 py-2 text-xs font-semibold text-ink/70"
					>
						{($locale ?? defaultLocale).toUpperCase()}
					</summary>
					<div
						class="absolute right-0 mt-3 grid w-28 gap-1 rounded-lg border border-mist/90 bg-white/95 p-2 shadow-soft backdrop-blur"
					>
						{#each supportedLocales as option}
							<a
								class={`rounded-md px-3 py-2 text-left text-xs font-semibold ${$locale === option ? 'bg-evergreen text-white' : 'text-ink/70 hover:bg-mist'}`}
								href={localizedCurrentHref(option)}
								onclick={() => changeLocale(option)}
							>
								{option.toUpperCase()}
							</a>
						{/each}
					</div>
				</details>
				<a class="btn-primary hidden sm:inline-flex" href={localizedHref('/contacts')} onclick={closeDropdowns}>{$t('common.requestConsultation')}</a>
				<details class="relative lg:hidden">
					<summary class="rounded-lg border border-mist/80 px-3 py-2 text-sm font-medium text-ink/70">
						{$t('common.menu')}
					</summary>
					<div
						class="absolute right-0 mt-3 flex w-64 flex-col gap-2 rounded-lg border border-mist/90 bg-white/95 p-4 shadow-soft backdrop-blur"
					>
						{#each mobileNavItems as item}
							<a class="nav-link" href={localizedHref(item.href)} onclick={closeDropdowns}>{$t(item.label)}</a>
						{/each}
						<div class="mt-2 flex items-center gap-2 text-xs font-semibold text-ink/50">
							{$t('common.language')}:
							{#each supportedLocales as option}
								<a class="rounded-md px-2 py-1 text-ink/60" href={localizedCurrentHref(option)} onclick={() => changeLocale(option)}>
									{option.toUpperCase()}
								</a>
							{/each}
						</div>
					</div>
				</details>
			</div>
		</div>
	</header>

	<main id="main" class="page-shell">
		{@render children()}
	</main>

	<footer class="border-t border-mist/80 bg-white/70">
		<div class="page-container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<img class="h-9 w-9 rounded-lg object-cover" src="/logo.jpeg" alt="Gelyrix" />
					<div class="text-lg font-semibold">{$t('site.name')}</div>
				</div>
				<p class="text-sm text-ink/70">{$t('footer.note')}</p>
				<a class="btn-ghost w-fit" href={localizedHref('/contacts')}>{$t('footer.cta')}</a>
			</div>
			<div class="space-y-3 text-sm">
				<div class="text-xs font-semibold uppercase text-ink/40">{$t('footer.navigation')}</div>
				<a class="nav-link block" href={localizedHref('/about')}>{$t('nav.about')}</a>
				<a class="nav-link block" href={localizedHref('/how-it-works')}>{$t('nav.howItWorks')}</a>
				<a class="nav-link block" href={localizedHref('/services')}>{$t('nav.services')}</a>
				<a class="nav-link block" href={localizedHref('/lab')}>{$t('nav.lab')}</a>
				<a class="nav-link block" href={localizedHref('/blog')}>{$t('nav.blog')}</a>
			</div>
			<div class="space-y-3 text-sm">
				<div class="text-xs font-semibold uppercase text-ink/40">{$t('footer.more')}</div>
				<a class="nav-link block" href={localizedHref('/transparency')}>{$t('nav.transparency')}</a>
				<a class="nav-link block" href={localizedHref('/investors')}>{$t('nav.investors')}</a>
				<a class="nav-link block" href={localizedHref('/faq')}>{$t('nav.faq')}</a>
				<a class="nav-link block" href={localizedHref('/legal')}>{$t('nav.legal')}</a>
				<a class="nav-link block" href={localizedHref('/contacts')}>{$t('nav.contacts')}</a>
			</div>
		</div>
		<div class="border-t border-mist/80 py-4 text-center text-xs text-ink/50">
			© {new Date().getFullYear()} {$t('site.name')} · {$t('footer.rights')}
		</div>
	</footer>
</div>
