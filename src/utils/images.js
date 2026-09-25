export const schemaImages = import.meta.glob('../assets/images/schemas/*.png', { as: 'url', eager: true })
export const modeImages = import.meta.glob('../assets/images/modes/*.png', { as: 'url', eager: true })

export const getSchemaImage = (name) => {
  const path = `../assets/images/schemas/${name.replace('/', '_')}.png`
  return schemaImages[path] || null
}

export const getModeImage = (id) => {
  const path = `../assets/images/modes/${id}.png`
  return modeImages[path] || null
}
