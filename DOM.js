const productos = [
  {
    nombre: 'Detector DR Fujifilm FDR D-EVO III',
    precio: 14900,
    vendedor: 'Fujifilm',
    tipo: 'detector',
    imagen:
      'https://healthcaresolutions-us.fujifilm.com/wp-content/uploads/2023/03/D-EVO-III-Detector-Family-300x188.jpg',
    url: 'https://healthcaresolutions-us.fujifilm.com/products/diagnostic-imaging/digital-radiography/dr-detectors/fdr-d-evo-iii/',
    estrellas: 5,
    resenas: 128
  },
  {
    nombre: 'Detector DR Canon CXDI-10',
    precio: 13800,
    vendedor: 'Canon Medical',
    tipo: 'detector',
    imagen:
      'https://us.medical.canon/resources/img/products/x-ray/cxdi-digital-radiography-systems/overview-cxdi-10-series.jpg',
    url: 'https://us.medical.canon/products/x-ray/cxdi-digital-radiography-systems/',
    estrellas: 4,
    resenas: 96
  },
  {
    nombre: 'Detector Varex LUMEN 4343W',
    precio: 12600,
    vendedor: 'Varex Imaging',
    tipo: 'detector',
    imagen:
      'https://mlry13pl3zwb.i.optimole.com/w:1226/h:552/q:mauto/ig:avif/https://www.vareximaging.com/wp-content/uploads/2022/01/4343W-1.png',
    url: 'https://www.vareximaging.com/solutions/lumen-4343w/',
    estrellas: 4,
    resenas: 55
  },
  {
    nombre: 'Equipo Móvil GE Optima XR240amx',
    precio: 19750,
    vendedor: 'GE Healthcare',
    tipo: 'equipo',
    imagen:
      'https://prizmedimaging.com/cdn/shop/files/GEOptimaXR240amxPortableX-RaySystem.png?v=1746472833&width=358',
    url: 'https://prizmedimaging.com/products/ge-optima-xr240amx-portable-x-ray-system',
    estrellas: 5,
    resenas: 40
  },
  {
    nombre: 'Delantal Plomado Media Falda',
    precio: 54,
    vendedor: 'LyeXD',
    tipo: 'proteccion',
    imagen:
      'https://m.media-amazon.com/images/I/41xDrS0NeWL._SY445_SX342_QL70_FMwebp_.jpg',
    url: 'https://www.amazon.com/LyeXD-Radiology-Radiation-Protective-Laboratories/dp/B0CM66S6GL',
    estrellas: 4,
    resenas: 210
  },
  {
    nombre: 'Guantes Plomados 0,5 mm Pb',
    precio: 119,
    vendedor: 'Colortrieve',
    tipo: 'proteccion',
    imagen:
      'https://m.media-amazon.com/images/I/41vCQFHqEoL._SY445_SX342_QL70_FMwebp_.jpg',
    url: 'https://www.amazon.com/Colortrieve-Protection-Gloves-Regular-Burgundy/dp/B07ND335W5',
    estrellas: 4,
    resenas: 80
  },
  {
    nombre: 'Collar Tiroideo Plomado',
    precio: 48,
    vendedor: 'X-Ray Imaging',
    tipo: 'proteccion',
    imagen: 'https://m.media-amazon.com/images/I/31dzx2nimhL._SS64_.jpg',
    url: 'https://www.amazon.com/Thyroid-Collar-X-Ray-Imaging-Shield/dp/B076BFZ4R7',
    estrellas: 4,
    resenas: 65
  },
  {
    nombre: 'Radiacode 103G',
    precio: 599,
    vendedor: 'RadiaCode',
    tipo: 'dosimetria',
    imagen:
      'https://asset-static.radiacode.com/images/yxullyqn/production/448f030833aebdb44a73404f00d1d84ef939023c-2000x2000.webp',
    url: 'https://www.radiacode.com/products/radiacode-103g',
    estrellas: 5,
    resenas: 190
  },
  {
    nombre: 'Gafas Plomadas 0,75 mm Pb',
    precio: 130,
    vendedor: 'Shield Pro',
    tipo: 'proteccion',
    imagen:
      'https://m.media-amazon.com/images/I/31ExuqJqeZL.__AC_SY300_SX300_QL70_FMwebp_.jpg',
    url: 'https://www.amazon.com/Radiation-Protective-Lightweight-Comfortable-Wrap-around/dp/B003Z9817W',
    estrellas: 4,
    resenas: 42
  },
  {
    nombre: 'Dosímetro GQ GMC-300S',
    precio: 68,
    vendedor: 'GQ',
    tipo: 'dosimetria',
    imagen: 'https://m.media-amazon.com/images/I/615ZNdooHgL._AC_UY218_.jpg',
    url: 'https://www.amazon.com/GQ-GMC-300S-Digital-Radiation-Dosimeter/dp/B00IN8TJYY',
    estrellas: 3,
    resenas: 150
  }
]

// DOM
const grid = document.getElementById('grid')
const mensajeVacio = document.getElementById('sinResultados')
const buscador = document.getElementById('search')
const rangoPrecio = document.getElementById('precio')
const etiquetaPrecio = document.getElementById('precioValor')
const checksTipo = Array.from(document.querySelectorAll('input[name="tipo"]'))

// Rango precio
function actualizarEtiquetaPrecio() {
  etiquetaPrecio.textContent = `Hasta ${rangoPrecio.value} €`
}
actualizarEtiquetaPrecio()

// Filtros
function aplicarFiltros() {
  const texto = buscador.value.trim().toLowerCase()
  const precioMax = Number(rangoPrecio.value)
  const tiposActivos = checksTipo.filter((c) => c.checked).map((c) => c.value)

  const filtrados = productos.filter((p) => {
    const porTexto =
      !texto ||
      p.nombre.toLowerCase().includes(texto) ||
      (p.vendedor?.toLowerCase() || '').includes(texto)
    const porTipo = !tiposActivos.length || tiposActivos.includes(p.tipo)
    const porPrecio = p.precio <= precioMax
    return porTexto && porTipo && porPrecio
  })

  grid.innerHTML = ''
  if (!filtrados.length) {
    mensajeVacio.hidden = false
    return
  }
  mensajeVacio.hidden = true

  filtrados.forEach((p) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <article class="panel-producto">
        <a href="${p.url}" target="_blank" rel="noopener">
          <img src="${p.imagen}" alt="${p.nombre}" />
        </a>
        <h3>${p.nombre}</h3>
        <p class="meta">Vendedor: <strong>${p.vendedor}</strong> · ${'★'.repeat(
      p.estrellas || 0
    )}${'☆'.repeat(5 - (p.estrellas || 0))} (${p.resenas || 0})</p>
        <span class="precio">${p.precio} €</span>
      </article>
    `
    grid.appendChild(li)
  })
}

// Eventos
buscador.addEventListener('input', aplicarFiltros)
rangoPrecio.addEventListener('input', () => {
  actualizarEtiquetaPrecio()
  aplicarFiltros()
})
checksTipo.forEach((chk) => chk.addEventListener('change', aplicarFiltros))

aplicarFiltros()
