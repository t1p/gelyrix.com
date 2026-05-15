import { homeContent } from '$lib/content';
import { supportedLocales, type SupportedLocale } from '$lib/locales';

export type AdminLocale = SupportedLocale;

export type LocalizedFields = Record<AdminLocale, Record<string, string>>;

export type SeoEntry = {
	path: string;
	label: string;
} & Record<
	AdminLocale,
	{
		title: string;
		description: string;
		ogImage: string;
	}
>;

export type AdminBlocks = {
	announcement: {
		enabled: boolean;
	} & Record<
		AdminLocale,
		{
			title: string;
			text: string;
			buttonLabel: string;
			buttonHref: string;
		}
	>;
	homeCta: Record<
		AdminLocale,
		{
			title: string;
			text: string;
			buttonLabel: string;
			buttonHref: string;
		}
	>;
};

export type AdminContent = {
	seo: SeoEntry[];
	blocks: AdminBlocks;
	updatedAt: string;
};

export const adminRoutes = [
	{ path: '/', label: 'Главная' },
	{ path: '/about', label: 'О Gelyrix' },
	{ path: '/how-it-works', label: 'Как это работает' },
	{ path: '/services', label: 'Услуги' },
	{ path: '/lab', label: 'Лаборатория' },
	{ path: '/blog', label: 'Знания / блог' },
	{ path: '/transparency', label: 'Прозрачность' },
	{ path: '/investors', label: 'Инвесторам' },
	{ path: '/faq', label: 'FAQ' },
	{ path: '/contacts', label: 'Контакты' },
	{ path: '/legal', label: 'Правовая информация' }
];

const seoDefaults: Record<string, Record<AdminLocale, SeoEntry[AdminLocale]>> = {
	'/': {
		ru: {
			title: homeContent.ru.metaTitle,
			description: homeContent.ru.metaDescription,
			ogImage: ''
		},
		en: {
			title: homeContent.en.metaTitle,
			description: homeContent.en.metaDescription,
			ogImage: ''
		},
		es: {
			title: 'Gelyrix - criopreservación y neurosalvaguarda',
			description:
				'Gelyrix es una iniciativa sin ánimo de lucro que desarrolla infraestructura de criopreservación, neurosalvaguarda, criomódulos e investigación abierta.',
			ogImage: ''
		}
	},
	'/about': {
		ru: {
			title: 'О Gelyrix',
			description: 'Gelyrix как некоммерческое объединение людей и лабораторий для криосохранения и нейросохранения.',
			ogImage: ''
		},
		en: {
			title: 'About Gelyrix',
			description: 'Gelyrix as a non-profit network of people and labs for cryopreservation and neurosafekeeping.',
			ogImage: ''
		},
		es: {
			title: 'Sobre Gelyrix',
			description: 'Gelyrix como red sin ánimo de lucro de personas y laboratorios para criopreservación y neurosalvaguarda.',
			ogImage: ''
		}
	},
	'/how-it-works': {
		ru: {
			title: 'Как работает крионика в Gelyrix',
			description: 'Простое объяснение крионики, витрификации, нейросохранения, сети хранилищ и пути клиента Gelyrix.',
			ogImage: ''
		},
		en: {
			title: 'How cryonics works at Gelyrix',
			description: 'Plain-language explanation of cryonics, vitrification, neurosafekeeping, storage networks, and the Gelyrix client journey.',
			ogImage: ''
		},
		es: {
			title: 'Cómo funciona la criónica en Gelyrix',
			description: 'Explicación clara de criónica, vitrificación, neurosalvaguarda, redes de almacenamiento y recorrido del cliente en Gelyrix.',
			ogImage: ''
		}
	},
	'/services': {
		ru: {
			title: 'Услуги и направления Gelyrix',
			description: 'Криосохранение питомцев, органы и ткани, нейросохранение, сеть хранилищ, криомодули и партнерские программы.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix services and directions',
			description: 'Pet cryopreservation, organs and tissues, neurosafekeeping, storage network, cryomodules, and partner programs.',
			ogImage: ''
		},
		es: {
			title: 'Servicios y líneas de Gelyrix',
			description: 'Criopreservación de mascotas, órganos y tejidos, neurosalvaguarda, red de almacenamiento, criomódulos y programas para socios.',
			ogImage: ''
		}
	},
	'/lab': {
		ru: {
			title: 'Лаборатория и исследования Gelyrix',
			description: 'Новые криопротекторы, перфузия, маркеры сохранности, отчеты и дорожная карта исследований.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix lab and research',
			description: 'New cryoprotectants, perfusion, integrity markers, reports, and the Gelyrix research roadmap.',
			ogImage: ''
		},
		es: {
			title: 'Laboratorio e investigación de Gelyrix',
			description: 'Nuevos crioprotectores, perfusión, marcadores de integridad, informes y hoja de ruta de investigación de Gelyrix.',
			ogImage: ''
		}
	},
	'/blog': {
		ru: {
			title: 'Знаниевый центр Gelyrix',
			description: 'Статьи о крионике, мифах и фактах, исследованиях, будущем, этике и инфраструктуре хранилищ.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix knowledge center',
			description: 'Articles about cryonics, myths and facts, research, future scenarios, ethics, and storage infrastructure.',
			ogImage: ''
		},
		es: {
			title: 'Centro de conocimiento Gelyrix',
			description: 'Artículos sobre criónica, mitos y hechos, investigación, escenarios futuros, ética e infraestructura de almacenamiento.',
			ogImage: ''
		}
	},
	'/transparency': {
		ru: {
			title: 'Прозрачность и безопасность Gelyrix',
			description: 'Отчетность, мониторинг дьюаров, этика биоматериалов, документы и правовые ограничения крионики.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix transparency and safety',
			description: 'Reporting, dewar monitoring, biomaterial ethics, documents, and legal limits of cryonics.',
			ogImage: ''
		},
		es: {
			title: 'Transparencia y seguridad de Gelyrix',
			description: 'Informes, monitoreo de dewars, ética de biomateriales, documentos y límites legales de la criónica.',
			ogImage: ''
		}
	},
	'/investors': {
		ru: {
			title: 'Инвесторам и сообществу Gelyrix',
			description: 'Пожертвования, гранты, DAO, открытые метрики и финансирование исследований, криомодулей и сети хранилищ.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix investors and community',
			description: 'Donations, grants, DAO, open metrics, and funding for research, cryomodules, and storage network expansion.',
			ogImage: ''
		},
		es: {
			title: 'Inversores y comunidad de Gelyrix',
			description: 'Donaciones, subvenciones, DAO, métricas abiertas y financiación para investigación, criomódulos y expansión de la red.',
			ogImage: ''
		}
	},
	'/faq': {
		ru: {
			title: 'FAQ по крионике Gelyrix',
			description: 'Ответы на вопросы о безопасности, законности, оживлении, питомцах, сети хранилищ и криомодулях.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix cryonics FAQ',
			description: 'Answers about safety, legality, revival, pets, storage network, and cryomodules.',
			ogImage: ''
		},
		es: {
			title: 'FAQ de criónica Gelyrix',
			description: 'Respuestas sobre seguridad, legalidad, reanimación, mascotas, red de almacenamiento y criomódulos.',
			ogImage: ''
		}
	},
	'/contacts': {
		ru: {
			title: 'Контакты Gelyrix',
			description: 'Формы для консультации, участия в исследованиях, партнерства, инвестиций и криомодулей.',
			ogImage: ''
		},
		en: {
			title: 'Gelyrix contacts',
			description: 'Forms for consultation, research participation, partnership, investment, and cryomodules.',
			ogImage: ''
		},
		es: {
			title: 'Contactos de Gelyrix',
			description: 'Formularios para consulta, participación en investigación, asociaciones, inversión y criomódulos.',
			ogImage: ''
		}
	},
	'/legal': {
		ru: {
			title: 'Правовая информация и дисклеймер',
			description: 'Экспериментальный статус крионики и нейросохранения, отсутствие гарантии восстановления и ограничения законодательства.',
			ogImage: ''
		},
		en: {
			title: 'Legal information and disclaimer',
			description: 'Experimental status of cryonics and neurosafekeeping, no restoration guarantee, and legal constraints.',
			ogImage: ''
		},
		es: {
			title: 'Información legal y descargo de responsabilidad',
			description: 'Estado experimental de la criónica y la neurosalvaguarda, sin garantía de restauración y con límites legales.',
			ogImage: ''
		}
	}
};

export const defaultAdminContent: AdminContent = {
	seo: adminRoutes.map((route) => ({
		path: route.path,
		label: route.label,
		...seoDefaults[route.path]
	})),
	blocks: {
		announcement: {
			enabled: false,
			ru: {
				title: 'Новый отчет Gelyrix',
				text: 'Добавьте здесь короткий анонс отчета, партнерства или открытого эксперимента.',
				buttonLabel: 'Подробнее',
				buttonHref: '/blog'
			},
			en: {
				title: 'New Gelyrix report',
				text: 'Add a short announcement about a report, partnership, or open experiment.',
				buttonLabel: 'Read more',
				buttonHref: '/blog'
			},
			es: {
				title: 'Nuevo informe de Gelyrix',
				text: 'Añade un breve anuncio sobre un informe, una alianza o un experimento abierto.',
				buttonLabel: 'Leer más',
				buttonHref: '/blog'
			}
		},
		homeCta: {
			ru: {
				title: homeContent.ru.ctaTitle,
				text: homeContent.ru.ctaText,
				buttonLabel: homeContent.ru.ctaButton,
				buttonHref: '/contacts'
			},
			en: {
				title: homeContent.en.ctaTitle,
				text: homeContent.en.ctaText,
				buttonLabel: homeContent.en.ctaButton,
				buttonHref: '/contacts'
			},
			es: {
				title: '¿Tienes una pregunta o un caso?',
				text: 'Describe la situación: mascota, investigación, ubicación asociada, criomódulo o participación comunitaria.',
				buttonLabel: 'Enviar solicitud',
				buttonHref: '/contacts'
			}
		}
	},
	updatedAt: new Date(0).toISOString()
};

export { supportedLocales };

export const getSeoForPath = (content: AdminContent | undefined, path: string, locale: AdminLocale) => {
	return content?.seo.find((entry) => entry.path === path)?.[locale];
};
