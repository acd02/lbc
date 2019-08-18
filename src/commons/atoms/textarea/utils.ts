export function setCloneContent(cloneElm: HTMLDivElement, value: string) {
  // we want to prevent the 'newValue' to be serialized as html
  /* eslint-disable-next-line fp/no-mutation */
  cloneElm.textContent = value + '\n'
  const hiddenCloneInnerHTML = cloneElm.innerHTML
  const newContent = hiddenCloneInnerHTML.replace(/\n/g, '<br>')
  /* eslint-disable-next-line fp/no-mutation */
  cloneElm.innerHTML = newContent
}
