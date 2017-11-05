let mongoSVG = SVG('mongo-svg');
mongoSVG.size(200);

let expressSVG = SVG('express-svg');
expressSVG.size(200);

let nodeSVG = SVG('node-svg');
nodeSVG.size(200);

let angularSVG = SVG('angular-svg');
angularSVG.size(200);

$('.mean-container').css({'opacity': '1', 'transform': 'translate(0)'});
$('.code-container').css({'opacity': '1', 'transform': 'translate(0)'});

let story = null;
registerTourStartAction();
function registerTourStartAction() {
  $('.start-tour').unbind('click');
  $('.start-tour').click(() => {
    if (story === null) {
      story = new Story();
      registerTourStopAction();
    }
  })
}

function registerTourStopAction() {
  $('.start-tour').unbind('click');
  $('.start-tour').click(() => {
    story.stop();
    story = null;
    registerTourStartAction();
  })
}

let slides = new Slides();
