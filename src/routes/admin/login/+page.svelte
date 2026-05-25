<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Вход в админку | Gelyrix</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<section class="section min-h-[70vh]">
	<div class="page-container max-w-lg">
		<div class="card">
			<span class="badge">Admin</span>
			<h1 class="mt-5 text-3xl font-semibold">Вход в админку</h1>
			<p class="mt-3 text-sm leading-6 text-ink/70">
				Используются переменные окружения <code>ADMIN_LOGIN</code> и <code>ADMIN_PASSWORD</code>.
			</p>

			{#if !data.configured}
				<div class="mt-5 rounded-lg border border-sun/30 bg-sun/10 p-4 text-sm text-ink/75">
					Нужно добавить <code>ADMIN_LOGIN</code>, <code>ADMIN_PASSWORD</code> и желательно
					<code>ADMIN_SESSION_SECRET</code> в <code>.env</code>.
				</div>
			{/if}

			{#if form?.error}
				<div class="mt-5 rounded-lg border border-sun/30 bg-sun/10 p-4 text-sm text-ink/75">
					{form.error}
				</div>
			{/if}

			<form class="mt-6 grid gap-4" method="POST">
				<div>
					<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="login">Логин</label>
					<input class="input" id="login" name="login" autocomplete="username" required />
				</div>
				<div>
					<label class="mb-2 block text-xs font-semibold uppercase text-ink/50" for="password">Пароль</label>
					<input class="input" id="password" name="password" type="password" autocomplete="current-password" required />
				</div>
				<button class="btn-primary" type="submit">Войти</button>
			</form>
		</div>
	</div>
</section>
