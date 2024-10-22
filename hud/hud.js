var hudStatus = true;

function cStatUser(score1, score2) {
  var $box1 = $("#scoreboard1Box");
  var $box2 = $("#scoreboard2Box");
  $box1.css("width", `${score1}` + "%"); //Hp of the player.
  $box2.css("width", `${score2}` + "%"); //Armor of the player.
}

function cProvider(version, logo) {
  document.getElementById("logoImg").src = logo;
  document.getElementById("versionText").innerHTML = version;
}

function setCrosshair(provided) {
  document.getElementById("cl_crosshair_custom").src = provided;
}

function resetCrosshair() {
  var crosshair = document.getElementById("cl_crosshair_custom");
  crosshair.style.height = `24px`;
  crosshair.style.width = `24px`;

  var crosshairDef = document.getElementById("cl_crosshair_default");
  crosshairDef.style.height = `49px`;
  crosshairDef.style.width = `49px`;
}

function crosshairSize(provided) {
  var crosshair = document.getElementById("cl_crosshair_custom");
  if (crosshair && crosshair.style) {
    var ret = crosshair.style.height.replace("px", "");
    var test = parseInt(ret) + parseInt(provided);

    if (test < 24) {
      crosshair.style.height = `24px`;
      crosshair.style.width = `24px`;
    } else if (test > 36) {
      crosshair.style.height = `36px`;
      crosshair.style.width = `36px`;
    } else {
      crosshair.style.height = `${test}px`;
      crosshair.style.width = `${test}px`;
    }
  }
}

function setHudStatus(boo) {
  hudStatus = boo;
}

var hitMarkerTime = 0;

function showHitMarker(type) {
  hitMarkerTime = 3;
  if (type == 0) {
    document.getElementById("centeredimgm").src = "res/crosshair/m_white.png";
    document.getElementById("centeredimgm").style.visibility = "visible";
  }
  else {
    document.getElementById("centeredimgm").src = "res/crosshair/m_red.png";
    document.getElementById("centeredimgm").style.visibility = "visible";
  }
}

function setCrosshairColor(color) {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`crosshair_${i}`).style.stroke = `${color}`;
  }
}

// setInterval(()=> {
//   if(hitMarkerTime > 0) hitMarkerTime--;
//   else document.getElementById("centeredimgm").style.visibility = "hidden";
// }, 100);

function unlockLevelUp(newlevel) {
  document.getElementById("levelupdiv").style.visibility = "visible";
  document.getElementById("levelimg").src = `res/${newlevel}`;

  document.getElementById("levelimg").style.opacity = 1;

  setTimeout(function () {
    document.getElementById("levelimg").style.opacity = 0;
    document.getElementById("levelupdiv").style.visibility = "hidden";
  }, 5000);
}

function startLevelUp(newlevel) {
  document.getElementById("levelupdiv").style.visibility = "visible";
  document.getElementById("levelimg").src = `res/ranks/${newlevel}.png`;

  document.getElementById("levelimg").style.opacity = 1;

  setTimeout(function () {
    document.getElementById("levelimg").style.opacity = 0;
    document.getElementById("levelupdiv").style.visibility = "hidden";
  }, 5000);
}

window.addEventListener("DOMContentLoaded", function () {
  $("#small").on("click", function () {
    showlowernotify("small", "avenger", 10);
  });
  $("#regular").on("click", function () {
    showlowernotify("regular", "enemy killed", 100);
  });
  $("#getRibbon").on("click", function () {
    showlargenotify("res/ranks/125.png", "suppression ribbon", 200);
  });

  $("#testkill").on("click", () => {
    sendkillinfo("enemy", "enemy", "teammate", "teammate", "m4a1");
  });
});

function showlargenotify(imageurl, text, amount) {
  $("#ribbondiv").show();
  $("#ribbon").attr("src", imageurl);
  $("#ribbontext").text(text);
  $("#ribbonamount").text(`${amount}`);

  $("#ribbondiv").css("animation", "ribbon .5s ease-in-out forwards");

  setTimeout(() => {
    $("#ribbondiv").css("animation", "ribbonhide .5s ease-in-out forwards");
    setTimeout(() => {
      $("#ribbondiv").hide();
    }, 500);
  }, 2500);
}

let total = 0;

function showlowernotify(type, text, amount) {
  total += amount;
  if (total > 100) {
    $("#total").show();
    $("#total").text(`${total}`);
  }
  if (type == "small") {
    $("#smallxp").append(`
      <h1 class="smallxp">${text} ${amount}</h1>
    `);
    [$(".smallxp")].forEach((e) => {
      setTimeout(() => {
        $(e).remove();
      }, 4500);
    });
  } else {
    $("#regularxp").append(`
      <h1 class="regularxp">${text} ${amount}</h1>
    `);
    [$(".regularxp")].forEach((e) => {
      setTimeout(() => {
        $(e).remove();
      }, 4500);
    });
  }
  if ($(".regularxp").length > 5) {
    $(".regularxp")[0].remove();
  } else if ($(".smallxp").length > 5) {
    $(".smallxp")[0].remove();
  } else if ($(".regularxp").length + $(".smallxp").length > 5) {
    while (true) {
      $(".smallxp")[0].remove();
      $(".regularxp")[0].remove();
      if ($(".smallxp").length == $(".regularxp").length) {
        break;
      }
    }
  }
}

function sendkillinfo(killer, killercolor, killed, killedcolor, weapon) {
  $("#killstat").prepend(
    `
    <div class="killstatwrapper">
      <span class="killstat ${killercolor}" id="killer">${killer}</span>
      <span class="killstat weapon" id="killedwith">[${weapon}]</span>
      <span class="killstat ${killedcolor}" id="killedwho">${killed}</span>
    </div>
    `
  );

  if ($("#killstat").children().length > 4) {
    $(".killstatwrapper")[0].remove();
  }

  let arr = $(".killstatwrapper");

  for (let i = arr.length; i > 0; i--) {
    setTimeout(() => {
      $(arr[i - 1]).fadeOut(function () {
        $(this).remove();
      });
    }, 2500);
  }
}


// function getDisplayMedia(options) {
//   if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
//       return navigator.mediaDevices.getDisplayMedia(options)
//   }
//   if (navigator.getDisplayMedia) {
//       return navigator.getDisplayMedia(options)
//   }
//   if (navigator.webkitGetDisplayMedia) {
//       return navigator.webkitGetDisplayMedia(options)
//   }
//   if (navigator.mozGetDisplayMedia) {
//       return navigator.mozGetDisplayMedia(options)
//   }
//   throw new Error('getDisplayMedia is not defined')
// }

// function getUserMedia(options) {
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       return navigator.mediaDevices.getUserMedia(options)
//   }
//   if (navigator.getUserMedia) {
//       return navigator.getUserMedia(options)
//   }
//   if (navigator.webkitGetUserMedia) {
//       return navigator.webkitGetUserMedia(options)
//   }
//   if (navigator.mozGetUserMedia) {
//       return navigator.mozGetUserMedia(options)
//   }
//   throw new Error('getUserMedia is not defined')
// }

// async function takeScreenshotStream() {
//   const width = screen.width * (window.devicePixelRatio || 1)
//   const height = screen.height * (window.devicePixelRatio || 1)

//   const errors = []
//   let stream
//   try {
//       stream = await getDisplayMedia({
//           audio: false,
//           video: {
//               width,
//               height,
//               frameRate: 1,
//           },
//       })
//   } catch (ex) {
//       errors.push(ex)
//   }

//   if (navigator.userAgent.indexOf('Electron') >= 0) {
//       try {
//           stream = await getUserMedia({
//               audio: false,
//               video: {
//                   mandatory: {
//                       chromeMediaSource: 'desktop',
//                       minWidth         : width,
//                       maxWidth         : width,
//                       minHeight        : height,
//                       maxHeight        : height,
//                   },
//               },
//           })
//       } catch (ex) {
//           errors.push(ex)
//       }
//   }

//   if (errors.length) {
//       console.debug(...errors)
//       if (!stream) {
//           throw errors[errors.length - 1]
//       }
//   }

//   return stream
// }

// async function takeScreenshotCanvas() {
//   const stream = await takeScreenshotStream()

//   const video = document.createElement('video')
//   const result = await new Promise((resolve, reject) => {
//       video.onloadedmetadata = () => {
//           video.play()
//           video.pause()

//           const canvas = document.createElement('canvas')
//           canvas.width = video.videoWidth
//           canvas.height = video.videoHeight
//           const context = canvas.getContext('2d')
//           context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
//           resolve(canvas)
//       }
//       video.srcObject = stream
//   })

//   stream.getTracks().forEach(function (track) {
//       track.stop()
//   })

//   if (result == null) {
//       throw new Error('Cannot take canvas screenshot')
//   }

//   return result
// }

// function getJpegBlob(canvas) {
//   return new Promise((resolve, reject) => {
//       canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95)
//   })
// }

// async function getJpegBytes(canvas) {
//   const blob = await getJpegBlob(canvas)
//   return new Promise((resolve, reject) => {
//       const fileReader = new FileReader()

//       fileReader.addEventListener('loadend', function () {
//           if (this.error) {
//               reject(this.error)
//               return
//           }
//           resolve(this.result)
//       })

//       fileReader.readAsArrayBuffer(blob)
//   })
// }

// async function takeScreenshotJpegBlob() {
//   const canvas = await takeScreenshotCanvas()
//   return getJpegBlob(canvas)
// }

// async function takeScreenshotJpegBytes() {
//   const canvas = await takeScreenshotCanvas()
//   return getJpegBytes(canvas)
// }

// function blobToCanvas(blob, maxWidth, maxHeight) {
//   return new Promise((resolve, reject) => {
//       const img = new Image()
//       img.onload = function () {
//           const canvas = document.createElement('canvas')
//           const scale = Math.min(
//               1,
//               maxWidth ? maxWidth / img.width : 1,
//               maxHeight ? maxHeight / img.height : 1,
//           )
//           canvas.width = img.width * scale
//           canvas.height = img.height * scale
//           const ctx = canvas.getContext('2d')
//           ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
//           resolve(canvas)
//           console.log(canvas.toDataURL('base64/jpg'));
//           mp.trigger(`screenShotCatch`,canvas.toDataURL('base64/jpg'));
//       }
//       img.onerror = () => {
//           reject(new Error('Error load blob to Image'))
//       }
//       img.src = URL.createObjectURL(blob)
//   })
// }

// const capture = async () => {
//   var screenshotJpegBlob = await takeScreenshotJpegBlob()
//   var previewCanvas = await blobToCanvas(screenshotJpegBlob, window.screen.width, window.screen.length)
//   previewCanvas.style.position = 'fixed'
//   //document.body.appendChild(previewCanvas)
// }

function capture() {
  html2canvas(document.body).then((canvas) => {
    var dturl = canvas.toDataURL("image/png");
    mp.trigger(`screenShotCatch`, dturl);
  });
}

// $(".progress-bar").each(function(){

//   var bar = $(this).find(".bar");
//   var val = $(this).find("span");
//   var per = parseInt( val.text(), 10);

//   $({p:0}).animate({p:per}, {
//     duration: 3000,
//     easing: "swing",
//     step: function(p) {
//       bar.css({
//         transform: "rotate("+ (45+(p*1.8)) +"deg)"
//       });
//       val.text(p|0);
//     }
//   });
// });


// Executable function after getting current ammo and max ammo for any weapon.

indicatorInit(4, 7); // indicatorInit(tyvia aboimashi, aboimis sruli tyviebis raodenoba);

function hideIndicator() {
  $('#indicatorArea').empty();
}

function indicatorInit(ammo, fullAmmo) {
  let drawingAmmoNum = 180 / fullAmmo;
  draw(ammo, drawingAmmoNum, fullAmmo);
}

function draw(ammos, drawingAmmoNum, fullAmmo) {
  $('#indicatorArea').empty();
  $('#indicatorArea').append(`
      <div class="" style='right: -10px; bottom: -10px' id='ammoCountIndicator'>
          <small class="" style="
          font-size: 10px;
          color: rgb(17, 145, 174);">Ammo: <span>`+ ammos + `</span></small>
      </div>
  `);
  if (fullAmmo <= 20) {
    for (let i = 0; i < fullAmmo; i++) {
      $('#indicatorArea').append(`
              <div class='indicator indi`+ i + `' style='
              background-color: rgb(17, 145, 174);
              outline-color: rgb(17, 145, 174);
              outline-width: 0.5px;
              outline-style: solid; 
              transform: rotate(`+ drawingAmmoNum * i + `deg) !important; 
              width: 3px !important;'></div>
          `);
    }
  } else {
    for (let i = 0; i < fullAmmo; i++) {
      $('#indicatorArea').append(`
            <div class='indicator indi`+ i + `' style='
            background-color: rgb(17, 145, 174);
            outline-color: rgb(17, 145, 174);
            outline-width: 0.5px;
            outline-style: solid;
            transform: rotate(`+ drawingAmmoNum * i + `deg) !important'></div>
        `);
    }
  }

  let test = fullAmmo - ammos;
  for (let i = 0; i < test; i++) {
    $('.indi' + i).css('background-color', 'rgba(83,83,83,0.1)');
    $('.indi' + i).css('outline-color', 'rgba(95, 95, 95, 0.65)');
  }
}


//სერვერის მთავარი სტატები
const timeContainer = document.getElementById('timeOnline');
const playerCash = document.getElementById('cash');
const playersOnline = document.getElementById('playersOnline');

function setGeneralData(serverTime, onlinePlayers, cash) {
  timeContainer.textContent = serverTime;
  playerCash.textContent = '$' + cash;
  playersOnline.textContent = onlinePlayers;
}


// ტყვიების და იარაღის გაქრობა გამოჩენა თუ იარაღი ხელში აქვს მოთამაშეს
const currentAmmo = document.getElementById('bulletsInMag')
const totalAmmoClip = document.getElementById('bulletsInInv')
const gunsAndBulletsContainer = document.getElementById('gunsAndBullets');
let isPickedWeapon = false;

function setWeaponAmmo(currentAmmoInClip, totalAmmo) {
  currentAmmo.textContent = currentAmmoInClip;
  totalAmmoClip.textContent = totalAmmo;
  gunsAndBulletsContainer.style.opacity = 1
}

function hideWeaponInfo() {
  gunsAndBulletsContainer.style.opacity = 0
}

// ბანკის ანგარიშის წამოღება ბაზიდან
const bank = document.getElementById('bank')
function setBankAmount(amount) {
  bank.textContent = `$${amount}`;
}

//RPM logic
function rpmSpeedo(water, rpm) {
  const maxDashOffset = 722.2;
  const progressValue = (rpm * 100) * 0.70;
  
  // Calculate new dash offset
  const newDashOffset = maxDashOffset - (maxDashOffset * (progressValue / 100));
  progressCircle.style.strokeDashoffset = newDashOffset;

  // Calculate the rotation for the arrow
  // Assuming max RPM corresponds to a 270-degree rotation
  const maxRPM = 100; // Adjust this value based on your max RPM
  const minAngle = -34; // Starting angle
  const maxAngle = 236; // Ending angle
  const rotationRange = maxAngle - minAngle;
  let rotation = minAngle + ((rpm / 1) * rotationRange);

if (rpm >= 0.2) {
    rotation -= 5
  }

  if (rpm >= 0.5) {
    rotation -= 8
  }

  if (rpm >= 1) {
    rotation -= 8
  }

  
  // Calculate the angle based on RPM
  const arrowParent = document.getElementById('arrowParent');
  arrowParent.style.transform = `rotateZ(${rotation}deg)`;
  console.log(rotation);
}


//speedometer lights
const waterPump = document.getElementById('waterPump')
const arrow = document.getElementById('arrow')
const arrowMain = document.getElementById('arrowMain')
const seven = document.getElementById('seven')
const eight = document.getElementById('eight')
const rpmh1Divs = document.querySelectorAll('.rpmh1Divs h1')

function engineOnSpeedo() {
  waterPump.classList.add('arrowBackgroundForRpm')
  arrow.classList.add('arrowBackgroundForRpm')
  arrowMain.classList.add('arrowBackgroundForRpm')
  seven.classList.add('rpmNumsEngineOn')
  eight.classList.add('rpmNumsEngineOn')

  rpmh1Divs.forEach(rpmNumbers => {
    rpmNumbers.classList.add('rpmNumbersWhiteColor')
  })
}

function engineOffSpeedo() {
  waterPump.classList.remove('arrowBackgroundForRpm')
  arrow.classList.remove('arrowBackgroundForRpm')
  arrowMain.classList.remove('arrowBackgroundForRpm')
  seven.classList.remove('rpmNumsEngineOn')
  eight.classList.remove('rpmNumsEngineOn')

  rpmh1Divs.forEach(rpmNumbers => {
    rpmNumbers.classList.remove('rpmNumbersWhiteColor')
  })
}

// საწვავის ლოგიკა თუ საწვავის 10% ან ნაკლებია დარჩენილი მაჩვენებელი განათდეს და შეიცვალოს ფერი
// const gasPumpSign = document.getElementById('gasPump')

// function fuelSign(fuel) { // 50-ზე მეტი არ უნდა გადაეცეს fuel

//   fuel = fuel / 2;

//   const fuelProgress = document.getElementById('progressFuelCircle');
//   const fuelOffset = 722.2;
//   const newDashOffset = fuelOffset - (fuelOffset * (fuel / 100));
//   fuelProgress.style.strokeDashoffset = newDashOffset;
//   if (fuel <= 10) { 
//     gasPumpSign.classList.add('fuelPumpClass')
//   } else {
//     gasPumpSign.classList.remove('fuelPumpClass')
//   }
// }

// // სპიდომეტრის ლოგიკა
// const speedoMeter = document.getElementById('speedometer')
// const speedoKmh = document.getElementById('speed')

// function showSpeedo(kmh, rpm) {
//   speedoMeter.style.display = 'flex';
//   speedoKmh.textContent = kmh;


//   if (rpm > 0.95) {
//     rpm = 0.95 + (Math.random(1, 5) * 0.1);
//   }

//   const maxDashOffset = 722.2;
//   const progressValue = (rpm * 100) * 0.70;

//   const newDashOffset = maxDashOffset - (maxDashOffset * (progressValue / 100));
//   progressCircle.style.strokeDashoffset = newDashOffset;
 

//   if (progressValue >= 4.2) {
//     document.getElementById('speedoZero').classList.add('speedometerNumbersChangeColor')
//     document.getElementById('speedoOne').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoZero').classList.remove('speedometerNumbersChangeColor')
//     document.getElementById('speedoOne').classList.remove('speedometerNumbersChangeColor')
//   }


//   if (progressValue >= 13.3) {
//     document.getElementById('speedoTwo').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoTwo').classList.remove('speedometerNumbersChangeColor')
//   }


//   if (progressValue >= 22.4) {
//     document.getElementById('speedoThree').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoThree').classList.remove('speedometerNumbersChangeColor')
//   }

//   if (progressValue >= 32.9) {
//     document.getElementById('speedoFour').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoFour').classList.remove('speedometerNumbersChangeColor')
//   }

//   if (progressValue >= 43.4) {
//     document.getElementById('speedoFive').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoFive').classList.remove('speedometerNumbersChangeColor')
//   }

//   if (progressValue >= 52.5) {
//     document.getElementById('speedoSix').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoSix').classList.remove('speedometerNumbersChangeColor')
//   }

//   if (progressValue >= 60.9) {
//     document.getElementById('speedoSeven').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoSeven').classList.remove('speedometerNumbersChangeColor')
//   }

//   if (progressValue >= 68.6) {
//     document.getElementById('speedoEight').classList.add('speedometerNumbersChangeColor')
//   } else {
//     document.getElementById('speedoEight').classList.remove('speedometerNumbersChangeColor')
//   }

  

// }

// function hideSpeedo() {
//   speedoMeter.style.display = 'none';
// }