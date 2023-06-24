export const yearFromShortDate = (date: string): number =>
  parseInt(
    new Date(date).toLocaleDateString('nl-NL', {
      year: 'numeric'
    })
  )

export const monthFromShortDate = (date: string): string =>
  new Date(date).toLocaleDateString('nl-NL', {
    month: 'short'
  })
