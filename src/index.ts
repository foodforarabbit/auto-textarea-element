function onInput(e: Event): void {
  const field = e.target
  if (!(field instanceof HTMLTextAreaElement)) return
  // Reset field height
  field.style.height = 'inherit'

  // Get the computed styles for the element
  const computed = window.getComputedStyle(field)

  // Calculate the height
  const height =
    parseInt(computed.getPropertyValue('border-top-width'), 10) +
    parseInt(computed.getPropertyValue('padding-top'), 10) +
    field.scrollHeight +
    parseInt(computed.getPropertyValue('padding-bottom'), 10) +
    parseInt(computed.getPropertyValue('border-bottom-width'), 10)

  field.style.height = `${height}px`
}

class AutoTextareaElement extends HTMLElement {
  private textarea?: HTMLTextAreaElement
  cloneAttributes() {
    if (!(this.textarea instanceof HTMLTextAreaElement)) return
    const toRemove = []
    for (const attr of this.attributes) {
      this.textarea.setAttribute(attr.name, attr.value)
      toRemove.push(attr.name)
    }
    for (const attr of toRemove) {
      this.removeAttribute(attr)
    }
  }
  connectedCallback() {
    const innerHTML = this.innerHTML
    this.textarea = document.createElement('textarea')
    this.innerHTML = ''
    this.appendChild(this.textarea)
    this.cloneAttributes()
    if (!(this.textarea instanceof HTMLTextAreaElement)) return
    this.textarea.innerHTML = innerHTML
    this.textarea.addEventListener('input', onInput)
  }
  disconnectedCallback() {
    if (!(this.textarea instanceof HTMLTextAreaElement)) return
    this.textarea.removeEventListener('input', onInput)
  }
}

export default AutoTextareaElement
declare global {
  interface Window {
    AutoTextareaElement: typeof AutoTextareaElement
  }
}

if (!window.customElements.get('auto-textarea')) {
  window.AutoTextareaElement = AutoTextareaElement
  window.customElements.define('auto-textarea', AutoTextareaElement)
}
