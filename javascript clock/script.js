const $ = (selector) => {
    return document.querySelector(selector);
};

const $clock = $('.clock');

for (let i = 1; i <= 60; i++) {
    const dialLine = document.createElement('div');
    dialLine.className = 'diallines';
    $clock.appendChild(dialLine);
    dialLine.style.transform = `rotate(${6 * i}deg)`;
}

const $dialLines = $clock.querySelectorAll('.diallines');

function update() {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const date = d.getDate();
    let month = d.getMonth();
    const year = d.getFullYear();

    const hDeg = h * 30 + m * (360 / 720);
    const mDeg = m * 6 + s * (360 / 3600);
    const sDeg = s * 6;

    const $hour = $('.hour-hand');
    const $min = $('.minute-hand');
    const $sec = $('.second-hand');
    const $date = $('.date');
    const $day = $('.day');

    const day = weekday[d.getDay()];

    if (month < 9) {
        month = '0' + (month + 1);
    }
    $hour.style.transform = `rotate(${hDeg}deg)`;
    $min.style.transform = `rotate(${mDeg}deg)`;
    $sec.style.transform = `rotate(${sDeg}deg)`;
    $date.innerHTML = `${year}/${month}/${date}`;
    $day.innerHTML = day;
}

setInterval(update, 1000);

