const STATE = {}

function init() {
  place_hero()
  $(window).resize(recompute_layout)
}

function recompute_layout() {
  STATE.CONTROLLER.destroy(true)
  place_hero()
}

function place_hero() {
  const SCREEN_HEIGHT = window.innerHeight
  const SCREEN_WIDTH = window.innerWidth

  let SCREEN_SQUARE, X_START, Y_START, SCROLL_END
  if(SCREEN_WIDTH > SCREEN_HEIGHT) {
    SCREEN_SQUARE = SCREEN_HEIGHT - 160
    X_START = SCREEN_WIDTH / 2 - SCREEN_SQUARE / 2 - 40
    Y_START = 20
    SCROLL_END = SCREEN_HEIGHT
    IS_MOBILE = false
  } else {
    SCREEN_SQUARE = 0.92 * (SCREEN_WIDTH - 20)
    X_START = 20
    Y_START = 20
    SCROLL_END = 40 + SCREEN_SQUARE
    IS_MOBILE = false
  }

  const SCALE = d3.scaleLinear()
    .domain([0, 1000])
    .range([
      0,
      SCREEN_SQUARE,
    ])
  const XSCALE = d3.scaleLinear()
    .domain([0, 1000])
    .range([
      X_START,
      X_START + SCREEN_SQUARE,
    ])
  const XRSCALE = d3.scaleLinear()
    .domain([0, 1000])
    .range([
      SCREEN_WIDTH - X_START - SCREEN_SQUARE,
      SCREEN_WIDTH - X_START,
    ])
  const YSCALE = d3.scaleLinear()
    .domain([0, 1000])
    .range([
      Y_START,
      Y_START + SCREEN_SQUARE,
    ])

  $('#main').css({
    marginTop: SCROLL_END,
  })

  const CONTROLLER = new ScrollMagic.Controller()

  create_scene(CONTROLLER, '#circle', [
    {
      scroll: 0,
      width: SCALE(720),
      top: YSCALE(50),
      left: XSCALE(150),
    },
    {
      scroll: SCROLL_END,
      top: YSCALE(50) - SCREEN_HEIGHT,
      opacity: 0,
    },
  ])
  create_scene(CONTROLLER, '#flower_a', [
    {
      scroll: 0,
      width: SCALE(415),
      height: SCALE(410),
      top: YSCALE(25),
      left: XSCALE(0),
    },
    {
      scroll: SCROLL_END,
      left: SCALE(-410),
      top: SCALE(-415),
      rotation: 90,
    },
  ])
  create_scene(CONTROLLER, '#flower_b', [
    {
      scroll: 0,
      width: SCALE(280),
      height: SCALE(230),
      top: YSCALE(0),
      right: XRSCALE(160),
    },
    {
      scroll: SCROLL_END,
      right: SCALE(-230),
      top: SCALE(-280),
      rotation: -90,
    },
  ])
  create_scene(CONTROLLER, '#flower_c', [
    {
      scroll: 0,
      width: SCALE(560),
      height: SCALE(580),
      top: YSCALE(280),
      right: XRSCALE(-50),
    },
    {
      scroll: SCROLL_END,
      right: SCALE(-580),
      top: 0,
      rotation: -90,
    },
  ])
  create_scene(CONTROLLER, '#flower_d', [
    {
      scroll: 0,
      width: SCALE(710),
      height: SCALE(480),
      top: YSCALE(570),
      right: XRSCALE(230),
    },
    {
      scroll: SCROLL_END,
      right: SCALE(-710),
      top: SCALE(560),
      rotation: -90,
    },
  ])
  create_scene(CONTROLLER, '#flower_e', [
    {
      scroll: 0,
      width: SCALE(430),
      height: SCALE(360),
      top: YSCALE(570),
      left: XSCALE(40),
    },
    {
      scroll: SCROLL_END,
      left: SCALE(-430),
      top: SCALE(570),
      rotation: 90,
    },
  ])
  create_scene(CONTROLLER, '#leaf_a', [
    {
      scroll: 0,
      width: SCALE(210),
      height: SCALE(190),
      top: YSCALE(230),
      left: XSCALE(200),
    },
    {
      scroll: SCROLL_END,
      left: SCALE(-190),
      top: SCALE(-210),
      rotation: 90,
    },
  ])
  create_scene(CONTROLLER, '#leaf_b', [
    {
      scroll: 0,
      width: SCALE(200),
      height: SCALE(190),
      top: YSCALE(420),
      right: XRSCALE(200),
    },
    {
      scroll: SCROLL_END,
      top: SCALE(100),
      right: SCALE(-210),
      rotation: -90,
    },
  ])

  $('#hero').show()

  $('.hero_name').css({
    fontSize: SCALE(100),
  })
  const ANDREA_WIDTH = $('#andrea').outerWidth()
  const PLUS_WIDTH = $('#plus').outerWidth()
  const KEVIN_WIDTH = $('#kevin').outerWidth()
  create_scene(CONTROLLER, '#andrea', [
    {
      scroll: 0,
      top: YSCALE(280),
      left: XSCALE(510) - ANDREA_WIDTH / 2,
    },
    {
      scroll: SCROLL_END,
      left: 10,
      top: 10,
      fontSize: 24,
    },
  ])
  create_scene(CONTROLLER, '#plus', [
    {
      scroll: 0,
      top: YSCALE(380),
      left: XSCALE(510) - PLUS_WIDTH / 2,
    },
    {
      scroll: SCROLL_END,
      left: 10,
      top: 34,
      fontSize: 24,
    },
  ])
  create_scene(CONTROLLER, '#kevin', [
    {
      scroll: 0,
      top: YSCALE(480),
      left: XSCALE(510) - KEVIN_WIDTH / 2,
    },
    {
      scroll: SCROLL_END,
      left: 10,
      top: 58,
      fontSize: 24,
    },
  ])

  $('#date').css({
    fontSize: SCALE(32),
  })
  const DATE_WIDTH = $('#date').outerWidth()
  create_scene(CONTROLLER, '#date', [
    {
      scroll: 0,
      top: YSCALE(236),
      left: XSCALE(510) - DATE_WIDTH / 2,
    },
    {
      scroll: SCROLL_END,
      left: 10,
      top: 86,
      fontSize: 18,
    },
  ])

  STATE.CONTROLLER = CONTROLLER
  return CONTROLLER
}

function create_scene(controller, target, steps) {
  const timeline = new TimelineMax()
  for(const i in steps) {
    const step = steps[i]
    const scroll = step.scroll
    delete step.scroll
    timeline.to(
      target,
      scroll,
      step,
    )
  }
  var scene = new ScrollMagic.Scene({
    duration: timeline.endTime(),
    offset: 0,
  }).addTo(controller)
  scene.setTween(timeline)
}

$(init)
