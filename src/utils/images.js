export const schemaImages = import.meta.glob('../assets/images/schemas/*.png', { query: '?url', import: 'default', eager: true })
export const modeImages = import.meta.glob('../assets/images/modes/*.png', { query: '?url', import: 'default', eager: true })

export const getSchemaImage = (name) => {
  const filename = `${name.replace('/', '_')}.png`;
  const match = Object.keys(schemaImages).find(k => k.endsWith(`/${filename}`));
  return match ? schemaImages[match] : null;
}

export const getModeImage = (id) => {
  const filename = `${id}.png`;
  const match = Object.keys(modeImages).find(k => k.endsWith(`/${filename}`));
  return match ? modeImages[match] : null;
}
