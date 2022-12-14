window.onload = function () {
  var tens = 0;
  var seconds = 0;
  var minutes = 0;
  var hors = 0;

  const horsTeans = document.getElementById("hors");
  const minutesTens = document.getElementById("minutes");
  const secondsTens = document.getElementById("tens");
  const secondTens = document.getElementById("seconds");

  const btnStart = this.document.getElementById("btnStart");
  const btnPausar = this.document.getElementById("btnPausar");
  const btnResetar = this.document.getElementById("btnResetar");

  var Intervalo;

  function startTimer() {
    tens++;

    if (tens < 9) {
      seconds.innerHTML = "0" + tens;
    }
    if (tens > 9) {
      secondsTens.innerHTML = tens;
    }
    if (tens > 99) {
      seconds++;
      secondTens.innerHTML = "0" +
        seconds;
      tens = 0;
      secondsTens.innerHTML = "0" + tens;
    }
    if (seconds > 9) {
      secondTens.innerHTML = + seconds;
    }
    if (seconds > 59) {
      seconds = 0;
      minutes = + minutes + 1;
      minutesTens.innerHTML = minutes > 9 ? minutes : `0${minutes}`;
    }

    if (minutes > 59) {
      seconds = 0;
      minutes = 0;
      hors++;
      horsTeans.innerHTML = + hors;
    }
  }

  btnStart.onclick = function () {
    clearInterval(Intervalo);
    Intervalo = setInterval(startTimer, 10);
  };

  btnPausar.onclick = function () {
    clearInterval(Intervalo);
  };

  btnResetar.onclick = function () {
    clearInterval(Intervalo);
    tens = "0";
    seconds = "0";
    minutes = "0";
    hors = "0";

    secondsTens.innerHTML = tens;
    secondTens.innerHTML = seconds;
    minutesTens.innerHTML = minutes;
    horsTeans.innerHTML = hors;
  };
};