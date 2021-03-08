const frm = document.getElementById('frmpago')
frm.addEventListener('submit', e => {
  e.preventDefault()
})

function cop(money) {
  return new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP',minimumFractionDigits:3}).format(money) 
}

function calcularPago() {
  va = document.getElementById('va').value
  tasa = document.getElementById('tasa').value/100
  np = document.getElementById('np').value
  pago = (tasa*va)/(1-(1+tasa)**-np)
  document.getElementById('pago').value = cop(pago)

  let tablaPagos = document.getElementById('tabla-pagos')
  let tbl = '<hr><table border="2" width="100%">'
  tbl += '<tr align="right"><td>Período</td><td>Interés</td><td>Amortización</td><td>Saldo</td></tr>'

  let saldo = va
  for (let p=1; p<=np; p++) {
    tbl += '<tr align="right">'
    let interes = saldo*tasa
    let amortiz = pago-interes
    saldo -= amortiz
    tbl += '<td align="center">' + p + '</td>'
    tbl += '<td>' + cop(interes) + '</td>'
    tbl += '<td>' + cop(amortiz) + '</td>'
    tbl += '<td>' + cop(saldo) + '</td>'
    tbl += '</tr>'
  }
  tbl += '</table>'
  tablaPagos.innerHTML=tbl
}
