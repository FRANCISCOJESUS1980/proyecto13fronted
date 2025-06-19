export const generateMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1
    const value = month.toString().padStart(2, '0')
    return { value, label: value }
  })
}

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i
    return { value: year.toString(), label: year.toString() }
  })
}

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`
}

export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '')
  return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
}

export const validateCVC = (cvc) => {
  return cvc.length >= 3 && cvc.length <= 4 && /^\d+$/.test(cvc)
}
