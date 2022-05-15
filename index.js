let pattern = []
let colorBox = ['green', 'red', 'yellow', 'blue']
let isStart = false
let answerCtr = 0
let level = 0

$(document).on('keypress', function () {
  if(!isStart) {
    resetGame()
    runLevel()
  }
});

$('.btn').on('click', function (e) {
  if(!isStart) {
    return
  }

  let tempColor = $(e.target).attr('id')

  if(tempColor === pattern[answerCtr]) {
    answerCtr++
    if(answerCtr === level) {
      setTimeout(() => {
        runLevel()
      }, 500);
    }
    buttonPressed(tempColor)
  }

  else {
    buttonPressed(tempColor)
    buttonPressed('wrong')
    $('body').addClass('game-over')
    setTimeout(() => {
      $('body').removeClass('game-over')
    }, 100);
    $('#level-title').html('Level ' + level + '<br/>Game Over, Press Any Key to Restart');
    isStart = false
  }

});

function runLevel() {
  if(isStart) {
    answerCtr = 0
    $('#level-title').text('Level ' + ++level);
    let color = generateRandomColor()
    $('#' + color).fadeOut(100).fadeIn(100);
    let audio = new Audio('sounds/' + color + '.mp3')
    audio.play()
    pattern.push(color)
  }
}

function buttonPressed(color) {
  let audio = new Audio('sounds/' + color + '.mp3')
  audio.play()
  $('#' + color).addClass('pressed');
  setTimeout(() => {
    $('#' + color).removeClass('pressed');
  }, 100);
}

function generateRandomColor() {
  let colorNum = Math.floor(Math.random() * 4)
  let color = colorBox[colorNum]
  return color
}

function resetGame() {
  level = 0
  pattern = []
  isStart = true
}