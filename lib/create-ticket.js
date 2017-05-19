'use strict'

module.exports = data => {
  let ticket = {
    categoryId: 62,
    title: `Bestilling av mobiltelefon ${data.bestiller}`,
    message: '',
    isOrder: true
  }

  const bestilling = {
    bestiller: data.bestiller,
    fdato: data.employeeNumber.substring(0, 6),
    mobil: data.mobil,
    mobilBruk: data.mobilBruk,
    ekstrautstyr: Array.isArray(data.ekstrautstyr) ? data.ekstrautstyr.join(', ') : data.ekstrautstyr,
    begrunnelse: data.begrunnelse || 'ikke oppgitt',
    godkjent: data.godkjent || 'nei',
    leder: data.leder,
    enhet: data.company,
    avdeling: data.department
  }

  const message = Object.keys(bestilling)
    .map(key => `${key}: ${bestilling[key]}`)
    .join('\n')

  ticket.message = message
  ticket.contactPerson = data.userId
  return ticket
}
