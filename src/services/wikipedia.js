export async function fetchAnimalImage(animalName) {
  try {
    const params = new URLSearchParams({
      action: 'query',
      prop: 'pageimages',
      titles: animalName,
      format: 'json',
      pithumbsize: 400,
      origin: '*',
      redirects: 1,
    })

    const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`)
    if (!response.ok) return null

    const data = await response.json()
    const pages = data.query?.pages
    if (!pages) return null

    const page = Object.values(pages)[0]
    return page?.thumbnail?.source || null
  } catch {
    return null
  }
}
