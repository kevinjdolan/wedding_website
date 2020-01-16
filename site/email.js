function init() {
  $('form').submit(onSubmit)
}

function onSubmit(ev) {
  ev.preventDefault()
  const data = $('form').serialize()
  $.ajax({
    url: '/app/submit/',
    data: data,
  })
}

$(init)
