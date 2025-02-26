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

    // Start checking every second (Only if not already running)
    if (!alarmInterval) {
        alarmInterval = setInterval(checkAlarm, 1000);
    }
}

function checkAlarm() {
    if (!alarmSet || alarmTriggered) return; // Prevents repeating alerts

    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();

    if (h === alarmHour && m === alarmMinute) {
        triggerAlarm();
    }
}

function triggerAlarm() {
    alarmTriggered = true; // Prevents multiple alerts
    alarmSet = false;
    clearInterval(alarmInterval);
    alarmInterval = null;

    if (document.getElementById("soundCheckbox").checked) alarmAudio.play();
    if (document.getElementById("vibrateCheckbox").checked) navigator.vibrate?.([500, 500, 500]);

    alert("⏰ Alarm is ringing! ⏰");
}

function clearAlarm() {
    alarmHour = null;
    alarmMinute = null;
    alarmSet = false;
    alarmTriggered = false;
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

// ✅ Add Alerts When Checking Sound or Vibration
document.getElementById("soundCheckbox").addEventListener("change", function () {
    alert(this.checked ? "🔊 Sound Enabled" : "🔇 Sound Disabled");
});

document.getElementById("vibrateCheckbox").addEventListener("change", function () {
    alert(this.checked ? "📳 Vibration Enabled" : "🔕 Vibration Disabled");
});