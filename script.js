// Controling slider for webkit browsers
const _R = document.querySelector('[type=range]'),
  pageViewsEl = document.getElementById('page-views'),
  priceEl = document.getElementById('price'),
  periodEl = document.getElementById('period'),
  toggleEl = document.getElementById('period-toggle')

let isDiscount = false,
  currentInputData = 50

document.documentElement.classList.add('js')

// Event listeners

_R.addEventListener(
  'input',
  (e) => {
    _R.style.setProperty('--val', +_R.value)
    currentInputData = _R.value
    calculateData(_R.value)
  },
  false
)

toggleEl.addEventListener('click', (e) => {
  e.target.classList.toggle('active')
  isDiscount = !isDiscount

  calculateData(currentInputData)
})

function calculateData(inputData) {
  const priceValue = getPriceValue(inputData)
  const totalPrice = calculateDiscount(priceValue)

  switch (priceValue) {
    case 8:
      updateView('10K', totalPrice)
      break

    case 12:
      updateView('50K', totalPrice)
      break

    case 16:
      updateView('100K', totalPrice)
      break

    case 24:
      updateView('500K', totalPrice)
      break

    case 36:
      updateView('1M', totalPrice)
      break

    default:
      break
  }
}

function getPriceValue(inputData) {
  const value = parseInt(inputData)

  if (between(value, 0, 20)) {
    return 8
  }
  if (between(value, 21, 40)) {
    return 12
  }
  if (between(value, 41, 60)) {
    return 16
  }
  if (between(value, 61, 80)) {
    return 24
  }
  if (between(value, 81, 100)) {
    return 36
  }
}

function between(value, min, max) {
  return value >= min && value <= max
}

function calculateDiscount(price) {
  if (isDiscount) {
    const discount = price * 0.25

    return price - discount
  } else {
    return price
  }
}

// Update elements on page
function updateView(pageViews, price) {
  priceEl.innerText = '$' + price + '.00'
  pageViewsEl.innerText = pageViews + ' pageviews'
}
