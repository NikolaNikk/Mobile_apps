function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  let time = `${h}:${m}:${s}`;

  let clockDiv = document.getElementById('clock');
  clockDiv.innerHTML = '';

  for (let char of time) {
      let img = document.createElement('img');
      img.src = (char === ":") ? "images/colon.png" : `images/digit-${char}.png`;
      img.alt = char;
      img.className = 'digit';
      clockDiv.appendChild(img);
  }

  checkAlarm(h, m);
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

function displayDate() {
  const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  const today = new Date();
  let day = today.getDate();
  let month = monthNames[today.getMonth()];
  let year = today.getFullYear();
  document.getElementById('date').innerHTML = `${day} ${month} ${year}`;
}

window.onload = function() {
  startTime();
  displayDate();
};
