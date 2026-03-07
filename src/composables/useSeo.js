import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

export function useSeo() {
  const route = useRoute()

  const title = computed(() => route.meta.title || 'Who Wins? - The Ultimate Animal Showdown!')
  const description = computed(() => route.meta.description || 'Pick two animals and find out who would win in the ultimate showdown!')
  const url = computed(() => `https://whichanimalwins.com${route.path}`)

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
    script: computed(() =>
      route.name === 'auth'
        ? [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Who Wins?',
                url: 'https://whichanimalwins.com',
                description: 'Pick two animals and find out who would win in the ultimate showdown! Fun, kid-friendly animal battle simulator.',
                applicationCategory: 'GameApplication',
                operatingSystem: 'Any',
              }),
            },
          ]
        : []
    ),
  })
}
