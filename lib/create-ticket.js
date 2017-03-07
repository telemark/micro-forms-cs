'use strict'

module.exports = data => {
  let ticket = {
    categoryId: 62,
    title: `Bestilling av mobiltelefon ${data.bestiller}`,
    message: ''
  }

  const ekstrautstyrListe = [data.ekstrautstyr1, data.ekstrautstyr2, data.ekstrautstyr3, data.ekstrautstyr4, data.ekstrautstyr5, data.ekstrautstyr6]
  const ekstrautstyr = ekstrautstyrListe.filter(utstyr => utstyr)
  const bestilling = {
    bestiller: data.bestiller,
    fnr: data.employeeNumber,
    mobil: data.mobil,
    ekstrautstyr: ekstrautstyr.join(', '),
    begrunnelse: data.begrunnelse || 'ikke oppgitt',
    godkjent: data.godkjent || 'nei',
    leder: data.leder
  }

  const message = Object.keys(bestilling)
    .map(key => `${key}: ${bestilling[key]}`)
    .join('\n')

  ticket.message = message
  ticket.contactPerson = data.userId

  return ticket
}
