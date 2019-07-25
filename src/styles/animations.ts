import { css, keyframes } from 'emotion'

export const animations = {
  spinAround: keyframes({
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(359deg)'
    }
  }),
  fadeIn: keyframes({
    '0%': {
      opacity: 0
    },
    '100%': {
      opacity: 1
    }
  }),
  fadeOut: keyframes({
    '0%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  }),
  slideLeft: keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateX(-50%)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0%)'
    }
  }),
  slideDown: keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateY(-50%)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)'
    }
  }),
  slideUp: keyframes({
    '0%': {
      opacity: 0,
      transform: 'translateY(0)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(-50%)'
    }
  })
}

type AnimationParams = {
  name: keyof typeof animations
  duration?: number
  delay?: number
  easing?: string
  fillMode?: 'backwards' | 'forwards' | 'both' | 'none'
}

export function makeAnimation(args: AnimationParams) {
  const { name, duration = 350, delay = 0, easing = 'linear', fillMode = 'none' } = args

  return css({
    animation: `${animations[name]} ${duration}ms ${easing}`,
    animationFillMode: fillMode,
    animationDelay: `${delay}ms`
  })
}
