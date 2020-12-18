export const AnimateElement = async (element: HTMLElement, properties: Record<string, string>, durationMs: number = 200) => {
  element.style.transitionDuration = `${durationMs}ms`
  element.style.transitionProperty = Object.keys(properties).join(',')

  for (const prop in properties) {
    element.style.setProperty(prop, properties[prop])
  }

  return new Promise((resolve) => {
    setTimeout(() => { resolve(null) }, durationMs)
  })
}
