let alarmHour = null;
let alarmMinute = null;
let alarmSet = false;
let alarmTriggered = false;
let alarmInterval = null;
const alarmAudio = document.getElementById("alarm-audio");

function showAlarmSettings() {
    document.getElementById("alarm-settings").style.display = "block";
}

function activateAlarm() {
    const alarmInput = document.getElementById("alarm-time").value;
    if (!alarmInput) return alert("Please set a time for the alarm.");

    [alarmHour, alarmMinute] = alarmInput.split(":").map(Number);
    alarmSet = true;
    alarmTriggered = false;

    alert(`Alarm set for ${formatTime(alarmHour, alarmMinute)}`);
    document.getElementById("clear-alarm").style.display = "block";

    if (!alarmInterval) alarmInterval = setInterval(checkAlarm, 1000);
}

function checkAlarm() {
    if (!alarmSet || alarmTriggered) return;

    const now = new Date();
    if (now.getHours() === alarmHour && now.getMinutes() === alarmMinute) {
        triggerAlarm();
    }
}

function triggerAlarm() {
    alarmTriggered = true;
    alarmSet = false;
    clearInterval(alarmInterval);
    alarmInterval = null;

    if (document.getElementById("soundCheckbox").checked) alarmAudio.play();
    if (document.getElementById("vibrateCheckbox").checked) navigator.vibrate?.([500, 500, 500]);

    alert("⏰ Alarm is ringing! ⏰");
}

function clearAlarm() {
    alarmHour = alarmMinute = null;
    alarmSet = alarmTriggered = false;
    document.getElementById("clear-alarm").style.display = "none";
    document.getElementById("alarm-settings").style.display = "none";

    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    navigator.vibrate?.(0);

    alert("Alarm cleared!");
    clearInterval(alarmInterval);
    alarmInterval = null;
}

function formatTime(h, m) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
