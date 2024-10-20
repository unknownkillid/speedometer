function showFirstNotification(title, text, img) {

  document.getElementById("notify_1_title").innerHTML = title;
  document.getElementById("notify_1_text").innerHTML = text;
  document.getElementById("notify_1_img").src = img;
  document.getElementById("notify_1").style.visibility = 'visible';
}

function closeFirstNotification() {
  document.getElementById("notify_1").style.visibility = 'hidden';
}

function showSecondNotification(type, captain, text, duration) {
  let type_char = 'info';
  let symbol = 'info';
  switch (type) {
    case 0:
      type_char = 'info';
      symbol = 'info';
      break;

    case 1:
      type_char = 'warning';
      symbol = 'emergency_home';
      break;

    case 2:
      type_char = 'error';
      symbol = 'dangerous';
      break;

    case 3:
      type_char = 'success';
      symbol = 'check_circle';
      break;

    default:
      break;
  }

  $('.container').children().fadeOut();
  $('.container').children().each(function () {
    setTimeout(() => {
      $(this).remove();
    }, 500);
  });

  let html = `
    <div>
        <div class="notification_2 notification_2-`+ type_char + `">
            <div class="notification_2-top-side">
                <div class="notification_2-symbol notification_2-symbol-`+ type_char + `">
                    <span class="material-symbols-outlined">
                        `+ symbol + `
                    </span>
                </div>
                <div class="notification_2-text">
                    <div class="notification_2-text-header">
                        `+ captain + `
                    </div>
                    <p>`+ text + `</p>
                </div>
            </div>
        </div>
        <div class="notification_2-progressbar">
            <div class="notification_2-progress progress-`+ type_char + `"></div>
        </div>
    </div>`;

  console.log(html);
  $('.container').append(html);

  $('.notification_2-progressbar').css(`width`, `100%`);
  $('.notification_2-progress').css(`animation-duration`, `${duration / 1000}s`);

  setTimeout(() => { //Fade
    $('.container').children().fadeOut();
  }, duration);
}

function convertKeyCode(keyCode) {
  if (keyCode >= 96 && keyCode <= 105) {
    return "NUM" + (keyCode - 96);
  } else {
    switch (keyCode) {
      case 3:
        return 'Cancel';
        break;
      case 8:
        return 'Backspace'
        break;
      case 9:
        return 'Tab'
        break;
      case 12:
        return 'NumLock'
        break;
      case 13:
        return 'Enter'
        break;
      case 16:
        return 'Shift'
        break;
      case 17:
        return 'Control'
        break;
      case 18:
        return 'Alt'
        break;
      case 20:
        return 'CapsLock'
        break;
      case 27:
        return 'Escape'
        break;
      case 32:
        return 'Space'
        break;
      default:
        return String.fromCharCode(keyCode).toUpperCase();
        break;
    }
  }
}

function sendInteractionNotification(text, keyCode) { // am funqciit gaushveb nottifikaciis texts 
  $('#interaction-notifs').addClass('interactionAnimationClass')
  let key = convertKeyCode(keyCode);

  $('.interactionDescription').empty();
  $('.interactionKey').empty();

  $('.interactionKey').append(`
        <h4 style="margin-left: 8px; color: white; margin: 5%">`+ key + `</h4>
    `);

  $('.interactionDescription').append(`
        <p style="color: orange; width: 100%; text-align: center; font-family: BPGArial; font-size: 14px;">
            `+ text + `
        </p>
    `);

  //$('#interaction-notifs').fadeIn();
}

function closeInteractionNotification() {
  $('#interaction-notifs').removeClass('interactionAnimationClass');
  //$('#interaction-notifs').fadeOut();

}
// interaction notification debugging code

let some = false;
window.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {  // Enter key is pressed
    if (!some) {
      sendInteractionNotification('asdasdasd asd asd asd ', 13);
      some = true;
      $('#interaction-notifs').addClass('interactionAnimationClass');
    } else {
      $('#interaction-notifs').removeClass('interactionAnimationClass');
      some = false;  // Reset `some` to false so the animation can be added again later
    }
  }
});