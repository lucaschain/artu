import { sleep } from '../../utils'

const ANIMATION_BUFFER_MS = 30

export const CustomAnimation = async (element: HTMLElement, animationName: string, durationMs: number = 200) => {
  element.style.animationName = animationName
  element.style.animationDuration = `${durationMs}ms`
  element.style.animationIterationCount = "infinite"

  await sleep(durationMs + ANIMATION_BUFFER_MS)

  element.style.animationName = ""
  element.style.animationDuration = ""
  element.style.animationIterationCount = ""
}

export const TransformRotate = (element: HTMLElement, newRotation: number, durationMs: number = 200) => {
  const currentTransform = element.style.transform
  const noRotationTransform = currentTransform.replace(/rotate\(.*?\)/g, '')
  const transform = `${noRotationTransform} rotate(${newRotation}deg)`

  element.style.transformOrigin = "center"

  return AnimateElement(element, { transform }, durationMs)
}

export const AnimateElement = async (element: HTMLElement, properties: Record<string, string>, durationMs: number = 200) => {
  element.style.transitionDuration = `${durationMs}ms`
  element.style.transitionProperty = Object.keys(properties).join(',')

  for (const prop in properties) {
    element.style.setProperty(prop, properties[prop])
  }

  return sleep(durationMs + ANIMATION_BUFFER_MS)
}
