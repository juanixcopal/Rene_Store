// Toast store — notificaciones globales con $state()

let toasts = $state([])
let nextId = 0

export const toastStore = {
  get list() { return toasts },

  show(message, type = 'info', duration = 3500) {
    const id = ++nextId
    toasts = [...toasts, { id, message, type }]
    setTimeout(() => this.dismiss(id), duration)
    return id
  },

  success(msg, duration) { return this.show(msg, 'success', duration) },
  error(msg, duration)   { return this.show(msg, 'error',   duration) },
  warning(msg, duration) { return this.show(msg, 'warning', duration) },

  dismiss(id) {
    toasts = toasts.filter(t => t.id !== id)
  },
}
