/**
 * Utilitário seguro para operações de clipboard
 * Lida com erros de permissão do Clipboard API
 */

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Tenta usar o Clipboard API moderno
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback para navegadores mais antigos ou contextos não seguros
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        return successful
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    }
  } catch (error) {
    console.warn('Failed to copy text to clipboard:', error)
    return false
  }
}

export const readFromClipboard = async (): Promise<string | null> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText()
    }
    return null
  } catch (error) {
    console.warn('Failed to read text from clipboard:', error)
    return null
  }
}