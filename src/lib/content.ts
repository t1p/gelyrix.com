import { defaultLocale, isSupportedLocale, type SupportedLocale } from '$lib/locales';

export type ContentLocale = SupportedLocale;

export type ActionLink = {
	label: string;
	href: string;
	variant?: 'primary' | 'secondary';
};

export type TextCard = {
	title: string;
	text: string;
	kicker?: string;
	points?: string[];
};

export type Article = {
	slug: string;
	category: string;
	title: string;
	description: string;
	readTime: string;
	body: string[];
};

export const normalizeLocale = (locale?: string | null): ContentLocale => (isSupportedLocale(locale) ? locale : defaultLocale);

export const pick = <T>(content: Partial<Record<ContentLocale, T>> & Record<typeof defaultLocale, T>, locale?: string | null): T => {
	return content[normalizeLocale(locale)] ?? content[defaultLocale];
};

export const images = {
	hero:
		'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1800&q=80',
	lab:
		'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=80',
	dewar:
		'https://upload.wikimedia.org/wikipedia/commons/d/d3/Liquid_Nitrogen_Tank.JPG',
	team:
		'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
	pet:
		'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80',
	research:
		'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1400&q=80',
	funding:
		'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1400&q=80',
	infrastructure:
		'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
	contact:
		'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80'
};

export const homeContent = {
	ru: {
		metaTitle: 'Gelyrix - криосохранение и нейросохранение',
		metaDescription:
			'Некоммерческое объединение Gelyrix развивает инфраструктуру криосохранения, нейросохранения, криомодулей и открытых исследований.',
		eyebrow: 'Открытая крионическая инициатива',
		title: 'Криосохранение и нейросохранение с научным подходом',
		subtitle:
			'Gelyrix развивает инфраструктуру крионики: от экспериментальных протоколов и мониторинга до партнерской сети хранилищ и криомодулей.',
		tagline: 'Жизнь продолжается, просто на паузе.',
		actions: [
			{ label: 'Хочу разобраться, что такое крионика', href: '/how-it-works', variant: 'primary' },
			{ label: 'Обсудить криосохранение / нейросохранение', href: '/contacts', variant: 'secondary' }
		] satisfies ActionLink[],
		summaryTitle: 'Gelyrix за 30 секунд',
		summaryLead:
			'Мы не продаем обещание бессмертия. Мы строим честную инфраструктуру для сохранения биоматериалов и проверки того, что реально обратимо.',
		summary: [
			{
				kicker: '01',
				title: 'Экспериментальная криоконсервация',
				text: 'Животные, органы и ткани сохраняются по документируемым протоколам с фиксацией ограничений.'
			},
			{
				kicker: '02',
				title: 'Нейросохранение и Aicoda',
				text: 'Отдельный фокус - сохранение мозга, связей и цифрового контекста личности.'
			},
			{
				kicker: '03',
				title: 'Прозрачный мониторинг',
				text: 'Состояние дьюаров, образцов и ключевых параметров должно быть проверяемым, а не скрытым.'
			},
			{
				kicker: '04',
				title: 'Опыты на обратимость',
				text: 'Мы ставим в центр функциональную и структурную сохранность тканей, а не только идею будущего спасения.'
			},
			{
				kicker: '05',
				title: 'Партнерская сеть хранилищ',
				text: 'Россия, Грузия, Черногория и другие локации с едиными стандартами запуска.'
			},
			{
				kicker: '06',
				title: 'Криомодули',
				text: 'Модульные здания под криолаборатории и хранилища для партнеров, лабораторий и частных заказчиков.'
			}
		] satisfies TextCard[],
		stepsTitle: 'Как работает крионика',
		stepsLead: 'Путь понятен заранее: подготовка, криопротокол, хранение и честная фиксация будущих гипотез.',
		steps: [
			{ title: 'Подготовка', text: 'Консультация, документы, план протокола и логистика.' },
			{ title: 'Криосохранение', text: 'Охлаждение, криопротекторы, перфузия и витрификация, когда это применимо.' },
			{ title: 'Долговременное хранение', text: 'Хранение в дьюарах или модульной инфраструктуре с мониторингом.' },
			{ title: 'Будущее восстановление', text: 'Пока это гипотеза. Мы прямо отделяем научные данные от надежды.' }
		] satisfies TextCard[],
		differenceTitle: 'Наше отличие',
		difference: [
			'Фокус на реальной обратимости тканей и органов.',
			'Публичные отчеты, протоколы и планы экспериментов.',
			'Связка крионики с нейросохранением и цифровым бэкапом сознания.',
			'НКО-формат: участие через вклад, экспертизу, инфраструктуру и сообщество.',
			'Открытая модель финансирования для конкретных исследований и новых хранилищ.'
		],
		audienceTitle: 'Для кого это',
		audience: [
			'Владельцы животных',
			'Люди, планирующие криосохранение',
			'Исследователи и инженеры',
			'Лаборатории, клиники и операторы хранилищ',
			'Инвесторы, доноры и DAO-комьюнити'
		],
		articlesTitle: 'Популяризация крионики',
		articlesLead: 'Материалы на запуск: база, мифы, научные ограничения и инфраструктура.',
		teamTitle: 'Команда и партнеры',
		teamText:
			'Gelyrix открыт для биологов, инженеров, операторов инфраструктуры, волонтеров, доноров и партнерских организаций. Логотипы CryoDAO, Aicoda и локальных партнеров можно добавить по мере готовности.',
		ctaTitle: 'Есть вопрос или сценарий?',
		ctaText: 'Опишите ситуацию: питомец, исследование, партнерская локация, криомодуль или участие в сообществе.',
		ctaButton: 'Оставить запрос'
	},
	en: {
		metaTitle: 'Gelyrix - cryopreservation and neurosafekeeping',
		metaDescription:
			'Gelyrix is a non-profit initiative building cryopreservation, neurosafekeeping, cryomodule, and open research infrastructure.',
		eyebrow: 'Open cryonics initiative',
		title: 'Cryopreservation and neurosafekeeping with a scientific approach',
		subtitle:
			'Gelyrix builds cryonics infrastructure: experimental protocols, monitoring, partner storage locations, and modular cryolabs.',
		tagline: 'Life continues, just on pause.',
		actions: [
			{ label: 'I want to understand cryonics', href: '/how-it-works', variant: 'primary' },
			{ label: 'Discuss cryo / neuro preservation', href: '/contacts', variant: 'secondary' }
		] satisfies ActionLink[],
		summaryTitle: 'Gelyrix in 30 seconds',
		summaryLead:
			'We do not sell immortality. We build honest infrastructure for preserving biomaterials and testing what can become reversible.',
		summary: [
			{
				kicker: '01',
				title: 'Experimental cryoconservation',
				text: 'Animals, organs, and tissues are preserved through documented protocols with clear limits.'
			},
			{
				kicker: '02',
				title: 'Neurosafekeeping and Aicoda',
				text: 'A dedicated focus on brain preservation, neural connections, and digital identity context.'
			},
			{
				kicker: '03',
				title: 'Transparent monitoring',
				text: 'Dewar status, samples, and critical parameters should be auditable, not hidden.'
			},
			{
				kicker: '04',
				title: 'Reversibility experiments',
				text: 'We focus on functional and structural integrity of tissue, not only future-oriented hope.'
			},
			{
				kicker: '05',
				title: 'Partner storage network',
				text: 'Russia, Georgia, Montenegro, and other locations with shared launch standards.'
			},
			{
				kicker: '06',
				title: 'Cryomodules',
				text: 'Modular buildings for cryolabs and storage sites for partners, labs, and private clients.'
			}
		] satisfies TextCard[],
		stepsTitle: 'How cryonics works',
		stepsLead: 'The journey is clear upfront: preparation, cryoprotocol, storage, and honest separation of future hypotheses.',
		steps: [
			{ title: 'Preparation', text: 'Consultation, documents, protocol planning, and logistics.' },
			{ title: 'Cryopreservation', text: 'Cooling, cryoprotectants, perfusion, and vitrification where applicable.' },
			{ title: 'Long-term storage', text: 'Storage in dewars or modular infrastructure with monitoring.' },
			{ title: 'Future restoration', text: 'This remains a hypothesis. We separate evidence from hope.' }
		] satisfies TextCard[],
		differenceTitle: 'What makes us different',
		difference: [
			'Focus on real tissue and organ reversibility.',
			'Public reports, protocols, and experiment roadmaps.',
			'Connection between cryonics, neurosafekeeping, and digital mind backup.',
			'Non-profit format: participation through contribution, expertise, infrastructure, and community.',
			'Open funding model for specific studies and new storage locations.'
		],
		audienceTitle: 'Who it is for',
		audience: [
			'Pet owners',
			'People planning cryopreservation',
			'Researchers and engineers',
			'Labs, clinics, and storage operators',
			'Investors, donors, and DAO communities'
		],
		articlesTitle: 'Cryonics education',
		articlesLead: 'Launch materials: fundamentals, myths, scientific limits, and infrastructure.',
		teamTitle: 'Team and partners',
		teamText:
			'Gelyrix is open to biologists, engineers, infrastructure operators, volunteers, donors, and partner organizations. CryoDAO, Aicoda, and regional partner logos can be added when ready.',
		ctaTitle: 'Have a question or scenario?',
		ctaText: 'Describe your case: a pet, a study, a partner site, a cryomodule, or community participation.',
		ctaButton: 'Send a request'
	},
	es: {
		metaTitle: 'Gelyrix - criopreservación y neurosalvaguarda',
		metaDescription:
			'Gelyrix es una iniciativa sin ánimo de lucro que desarrolla infraestructura de criopreservación, neurosalvaguarda, criomódulos e investigación abierta.',
		eyebrow: 'Iniciativa criónica abierta',
		title: 'Criopreservación y neurosalvaguarda con enfoque científico',
		subtitle:
			'Gelyrix construye infraestructura de criónica: protocolos experimentales, monitoreo, ubicaciones de almacenamiento asociadas y criolaboratorios modulares.',
		tagline: 'La vida continúa, solo está en pausa.',
		actions: [
			{ label: 'Quiero entender la criónica', href: '/how-it-works', variant: 'primary' },
			{ label: 'Hablar sobre crio / neuro preservación', href: '/contacts', variant: 'secondary' }
		] satisfies ActionLink[],
		summaryTitle: 'Gelyrix en 30 segundos',
		summaryLead:
			'No vendemos inmortalidad. Construimos infraestructura honesta para preservar biomateriales y comprobar qué puede llegar a ser reversible.',
		summary: [
			{
				kicker: '01',
				title: 'Crioconservación experimental',
				text: 'Animales, órganos y tejidos se preservan mediante protocolos documentados con límites claros.'
			},
			{
				kicker: '02',
				title: 'Neurosalvaguarda y Aicoda',
				text: 'Un foco específico en la preservación del cerebro, las conexiones neuronales y el contexto digital de la identidad.'
			},
			{
				kicker: '03',
				title: 'Monitoreo transparente',
				text: 'El estado de los dewars, las muestras y los parámetros críticos debe ser auditable, no oculto.'
			},
			{
				kicker: '04',
				title: 'Experimentos de reversibilidad',
				text: 'Nos centramos en la integridad funcional y estructural del tejido, no solo en una esperanza futura.'
			},
			{
				kicker: '05',
				title: 'Red de almacenamiento asociada',
				text: 'Rusia, Georgia, Montenegro, RPD y futuros hubs locales con estándares compartidos de lanzamiento.'
			},
			{
				kicker: '06',
				title: 'Criomódulos',
				text: 'Edificios modulares para criolaboratorios y sitios de almacenamiento para socios, laboratorios y clientes privados.'
			}
		] satisfies TextCard[],
		stepsTitle: 'Cómo funciona la criónica',
		stepsLead: 'El recorrido queda claro desde el inicio: preparación, crioprotocolo, almacenamiento y separación honesta de hipótesis futuras.',
		steps: [
			{ title: 'Preparación', text: 'Consulta, documentos, planificación del protocolo y logística.' },
			{ title: 'Criopreservación', text: 'Enfriamiento, crioprotectores, perfusión y vitrificación cuando aplica.' },
			{ title: 'Almacenamiento a largo plazo', text: 'Almacenamiento en dewars o infraestructura modular con monitoreo.' },
			{ title: 'Restauración futura', text: 'Sigue siendo una hipótesis. Separamos evidencia y esperanza.' }
		] satisfies TextCard[],
		differenceTitle: 'Qué nos diferencia',
		difference: [
			'Foco en la reversibilidad real de tejidos y órganos.',
			'Informes públicos, protocolos y hojas de ruta de experimentos.',
			'Conexión entre criónica, neurosalvaguarda y respaldo digital de la mente.',
			'Formato sin ánimo de lucro: participación mediante contribución, experiencia, infraestructura y comunidad.',
			'Modelo de financiación abierta para estudios concretos y nuevas ubicaciones de almacenamiento.'
		],
		audienceTitle: 'Para quién es',
		audience: [
			'Dueños de mascotas',
			'Personas que planifican criopreservación',
			'Investigadores e ingenieros',
			'Laboratorios, clínicas y operadores de almacenamiento',
			'Inversores, donantes y comunidades DAO'
		],
		articlesTitle: 'Educación sobre criónica',
		articlesLead: 'Materiales de lanzamiento: fundamentos, mitos, límites científicos e infraestructura.',
		teamTitle: 'Equipo y socios',
		teamText:
			'Gelyrix está abierto a biólogos, ingenieros, operadores de infraestructura, voluntarios, donantes y organizaciones asociadas. Los logotipos de CryoDAO, Aicoda y socios regionales pueden añadirse cuando estén listos.',
		ctaTitle: '¿Tienes una pregunta o un escenario?',
		ctaText: 'Describe tu caso: una mascota, un estudio, una ubicación asociada, un criomódulo o participación comunitaria.',
		ctaButton: 'Enviar solicitud'
	}
};

export const pageContent = {
	about: {
		ru: {
			metaTitle: 'О Gelyrix',
			metaDescription: 'Gelyrix как некоммерческое объединение людей и лабораторий для криосохранения и нейросохранения.',
			eyebrow: 'О Gelyrix',
			title: 'Некоммерческое объединение для криосохранения и нейросохранения',
			lead:
				'Gelyrix объединяет людей, лаборатории и партнерские локации, чтобы развивать инфраструктуру крионики без коммерческого тумана и завышенных обещаний.',
			image: images.team,
			sections: [
				{
					title: 'Кто мы такие',
					text: 'Gelyrix - открытое объединение людей и лабораторий, развивающих инфраструктуру криосохранения, нейросохранения и связанных технологий.',
					points: ['НКО-логика и кооперация', 'Партнерские лаборатории и хранилища', 'Публичное объяснение границ метода']
				},
				{
					title: 'Миссия и ценности',
					text: 'Мы считаем, что крионика должна развиваться как инженерная и биомедицинская дисциплина с проверяемыми протоколами.',
					points: ['Научная честность', 'Прозрачность процессов', 'Уважение к личности и памяти', 'Кооперация с сообществами и DAO']
				},
				{
					title: 'История проекта',
					text: 'Проект проходит путь от экспериментальной инициативы к сети стандартизированных локаций и модульной инфраструктуре.',
					points: ['Старт инициативы и первые протоколы', 'Запуск базовой инфраструктуры', 'Переход к партнерствам и региональным точкам']
				},
				{
					title: 'Связанные инициативы',
					text: 'Gelyrix связывает лабораторное криосохранение с цифровым контекстом личности и общественным финансированием исследований.',
					points: ['Лаборатория криоконсервации', 'Aicoda - цифровое сознание и бэкап контекста', 'DAO и крипто-сообщества']
				},
				{
					title: 'Команда и участие',
					text: 'В проекте есть место для специалистов, волонтеров, партнеров, доноров и региональных операторов.',
					points: ['Биология и медицина', 'Инженерия и мониторинг', 'Операции, право, контент и коммуникации']
				},
				{
					title: 'Прозрачность и этика',
					text: 'Мы фиксируем ответственность перед участниками, клиентами и будущими исследователями через отчеты, протоколы и понятные ограничения.',
					points: ['Отчетность перед участниками', 'Документирование согласия', 'Этичное обращение с биоматериалами']
				}
			] satisfies TextCard[]
		},
		en: {
			metaTitle: 'About Gelyrix',
			metaDescription: 'Gelyrix as a non-profit network of people and labs for cryopreservation and neurosafekeeping.',
			eyebrow: 'About Gelyrix',
			title: 'A non-profit network for cryopreservation and neurosafekeeping',
			lead:
				'Gelyrix brings together people, labs, and partner locations to build cryonics infrastructure without commercial fog or inflated promises.',
			image: images.team,
			sections: [
				{
					title: 'Who we are',
					text: 'Gelyrix is an open network of people and labs developing cryopreservation, neurosafekeeping, and connected technologies.',
					points: ['Non-profit and cooperative logic', 'Partner labs and storage sites', 'Public explanation of method limits']
				},
				{
					title: 'Mission and values',
					text: 'We believe cryonics should develop as an engineering and biomedical discipline with auditable protocols.',
					points: ['Scientific honesty', 'Transparent processes', 'Respect for identity and memory', 'Cooperation with communities and DAOs']
				},
				{
					title: 'Project timeline',
					text: 'The project is moving from an experimental initiative toward standardized locations and modular infrastructure.',
					points: ['Initiative launch and first protocols', 'Initial storage infrastructure', 'Partner and regional expansion']
				},
				{
					title: 'Connected initiatives',
					text: 'Gelyrix connects laboratory preservation with digital identity context and community-funded research.',
					points: ['Cryoconservation lab', 'Aicoda digital consciousness and context backup', 'DAO and crypto communities']
				},
				{
					title: 'Team and participation',
					text: 'The project is open to experts, volunteers, partners, donors, and regional operators.',
					points: ['Biology and medicine', 'Engineering and monitoring', 'Operations, law, content, and communications']
				},
				{
					title: 'Transparency and ethics',
					text: 'We document responsibility to participants, clients, and future researchers through reports, protocols, and clear limits.',
					points: ['Participant reporting', 'Consent documentation', 'Ethical handling of biomaterials']
				}
			] satisfies TextCard[]
		},
		es: {
			metaTitle: 'Sobre Gelyrix',
			metaDescription: 'Gelyrix como red sin ánimo de lucro de personas y laboratorios para criopreservación y neurosalvaguarda.',
			eyebrow: 'Sobre Gelyrix',
			title: 'Una red sin ánimo de lucro para criopreservación y neurosalvaguarda',
			lead:
				'Gelyrix reúne a personas, laboratorios y ubicaciones asociadas para construir infraestructura criónica sin niebla comercial ni promesas infladas.',
			image: images.team,
			sections: [
				{
					title: 'Quiénes somos',
					text: 'Gelyrix es una red abierta de personas y laboratorios que desarrollan criopreservación, neurosalvaguarda y tecnologías conectadas.',
					points: ['Lógica cooperativa y sin ánimo de lucro', 'Laboratorios y sitios de almacenamiento asociados', 'Explicación pública de los límites del método']
				},
				{
					title: 'Misión y valores',
					text: 'Creemos que la criónica debe desarrollarse como una disciplina biomédica y de ingeniería con protocolos auditables.',
					points: ['Honestidad científica', 'Procesos transparentes', 'Respeto por la identidad y la memoria', 'Cooperación con comunidades y DAOs']
				},
				{
					title: 'Cronología del proyecto',
					text: 'El proyecto avanza desde una iniciativa experimental hacia ubicaciones estandarizadas e infraestructura modular.',
					points: ['Inicio de la iniciativa y primeros protocolos', 'Infraestructura inicial de almacenamiento', 'Expansión regional y con socios']
				},
				{
					title: 'Iniciativas conectadas',
					text: 'Gelyrix conecta la preservación de laboratorio con el contexto digital de la identidad y la investigación financiada por la comunidad.',
					points: ['Laboratorio de crioconservación', 'Aicoda, conciencia digital y respaldo de contexto', 'DAOs y comunidades cripto']
				},
				{
					title: 'Equipo y participación',
					text: 'El proyecto está abierto a expertos, voluntarios, socios, donantes y operadores regionales.',
					points: ['Biología y medicina', 'Ingeniería y monitoreo', 'Operaciones, derecho, contenido y comunicación']
				},
				{
					title: 'Transparencia y ética',
					text: 'Documentamos la responsabilidad ante participantes, clientes e investigadores futuros mediante informes, protocolos y límites claros.',
					points: ['Informes para participantes', 'Documentación del consentimiento', 'Tratamiento ético de biomateriales']
				}
			] satisfies TextCard[]
		}
	},
	how: {
		ru: {
			metaTitle: 'Как работает крионика в Gelyrix',
			metaDescription: 'Простое объяснение крионики, витрификации, нейросохранения, сети хранилищ и пути клиента Gelyrix.',
			eyebrow: 'Как это работает',
			title: 'Крионика простыми словами и по шагам',
			lead:
				'Криосохранение - это попытка максимально бережно сохранить структуру биоматериала при низких температурах, чтобы будущая наука получила шанс работать с этой структурой.',
			image: images.dewar,
			sections: [
				{
					title: 'Биология и физика процесса',
					text: 'Ключевая задача - снизить повреждения от холода и кристаллов льда.',
					points: ['Контролируемое охлаждение', 'Криопротекторы', 'Витрификация вместо обычного замораживания']
				},
				{
					title: 'Наши направления',
					text: 'Gelyrix разделяет практические и исследовательские направления, потому что у каждого разный риск и правовой статус.',
					points: ['Криоконсервация животных', 'Сохранение органов и тканей', 'Нейросохранение мозга и ликворная перфузия', 'Подготовка к будущей реанимации']
				},
				{
					title: 'Сеть хранилищ Gelyrix',
					text: 'Партнерская сеть нужна, чтобы сделать доступное криосохранение ближе к месту события и снизить время логистики.',
					points: ['Россия, Грузия, Черногория и другие локации как первый контур', 'Локальные операторы и региональные координаторы', 'Единые протоколы, криомодули и мониторинг']
				},
				{
					title: 'Путь клиента',
					text: 'Сценарий заранее разбирается с координатором, чтобы не принимать критические решения в момент стресса.',
					points: ['Консультация', 'Договор и согласия', 'Подготовка и криопротокол', 'Хранение и мониторинг']
				},
				{
					title: 'Что уже доказано, а что нет',
					text: 'Сегодня можно сохранять структуру и проводить эксперименты на обратимость отдельных тканей и органов. Гарантировать оживление человека или восстановление личности сегодня нельзя.',
					points: ['Доказуемое: структура, параметры протокола, лабораторные проверки', 'Гипотеза: полноценная реанимация организма', 'Обязательное правило: честное разделение фактов и ожиданий']
				}
			] satisfies TextCard[]
		},
		en: {
			metaTitle: 'How cryonics works at Gelyrix',
			metaDescription: 'Plain-language explanation of cryonics, vitrification, neurosafekeeping, storage networks, and the Gelyrix client journey.',
			eyebrow: 'How it works',
			title: 'Cryonics in plain language and clear steps',
			lead:
				'Cryopreservation is an attempt to preserve biological structure at low temperatures as carefully as possible, so future science has a chance to work with it.',
			image: images.dewar,
			sections: [
				{
					title: 'Biology and physics',
					text: 'The core goal is to reduce damage caused by cold and ice crystals.',
					points: ['Controlled cooling', 'Cryoprotectants', 'Vitrification instead of ordinary freezing']
				},
				{
					title: 'Our directions',
					text: 'Gelyrix separates practical and research tracks because each has a different risk and legal status.',
					points: ['Animal cryoconservation', 'Organ and tissue preservation', 'Brain preservation and CSF perfusion', 'Preparation for future restoration']
				},
				{
					title: 'Gelyrix storage network',
					text: 'The partner network makes preservation more accessible near the event location and reduces logistics time.',
					points: ['Russia, Georgia, Montenegro, and other locations as the first contour', 'Local operators and regional coordinators', 'Unified protocols, cryomodules, and monitoring']
				},
				{
					title: 'Client journey',
					text: 'The scenario is discussed with a coordinator in advance so critical decisions are not made under stress.',
					points: ['Consultation', 'Contract and consent', 'Preparation and cryoprotocol', 'Storage and monitoring']
				},
				{
					title: 'What is proven and what is not',
					text: 'Today, structure can be preserved and reversibility experiments can be run on selected tissues and organs. Full human revival or identity restoration cannot be guaranteed today.',
					points: ['Provable: structure, protocol parameters, lab checks', 'Hypothesis: full organism revival', 'Required rule: separate facts from expectations']
				}
			] satisfies TextCard[]
		},
		es: {
			metaTitle: 'Cómo funciona la criónica en Gelyrix',
			metaDescription: 'Explicación clara de criónica, vitrificación, neurosalvaguarda, redes de almacenamiento y recorrido del cliente en Gelyrix.',
			eyebrow: 'Cómo funciona',
			title: 'Criónica en lenguaje claro y por pasos',
			lead:
				'La criopreservación es un intento de preservar la estructura biológica a bajas temperaturas con el mayor cuidado posible, para que la ciencia futura tenga una oportunidad de trabajar con ella.',
			image: images.dewar,
			sections: [
				{
					title: 'Biología y física',
					text: 'El objetivo central es reducir el daño causado por el frío y los cristales de hielo.',
					points: ['Enfriamiento controlado', 'Crioprotectores', 'Vitrificación en lugar de congelación ordinaria']
				},
				{
					title: 'Nuestras líneas',
					text: 'Gelyrix separa líneas prácticas y de investigación porque cada una tiene riesgos y estatus legal distintos.',
					points: ['Crioconservación animal', 'Preservación de órganos y tejidos', 'Preservación cerebral y perfusión de LCR', 'Preparación para una restauración futura']
				},
				{
					title: 'Red de almacenamiento Gelyrix',
					text: 'La red asociada hace que la preservación sea más accesible cerca del lugar del evento y reduce el tiempo logístico.',
					points: ['Rusia, Georgia, Montenegro y RPD como primer contorno', 'Operadores locales y coordinadores regionales', 'Protocolos, criomódulos y monitoreo unificados']
				},
				{
					title: 'Recorrido del cliente',
					text: 'El escenario se revisa con un coordinador de antemano para no tomar decisiones críticas bajo estrés.',
					points: ['Consulta', 'Contrato y consentimiento', 'Preparación y crioprotocolo', 'Almacenamiento y monitoreo']
				},
				{
					title: 'Qué está probado y qué no',
					text: 'Hoy se puede preservar estructura y realizar experimentos de reversibilidad en tejidos y órganos seleccionados. No se puede garantizar hoy una reanimación humana completa ni la restauración de la identidad.',
					points: ['Comprobable: estructura, parámetros del protocolo y controles de laboratorio', 'Hipótesis: reanimación completa del organismo', 'Regla obligatoria: separar hechos de expectativas']
				}
			] satisfies TextCard[]
		}
	}
};

export const servicesContent = {
	ru: {
		metaTitle: 'Услуги и направления Gelyrix',
		metaDescription: 'Криосохранение питомцев, органы и ткани, нейросохранение, сеть хранилищ, криомодули и партнерские программы.',
		eyebrow: 'Услуги и направления',
		title: 'Практические сценарии и исследовательские программы',
		lead: 'Каждое направление описано с ограничениями, юридическим статусом и понятным следующим шагом.',
		image: images.pet,
		items: [
			{
				kicker: 'Питомцы',
				title: 'Криоконсервация животных',
				text: 'Экспериментальный сценарий для владельцев животных: консультация, подготовка, протокол, хранение и регулярная связь.',
				points: ['Для домашних животных', 'Без гарантии будущего оживления', 'С документированием согласия владельца']
			},
			{
				kicker: 'Лаборатории',
				title: 'Органы и ткани',
				text: 'Исследовательские протоколы для групп, клиник и проектов, которым нужно проверить сохранность образцов.',
				points: ['Перфузия и витрификация', 'Маркеры повреждений', 'Отчеты по экспериментам']
			},
			{
				kicker: 'Нейро',
				title: 'Нейросохранение и BioArchive',
				text: 'Экспериментальные программы нейросохранения и BioArchive: сохранение мозга, связей и контекстных данных в связке с Aicoda.',
				points: ['Мозг и ликворная перфузия', 'BioArchive для долгосрочного хранения нейроданных', 'Цифровой бэкап контекста', 'Этический и правовой контроль']
			},
			{
				kicker: 'Сеть',
				title: 'Партнерская сеть хранилищ',
				text: 'Подключение клиник, лабораторий и предпринимателей как локальных операторов, партнерских клиник или региональных координаторов.',
				points: ['Методология и протоколы', 'Помощь в запуске', 'Карта локаций и мониторинг']
			},
			{
				kicker: 'Модули',
				title: 'Производство криомодулей',
				text: 'Модульные здания под криолаборатории и хранилища: от стартовой конфигурации до комплекса лаборатория плюс хранение.',
				points: ['Криомодуль-старт', 'Расширенные конфигурации', 'Для партнеров, лабораторий и частных заказчиков']
			},
			{
				kicker: 'Исследования',
				title: 'Партнерские программы',
				text: 'Совместные эксперименты с лабораториями, университетами, DAO и инвесторами, которые финансируют конкретные проверки.',
				points: ['План эксперимента', 'Бюджет и метрики', 'Открытый отчет по результату']
			}
		] satisfies TextCard[]
	},
	en: {
		metaTitle: 'Gelyrix services and directions',
		metaDescription: 'Pet cryopreservation, organs and tissues, neurosafekeeping, storage network, cryomodules, and partner programs.',
		eyebrow: 'Services and directions',
		title: 'Practical scenarios and research programs',
		lead: 'Each direction includes constraints, legal status, and a clear next step.',
		image: images.pet,
		items: [
			{
				kicker: 'Pets',
				title: 'Animal cryoconservation',
				text: 'An experimental scenario for pet owners: consultation, preparation, protocol, storage, and regular communication.',
				points: ['For companion animals', 'No guarantee of future revival', 'Owner consent documentation']
			},
			{
				kicker: 'Labs',
				title: 'Organs and tissues',
				text: 'Research protocols for groups, clinics, and projects that need to test sample integrity.',
				points: ['Perfusion and vitrification', 'Damage markers', 'Experiment reports']
			},
			{
				kicker: 'Neuro',
				title: 'Neurosafekeeping and BioArchive',
				text: 'Experimental neurosafekeeping and BioArchive programs for preserving the brain, neural connections, and contextual data with Aicoda.',
				points: ['Brain and CSF perfusion', 'BioArchive for long-term neural data preservation', 'Digital context backup', 'Ethical and legal control']
			},
			{
				kicker: 'Network',
				title: 'Partner storage network',
				text: 'Clinics, labs, and entrepreneurs can connect as local storage operators, partner clinics, or regional coordinators.',
				points: ['Methodology and protocols', 'Launch support', 'Location map and monitoring']
			},
			{
				kicker: 'Modules',
				title: 'Cryomodule production',
				text: 'Modular buildings for cryolabs and storage sites, from a starter module to a lab plus storage complex.',
				points: ['Cryomodule-start', 'Expanded configurations', 'For partners, labs, and private clients']
			},
			{
				kicker: 'Research',
				title: 'Partner programs',
				text: 'Joint experiments with labs, universities, DAOs, and investors funding specific tests.',
				points: ['Experiment plan', 'Budget and metrics', 'Open result report']
			}
		] satisfies TextCard[]
	},
	es: {
		metaTitle: 'Servicios y líneas de Gelyrix',
		metaDescription: 'Criopreservación de mascotas, órganos y tejidos, neurosalvaguarda, red de almacenamiento, criomódulos y programas para socios.',
		eyebrow: 'Servicios y líneas',
		title: 'Escenarios prácticos y programas de investigación',
		lead: 'Cada línea incluye restricciones, estatus legal y un siguiente paso claro.',
		image: images.pet,
		items: [
			{
				kicker: 'Mascotas',
				title: 'Crioconservación animal',
				text: 'Un escenario experimental para dueños de mascotas: consulta, preparación, protocolo, almacenamiento y comunicación regular.',
				points: ['Para animales de compañía', 'Sin garantía de reanimación futura', 'Documentación del consentimiento del dueño']
			},
			{
				kicker: 'Labs',
				title: 'Órganos y tejidos',
				text: 'Protocolos de investigación para grupos, clínicas y proyectos que necesitan comprobar la integridad de muestras.',
				points: ['Perfusión y vitrificación', 'Marcadores de daño', 'Informes de experimentos']
			},
			{
				kicker: 'Neuro',
				title: 'Neurosalvaguarda',
				text: 'Programas experimentales para preservar el cerebro, las conexiones neuronales y datos contextuales con Aicoda.',
				points: ['Cerebro y perfusión de LCR', 'Respaldo digital de contexto', 'Control ético y legal']
			},
			{
				kicker: 'Red',
				title: 'Red de almacenamiento asociada',
				text: 'Clínicas, laboratorios y emprendedores pueden conectarse como operadores locales, clínicas asociadas o coordinadores regionales.',
				points: ['Metodología y protocolos', 'Soporte de lanzamiento', 'Mapa de ubicaciones y monitoreo']
			},
			{
				kicker: 'Módulos',
				title: 'Producción de criomódulos',
				text: 'Edificios modulares para criolaboratorios y almacenamiento, desde un módulo inicial hasta un complejo de laboratorio y almacenamiento.',
				points: ['Criomódulo de inicio', 'Configuraciones ampliadas', 'Para socios, laboratorios y clientes privados']
			},
			{
				kicker: 'Investigación',
				title: 'Programas con socios',
				text: 'Experimentos conjuntos con laboratorios, universidades, DAOs e inversores que financian pruebas específicas.',
				points: ['Plan experimental', 'Presupuesto y métricas', 'Informe abierto de resultados']
			}
		] satisfies TextCard[]
	}
};

export const labContent = {
	ru: {
		metaTitle: 'Лаборатория и исследования Gelyrix',
		metaDescription: 'Новые криопротекторы, перфузия, маркеры сохранности, отчеты и дорожная карта исследований.',
		eyebrow: 'Лаборатория',
		title: 'Открытые эксперименты вместо закрытых обещаний',
		lead:
			'Исследовательская программа Gelyrix нужна, чтобы проверять качество сохранения, развивать протоколы и публиковать понятные результаты.',
		image: images.lab,
		areas: [
			'Новые криопротекторы, в том числе для ликворной среды.',
			'Протоколы перфузии для тканей, органов и нейросохранения.',
			'Маркеры структурной и функциональной сохранности.'
		],
		reporting: ['Короткие отчеты после этапов экспериментов.', 'Препринты и посты для сообщества.', 'Roadmap с планами проверок и ограничениями.'],
		join: ['Ученые и инженеры могут предложить методику или оборудование.', 'DAO и инвесторы могут финансировать конкретный эксперимент.', 'Партнерские хранилища и криомодули подключаются к общей системе мониторинга.']
	},
	en: {
		metaTitle: 'Gelyrix lab and research',
		metaDescription: 'New cryoprotectants, perfusion, integrity markers, reports, and the Gelyrix research roadmap.',
		eyebrow: 'Lab',
		title: 'Open experiments instead of closed promises',
		lead:
			'The Gelyrix research program exists to test preservation quality, improve protocols, and publish understandable results.',
		image: images.lab,
		areas: [
			'New cryoprotectants, including CSF-related media.',
			'Perfusion protocols for tissues, organs, and neurosafekeeping.',
			'Markers of structural and functional integrity.'
		],
		reporting: ['Short reports after experiment stages.', 'Preprints and community posts.', 'A roadmap with planned tests and limitations.'],
		join: ['Scientists and engineers can propose methods or equipment.', 'DAOs and investors can fund a specific experiment.', 'Partner storage sites and cryomodules connect to shared monitoring.']
	},
	es: {
		metaTitle: 'Laboratorio e investigación de Gelyrix',
		metaDescription: 'Nuevos crioprotectores, perfusión, marcadores de integridad, informes y hoja de ruta de investigación de Gelyrix.',
		eyebrow: 'Laboratorio',
		title: 'Experimentos abiertos en lugar de promesas cerradas',
		lead:
			'El programa de investigación de Gelyrix existe para comprobar la calidad de la preservación, mejorar protocolos y publicar resultados comprensibles.',
		image: images.lab,
		areas: [
			'Nuevos crioprotectores, incluidos medios relacionados con el LCR.',
			'Protocolos de perfusión para tejidos, órganos y neurosalvaguarda.',
			'Marcadores de integridad estructural y funcional.'
		],
		reporting: ['Informes breves después de etapas experimentales.', 'Preprints y publicaciones para la comunidad.', 'Hoja de ruta con pruebas planificadas y limitaciones.'],
		join: ['Científicos e ingenieros pueden proponer métodos o equipos.', 'DAOs e inversores pueden financiar un experimento concreto.', 'Los sitios asociados y criomódulos se conectan al monitoreo compartido.']
	}
};

export const transparencyContent = {
	ru: {
		metaTitle: 'Прозрачность и безопасность Gelyrix',
		metaDescription: 'Отчетность, мониторинг дьюаров, этика биоматериалов, документы и правовые ограничения крионики.',
		eyebrow: 'Прозрачность',
		title: 'Безопасность, мониторинг и честные ограничения',
		lead:
			'Крионика требует доверия, но доверие должно строиться на проверяемых данных, документах и понятной этике.',
		image: images.infrastructure,
		principles: ['Открытая отчетность по инфраструктуре и исследованиям.', 'Приоритизация безопасности биоматериалов.', 'Этичное обращение с телом, тканями, памятью и волей клиента.'],
		monitoring: ['Контроль состояния дьюаров, образцов и критических параметров.', 'Планируемые дашборды и периодические отчеты.', 'Единые стандарты для партнерских хранилищ и криомодулей.'],
		legal: ['Статус услуги зависит от юрисдикции и типа биоматериала.', 'Документы и согласия оформляются до процедуры, когда это возможно.', 'Крионика и нейросохранение остаются экспериментальными методами без гарантии восстановления.']
	},
	en: {
		metaTitle: 'Gelyrix transparency and safety',
		metaDescription: 'Reporting, dewar monitoring, biomaterial ethics, documents, and legal limits of cryonics.',
		eyebrow: 'Transparency',
		title: 'Safety, monitoring, and honest limits',
		lead:
			'Cryonics requires trust, but trust should be built on auditable data, documents, and clear ethics.',
		image: images.infrastructure,
		principles: ['Open reporting on infrastructure and research.', 'Safety-first handling of biomaterials.', 'Ethical handling of body, tissue, memory, and client will.'],
		monitoring: ['Tracking dewars, samples, and critical parameters.', 'Planned dashboards and periodic reports.', 'Unified standards for partner storage sites and cryomodules.'],
		legal: ['Service status depends on jurisdiction and biomaterial type.', 'Documents and consent are prepared before the procedure whenever possible.', 'Cryonics and neurosafekeeping remain experimental methods with no restoration guarantee.']
	},
	es: {
		metaTitle: 'Transparencia y seguridad de Gelyrix',
		metaDescription: 'Informes, monitoreo de dewars, ética de biomateriales, documentos y límites legales de la criónica.',
		eyebrow: 'Transparencia',
		title: 'Seguridad, monitoreo y límites honestos',
		lead:
			'La criónica requiere confianza, pero la confianza debe construirse sobre datos auditables, documentos y una ética clara.',
		image: images.infrastructure,
		principles: ['Informes abiertos sobre infraestructura e investigación.', 'Manejo de biomateriales con prioridad en seguridad.', 'Tratamiento ético del cuerpo, tejidos, memoria y voluntad del cliente.'],
		monitoring: ['Seguimiento de dewars, muestras y parámetros críticos.', 'Dashboards planificados e informes periódicos.', 'Estándares unificados para sitios asociados y criomódulos.'],
		legal: ['El estatus del servicio depende de la jurisdicción y del tipo de biomaterial.', 'Los documentos y consentimientos se preparan antes del procedimiento siempre que sea posible.', 'La criónica y la neurosalvaguarda siguen siendo métodos experimentales sin garantía de restauración.']
	}
};

export const investorsContent = {
	ru: {
		metaTitle: 'Инвесторам и сообществу Gelyrix',
		metaDescription: 'Пожертвования, гранты, DAO, открытые метрики и финансирование исследований, криомодулей и сети хранилищ.',
		eyebrow: 'Инвесторам и сообществу',
		title: 'Финансирование конкретной инфраструктуры и экспериментов',
		lead:
			'Поддержка Gelyrix должна быть привязана к понятным задачам: исследование, криомодуль, региональная локация или публичный материал.',
		image: images.funding,
		formats: ['Пожертвования и гранты.', 'Участие через DAO или токены, если формат согласован юридически.', 'Финансирование конкретных экспериментов с метриками результата.'],
		principles: ['Прозрачность бюджета и целей.', 'Открытые метрики и регулярные отчеты.', 'Этические обязательства перед клиентами, участниками и будущими исследователями.'],
		focus: ['Поддержка лабораторных исследований.', 'Запуск новых криомодулей.', 'Расширение сети хранилищ и обучение локальных операторов.']
	},
	en: {
		metaTitle: 'Gelyrix investors and community',
		metaDescription: 'Donations, grants, DAO, open metrics, and funding for research, cryomodules, and storage network expansion.',
		eyebrow: 'Investors and community',
		title: 'Funding concrete infrastructure and experiments',
		lead:
			'Support for Gelyrix should map to clear tasks: a study, a cryomodule, a regional location, or a public education material.',
		image: images.funding,
		formats: ['Donations and grants.', 'DAO or token participation where legally structured.', 'Funding specific experiments with result metrics.'],
		principles: ['Transparent budget and goals.', 'Open metrics and regular reports.', 'Ethical obligations to clients, participants, and future researchers.'],
		focus: ['Laboratory research support.', 'Launch of new cryomodules.', 'Storage network expansion and local operator training.']
	},
	es: {
		metaTitle: 'Inversores y comunidad de Gelyrix',
		metaDescription: 'Donaciones, subvenciones, DAO, métricas abiertas y financiación para investigación, criomódulos y expansión de la red.',
		eyebrow: 'Inversores y comunidad',
		title: 'Financiación de infraestructura y experimentos concretos',
		lead:
			'El apoyo a Gelyrix debe mapearse a tareas claras: un estudio, un criomódulo, una ubicación regional o material educativo público.',
		image: images.funding,
		formats: ['Donaciones y subvenciones.', 'Participación DAO o mediante tokens cuando tenga estructura legal.', 'Financiación de experimentos específicos con métricas de resultado.'],
		principles: ['Presupuesto y objetivos transparentes.', 'Métricas abiertas e informes regulares.', 'Obligaciones éticas con clientes, participantes e investigadores futuros.'],
		focus: ['Apoyo a investigación de laboratorio.', 'Lanzamiento de nuevos criomódulos.', 'Expansión de la red de almacenamiento y formación de operadores locales.']
	}
};

export const contactsContent = {
	ru: {
		metaTitle: 'Контакты Gelyrix',
		metaDescription: 'Формы для консультации, участия в исследованиях, партнерства, инвестиций и криомодулей.',
		eyebrow: 'Контакты',
		title: 'Расскажите, какой сценарий вам нужен',
		lead:
			'Мы разделяем запросы по направлениям: консультация, питомец, нейросохранение, партнерская локация, криомодуль, исследование или финансирование.',
		image: images.contact,
		email: 'rnd@gelyrix.com',
		methods: ['Юридический статус: НКО/объединение, юрисдикция уточняется в документах.'],
		consultationTitle: 'Запросить консультацию',
		communityTitle: 'Присоединиться к исследованиям / инвестировать',
		name: 'Имя',
		contact: 'Email или Telegram',
		message: 'Краткий вопрос',
		interest: 'Тип интереса',
		options: ['Ученый / инженер', 'Инвестор / DAO', 'Партнерская клиника', 'Оператор хранилища', 'Криомодуль'],
		submit: 'Отправить',
		success: 'Заявка подготовлена. Подключите Appwrite или другой обработчик формы для отправки на сервер.',
		spam: 'Оставьте это поле пустым'
	},
	en: {
		metaTitle: 'Gelyrix contacts',
		metaDescription: 'Forms for consultation, research participation, partnership, investment, and cryomodules.',
		eyebrow: 'Contacts',
		title: 'Tell us which scenario you need',
		lead:
			'We route requests by direction: consultation, pet, neurosafekeeping, partner location, cryomodule, research, or funding.',
		image: images.contact,
		email: 'rnd@gelyrix.com',
		methods: ['Legal status: non-profit association, jurisdiction clarified in documents.'],
		consultationTitle: 'Request a consultation',
		communityTitle: 'Join research / invest',
		name: 'Name',
		contact: 'Email or Telegram',
		message: 'Short question',
		interest: 'Interest type',
		options: ['Scientist / engineer', 'Investor / DAO', 'Partner clinic', 'Storage operator', 'Cryomodule'],
		submit: 'Submit',
		success: 'Request prepared. Connect Appwrite or another form handler to send it to the server.',
		spam: 'Leave this field empty'
	},
	es: {
		metaTitle: 'Contactos de Gelyrix',
		metaDescription: 'Formularios para consulta, participación en investigación, asociaciones, inversión y criomódulos.',
		eyebrow: 'Contactos',
		title: 'Cuéntanos qué escenario necesitas',
		lead:
			'Dirigimos las solicitudes por línea: consulta, mascota, neurosalvaguarda, ubicación asociada, criomódulo, investigación o financiación.',
		image: images.contact,
		email: 'rnd@gelyrix.com',
		methods: ['Estatus legal: asociación sin ánimo de lucro; la jurisdicción se aclara en los documentos.'],
		consultationTitle: 'Solicitar una consulta',
		communityTitle: 'Unirse a la investigación / invertir',
		name: 'Nombre',
		contact: 'Email o Telegram',
		message: 'Pregunta breve',
		interest: 'Tipo de interés',
		options: ['Científico / ingeniero', 'Inversor / DAO', 'Clínica asociada', 'Operador de almacenamiento', 'Criomódulo'],
		submit: 'Enviar',
		success: 'Solicitud preparada. Conecta Appwrite u otro manejador de formularios para enviarla al servidor.',
		spam: 'Deja este campo vacío'
	}
};

export const legalContent = {
	ru: {
		metaTitle: 'Правовая информация и дисклеймер',
		metaDescription: 'Экспериментальный статус крионики и нейросохранения, отсутствие гарантии восстановления и ограничения законодательства.',
		eyebrow: 'Правовая информация',
		title: 'Экспериментальный статус и ограничения',
		lead:
			'Эта страница фиксирует базовые юридические и этические заметки. Конкретные условия зависят от юрисдикции, типа услуги и документов клиента.',
		image: images.infrastructure,
		items: [
			'Крионика и нейросохранение являются экспериментальными методами.',
			'Gelyrix не гарантирует восстановление личности, организма или функций в будущем.',
			'Доступность услуг зависит от законодательства конкретной страны и региона.',
			'Процедуры требуют документов, согласий и проверки правового статуса.',
			'Материалы сайта не являются медицинской, юридической или инвестиционной консультацией.'
		]
	},
	en: {
		metaTitle: 'Legal information and disclaimer',
		metaDescription: 'Experimental status of cryonics and neurosafekeeping, no restoration guarantee, and legal constraints.',
		eyebrow: 'Legal information',
		title: 'Experimental status and limits',
		lead:
			'This page documents basic legal and ethical notes. Specific terms depend on jurisdiction, service type, and client documents.',
		image: images.infrastructure,
		items: [
			'Cryonics and neurosafekeeping are experimental methods.',
			'Gelyrix does not guarantee future restoration of identity, organism, or function.',
			'Service availability depends on country and regional law.',
			'Procedures require documents, consent, and legal status checks.',
			'Website materials are not medical, legal, or investment advice.'
		]
	},
	es: {
		metaTitle: 'Información legal y descargo de responsabilidad',
		metaDescription: 'Estado experimental de la criónica y la neurosalvaguarda, sin garantía de restauración y con límites legales.',
		eyebrow: 'Información legal',
		title: 'Estatus experimental y límites',
		lead:
			'Esta página documenta notas legales y éticas básicas. Los términos específicos dependen de la jurisdicción, el tipo de servicio y los documentos del cliente.',
		image: images.infrastructure,
		items: [
			'La criónica y la neurosalvaguarda son métodos experimentales.',
			'Gelyrix no garantiza la restauración futura de identidad, organismo o función.',
			'La disponibilidad del servicio depende de la ley del país y la región.',
			'Los procedimientos requieren documentos, consentimiento y verificación del estatus legal.',
			'Los materiales del sitio no son asesoría médica, legal ni de inversión.'
		]
	}
};

export const faqContent = {
	ru: {
		metaTitle: 'FAQ по крионике Gelyrix',
		metaDescription: 'Ответы на вопросы о безопасности, законности, оживлении, питомцах, сети хранилищ и криомодулях.',
		eyebrow: 'FAQ',
		title: 'Частые вопросы',
		lead: 'Короткие ответы на вопросы, которые чаще всего возникают до консультации.',
		image: images.dewar,
		items: [
			{ q: 'Опасно ли?', a: 'Опасность зависит от сценария. Мы описываем риски, соблюдаем протоколы безопасности и не скрываем экспериментальный статус.' },
			{ q: 'Легально ли?', a: 'Статус зависит от юрисдикции и типа биоматериала. Перед процедурой нужны документы и проверка применимых правил.' },
			{ q: 'Реально ли оживление?', a: 'Сегодня нельзя гарантировать оживление человека или восстановление личности. Цель текущего этапа - сохранить структуру и развивать обратимость.' },
			{ q: 'Зачем сохранять животных?', a: 'Питомцы дают владельцам личный мотив и позволяют развивать протоколы с меньшей юридической сложностью, чем человеческая крионика.' },
			{ q: 'Как работает сеть хранилищ?', a: 'Локальные партнеры работают по стандартам Gelyrix: протоколы, запуск, мониторинг, отчетность и координация.' },
			{ q: 'Чем криомодуль отличается от обычного здания?', a: 'Криомодуль проектируется под хранение, безопасность, инженерные системы, мониторинг и масштабирование лаборатории.' }
		]
	},
	en: {
		metaTitle: 'Gelyrix cryonics FAQ',
		metaDescription: 'Answers about safety, legality, revival, pets, storage network, and cryomodules.',
		eyebrow: 'FAQ',
		title: 'Frequently asked questions',
		lead: 'Short answers to questions that usually come before a consultation.',
		image: images.dewar,
		items: [
			{ q: 'Is it dangerous?', a: 'Risk depends on the scenario. We document risks, follow safety protocols, and disclose the experimental status.' },
			{ q: 'Is it legal?', a: 'Status depends on jurisdiction and biomaterial type. Documents and applicable rules must be checked before a procedure.' },
			{ q: 'Is revival realistic?', a: 'Human revival or identity restoration cannot be guaranteed today. The current goal is preserving structure and improving reversibility.' },
			{ q: 'Why preserve animals?', a: 'Pets give owners a personal reason and help develop protocols with fewer legal complications than human cryonics.' },
			{ q: 'How does the storage network work?', a: 'Local partners follow Gelyrix standards: protocols, launch support, monitoring, reporting, and coordination.' },
			{ q: 'How is a cryomodule different from a regular building?', a: 'A cryomodule is designed around storage, safety, engineering systems, monitoring, and lab scalability.' }
		]
	},
	es: {
		metaTitle: 'FAQ de criónica Gelyrix',
		metaDescription: 'Respuestas sobre seguridad, legalidad, reanimación, mascotas, red de almacenamiento y criomódulos.',
		eyebrow: 'FAQ',
		title: 'Preguntas frecuentes',
		lead: 'Respuestas breves a preguntas que suelen aparecer antes de una consulta.',
		image: images.dewar,
		items: [
			{ q: '¿Es peligroso?', a: 'El riesgo depende del escenario. Documentamos riesgos, seguimos protocolos de seguridad y comunicamos el estatus experimental.' },
			{ q: '¿Es legal?', a: 'El estatus depende de la jurisdicción y del tipo de biomaterial. Hay que revisar documentos y reglas aplicables antes del procedimiento.' },
			{ q: '¿Es realista la reanimación?', a: 'Hoy no se puede garantizar la reanimación humana ni la restauración de la identidad. El objetivo actual es preservar estructura y mejorar reversibilidad.' },
			{ q: '¿Por qué preservar animales?', a: 'Las mascotas dan a sus dueños un motivo personal y ayudan a desarrollar protocolos con menos complejidad legal que la criónica humana.' },
			{ q: '¿Cómo funciona la red de almacenamiento?', a: 'Los socios locales siguen estándares Gelyrix: protocolos, soporte de lanzamiento, monitoreo, informes y coordinación.' },
			{ q: '¿En qué se diferencia un criomódulo de un edificio normal?', a: 'Un criomódulo se diseña alrededor de almacenamiento, seguridad, sistemas de ingeniería, monitoreo y escalabilidad del laboratorio.' }
		]
	}
};

export const blogContent = {
	ru: {
		metaTitle: 'Знаниевый центр Gelyrix',
		metaDescription: 'Статьи о крионике, мифах и фактах, исследованиях, будущем, этике и инфраструктуре хранилищ.',
		eyebrow: 'Знаниевый центр',
		title: 'Крионика без мифов и рекламного тумана',
		lead:
			'Стартовая редакционная сетка для популяризации: базовые объяснения, научные ограничения, сценарии будущего и инфраструктура.',
		image: images.research,
		categories: ['Крионика 101', 'Мифы и факты', 'Наука и исследования', 'Будущее и сценарии', 'Практика и этика', 'Инфраструктура крионики']
	},
	en: {
		metaTitle: 'Gelyrix knowledge center',
		metaDescription: 'Articles about cryonics, myths and facts, research, future scenarios, ethics, and storage infrastructure.',
		eyebrow: 'Knowledge center',
		title: 'Cryonics without myths or marketing fog',
		lead:
			'The launch editorial grid: fundamentals, scientific limits, future scenarios, ethics, and infrastructure.',
		image: images.research,
		categories: ['Cryonics 101', 'Myths and facts', 'Science and research', 'Future scenarios', 'Practice and ethics', 'Cryonics infrastructure']
	},
	es: {
		metaTitle: 'Centro de conocimiento Gelyrix',
		metaDescription: 'Artículos sobre criónica, mitos y hechos, investigación, escenarios futuros, ética e infraestructura de almacenamiento.',
		eyebrow: 'Centro de conocimiento',
		title: 'Criónica sin mitos ni niebla de marketing',
		lead:
			'La parrilla editorial inicial: fundamentos, límites científicos, escenarios futuros, ética e infraestructura.',
		image: images.research,
		categories: ['Criónica 101', 'Mitos y hechos', 'Ciencia e investigación', 'Escenarios futuros', 'Práctica y ética', 'Infraestructura criónica']
	}
};

export const articles = {
	ru: [
		{
			slug: 'what-is-cryonics',
			category: 'Крионика 101',
			title: 'Что такое крионика на самом деле, без мифов и страшилок',
			description: 'Крионика как инженерная попытка сохранить структуру, а не обещание немедленного бессмертия.',
			readTime: '6 минут',
			body: [
				'Крионика начинается с простой идеи: если структура мозга, тканей или органа сохранена достаточно хорошо, будущая медицина может получить больше вариантов, чем у нас есть сегодня.',
				'Это не магия и не религия. Это набор биомедицинских и инженерных задач: быстрое охлаждение, криопротекторы, логистика, хранение и проверка повреждений.',
				'Главная честная граница: сегодня нельзя обещать оживление человека. Можно работать над сохранением структуры и над экспериментами, которые показывают, насколько отдельные системы остаются обратимыми.'
			]
		},
		{
			slug: 'vitrification-facts',
			category: 'Мифы и факты',
			title: 'Витрификация: почему это не просто заморозка',
			description: 'Чем витрификация отличается от обычного образования льда и почему это важно для тканей.',
			readTime: '5 минут',
			body: [
				'Обычная заморозка разрушает ткани кристаллами льда. Витрификация пытается перевести воду и раствор в стеклоподобное состояние без крупных кристаллов.',
				'Для этого нужны криопротекторы, контролируемое охлаждение и проверка токсичности. На практике это компромисс между снижением ледяных повреждений и химической нагрузкой.',
				'Поэтому Gelyrix говорит не только о хранении, но и о проверках: микроскопия, маркеры повреждений и тесты функциональной обратимости там, где это возможно.'
			]
		},
		{
			slug: 'functional-reversibility',
			category: 'Наука и исследования',
			title: 'Что такое функциональная обратимость и почему она важна',
			description: 'Почему крионике нужны эксперименты, которые показывают не только форму, но и работу тканей.',
			readTime: '7 минут',
			body: [
				'Сохранить внешний вид недостаточно. Для научной программы важен вопрос: может ли ткань или орган после протокола сохранять функции, которые можно измерить?',
				'Функциональная обратимость может проверяться на разных уровнях: клетки, ткани, сосудистые реакции, электрическая активность, метаболические маркеры.',
				'Именно поэтому открытые протоколы важны. Они позволяют сообществу видеть, какие проверки проведены, что получилось и где метод пока не работает.'
			]
		},
		{
			slug: 'neurosafekeeping',
			category: 'Будущее и сценарии',
			title: 'Нейросохранение: зачем сохранять мозг и его связи',
			description: 'Связь крионики, памяти, структуры мозга и цифрового бэкапа контекста.',
			readTime: '6 минут',
			body: [
				'Если личность связана с устойчивыми структурами мозга, то сохранение мозга и его связей становится отдельной задачей крионики.',
				'Нейросохранение не заменяет биологическое восстановление, но может быть более сфокусированным протоколом, где приоритетом становится структура нервной ткани.',
				'Связка с цифровым бэкапом контекста нужна не для обещаний загрузки сознания сегодня, а для сохранения дополнительных данных о человеке, привычках, голосе, текстах и связях.'
			]
		},
		{
			slug: 'storage-network',
			category: 'Инфраструктура крионики',
			title: 'Зачем нужны криохранилища в разных странах',
			description: 'Как локальные точки, протоколы и криомодули снижают логистические риски.',
			readTime: '5 минут',
			body: [
				'В крионике время и логистика имеют значение. Чем ближе подготовленная локация, тем проще организовать охлаждение, документы, транспорт и дальнейшее хранение.',
				'Сеть Gelyrix проектируется как набор локальных точек с общими протоколами, мониторингом и понятным статусом.',
				'Криомодули позволяют быстрее запускать стандартизированную инфраструктуру там, где нет готового здания под лабораторию и хранение.'
			]
		}
	] satisfies Article[],
	en: [
		{
			slug: 'what-is-cryonics',
			category: 'Cryonics 101',
			title: 'What cryonics really is, without myths',
			description: 'Cryonics as an engineering attempt to preserve structure, not a promise of instant immortality.',
			readTime: '6 min',
			body: [
				'Cryonics starts with a simple idea: if the structure of a brain, tissue, or organ is preserved well enough, future medicine may have more options than we have today.',
				'It is not magic or religion. It is a set of biomedical and engineering tasks: rapid cooling, cryoprotectants, logistics, storage, and damage assessment.',
				'The honest boundary is clear: human revival cannot be promised today. What can be pursued is structural preservation and experiments that show which systems can become reversible.'
			]
		},
		{
			slug: 'vitrification-facts',
			category: 'Myths and facts',
			title: 'Vitrification: why it is not ordinary freezing',
			description: 'How vitrification differs from ice formation and why it matters for tissue.',
			readTime: '5 min',
			body: [
				'Ordinary freezing damages tissue with ice crystals. Vitrification attempts to turn water and solution into a glass-like state without large crystals.',
				'This requires cryoprotectants, controlled cooling, and toxicity checks. In practice, it is a tradeoff between less ice damage and chemical load.',
				'That is why Gelyrix talks not only about storage, but also about checks: microscopy, damage markers, and functional reversibility tests where possible.'
			]
		},
		{
			slug: 'functional-reversibility',
			category: 'Science and research',
			title: 'What functional reversibility means and why it matters',
			description: 'Why cryonics needs experiments that show not only shape, but tissue function.',
			readTime: '7 min',
			body: [
				'Preserving appearance is not enough. A scientific program must ask whether a tissue or organ can retain measurable functions after a protocol.',
				'Functional reversibility can be tested at different levels: cells, tissues, vascular reactions, electrical activity, and metabolic markers.',
				'Open protocols matter because they let the community see which tests were run, what worked, and where the method still fails.'
			]
		},
		{
			slug: 'neurosafekeeping',
			category: 'Future scenarios',
			title: 'Neurosafekeeping: why preserve the brain and its connections',
			description: 'The link between cryonics, memory, brain structure, and digital context backup.',
			readTime: '6 min',
			body: [
				'If identity is connected to stable brain structures, preserving the brain and its connections becomes a distinct cryonics task.',
				'Neurosafekeeping does not replace biological restoration, but it can be a more focused protocol where neural tissue structure is the priority.',
				'Digital context backup is not a promise of mind uploading today. It preserves additional data about a person: habits, voice, texts, and relationships.'
			]
		},
		{
			slug: 'storage-network',
			category: 'Cryonics infrastructure',
			title: 'Why cryostorage locations are needed in different countries',
			description: 'How local hubs, protocols, and cryomodules reduce logistics risk.',
			readTime: '5 min',
			body: [
				'Time and logistics matter in cryonics. The closer the prepared location, the easier it is to organize cooling, documents, transport, and long-term storage.',
				'The Gelyrix network is designed as local hubs with shared protocols, monitoring, and a clear status model.',
				'Cryomodules make it faster to launch standardized infrastructure where no suitable lab and storage building exists.'
			]
		}
	] satisfies Article[],
	es: [
		{
			slug: 'what-is-cryonics',
			category: 'Criónica 101',
			title: 'Qué es realmente la criónica, sin mitos',
			description: 'La criónica como intento de ingeniería para preservar estructura, no como promesa de inmortalidad instantánea.',
			readTime: '6 min',
			body: [
				'La criónica empieza con una idea simple: si la estructura de un cerebro, tejido u órgano se conserva lo bastante bien, la medicina futura puede tener más opciones que las disponibles hoy.',
				'No es magia ni religión. Es un conjunto de tareas biomédicas y de ingeniería: enfriamiento rápido, crioprotectores, logística, almacenamiento y evaluación de daños.',
				'El límite honesto es claro: hoy no se puede prometer la reanimación humana. Sí se puede trabajar en preservar estructura y en experimentos que indiquen qué sistemas pueden llegar a ser reversibles.'
			]
		},
		{
			slug: 'vitrification-facts',
			category: 'Mitos y hechos',
			title: 'Vitrificación: por qué no es congelación ordinaria',
			description: 'Cómo se diferencia la vitrificación de la formación de hielo y por qué importa para los tejidos.',
			readTime: '5 min',
			body: [
				'La congelación ordinaria daña los tejidos con cristales de hielo. La vitrificación intenta convertir el agua y la solución en un estado similar al vidrio sin cristales grandes.',
				'Esto requiere crioprotectores, enfriamiento controlado y controles de toxicidad. En la práctica es un compromiso entre menos daño por hielo y carga química.',
				'Por eso Gelyrix habla no solo de almacenamiento, sino también de verificaciones: microscopía, marcadores de daño y pruebas de reversibilidad funcional cuando sea posible.'
			]
		},
		{
			slug: 'functional-reversibility',
			category: 'Ciencia e investigación',
			title: 'Qué significa reversibilidad funcional y por qué importa',
			description: 'Por qué la criónica necesita experimentos que muestren no solo forma, sino función del tejido.',
			readTime: '7 min',
			body: [
				'Preservar la apariencia no basta. Un programa científico debe preguntar si un tejido u órgano puede conservar funciones medibles después de un protocolo.',
				'La reversibilidad funcional puede probarse en distintos niveles: células, tejidos, reacciones vasculares, actividad eléctrica y marcadores metabólicos.',
				'Los protocolos abiertos importan porque permiten a la comunidad ver qué pruebas se hicieron, qué funcionó y dónde el método todavía falla.'
			]
		},
		{
			slug: 'neurosafekeeping',
			category: 'Escenarios futuros',
			title: 'Neurosalvaguarda: por qué preservar el cerebro y sus conexiones',
			description: 'El vínculo entre criónica, memoria, estructura cerebral y respaldo digital de contexto.',
			readTime: '6 min',
			body: [
				'Si la identidad está conectada a estructuras cerebrales estables, preservar el cerebro y sus conexiones se vuelve una tarea criónica propia.',
				'La neurosalvaguarda no reemplaza la restauración biológica, pero puede ser un protocolo más enfocado donde la estructura del tejido neural es la prioridad.',
				'El respaldo digital de contexto no es una promesa de subida de mente hoy. Preserva datos adicionales sobre una persona: hábitos, voz, textos y relaciones.'
			]
		},
		{
			slug: 'storage-network',
			category: 'Infraestructura criónica',
			title: 'Por qué se necesitan ubicaciones criogénicas en distintos países',
			description: 'Cómo los hubs locales, protocolos y criomódulos reducen el riesgo logístico.',
			readTime: '5 min',
			body: [
				'El tiempo y la logística importan en criónica. Cuanto más cerca esté la ubicación preparada, más fácil es organizar enfriamiento, documentos, transporte y almacenamiento a largo plazo.',
				'La red Gelyrix se diseña como hubs locales con protocolos compartidos, monitoreo y un modelo de estatus claro.',
				'Los criomódulos permiten lanzar infraestructura estandarizada con más rapidez donde no existe un edificio adecuado para laboratorio y almacenamiento.'
			]
		}
	] satisfies Article[]
};
