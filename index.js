let date = new Date();

for (let i = 0; i < 6; i++) {
  let tbody = document.querySelector("tbody");
  let tr = document.createElement("tr");

  for (let i = 0; i < 7; i++) {
    let td = document.createElement("td");
    tr.append(td);
  }

  tbody.append(tr);
}

let tdArr = document.querySelectorAll("td");

setCenterDisplay();
let [lastDay, Month] = [...getLastDate(date.getFullYear(), date.getMonth())];
makeCalendar(1, lastDay, Month);

let prevEl = document.getElementById("prev");
prevEl.innerHTML = "<<";
prevEl.onclick = previous;

let nextEl = document.getElementById("next");
nextEl.innerHTML = ">>";
nextEl.onclick = next;

let tableEL = document.querySelector("table");
tableEL.onclick = pickDate;

function pickDate(event) {
  let target = event.target;
  if (target.tagName != "TD" || !target.textContent) return;

  date.setDate(target.innerHTML);
  setCenterDisplay();
}

function previous() {
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  setCenterDisplay();

  let [lastDay, Month] = [...getLastDate(date.getFullYear(), date.getMonth())];
  makeCalendar(1, lastDay, Month);
}

function next() {
  date.setMonth(date.getMonth() + 1);
  date.setDate(1);
  setCenterDisplay();

  let [lastDay, Month] = [...getLastDate(date.getFullYear(), date.getMonth())];
  makeCalendar(1, lastDay, Month);
}

function setCenterDisplay() {
  let dateArr = String(date)
    .split(" ")
    .map((index) => index.toUpperCase());

  let [day, month, dates, year, ...rest] = [...dateArr];

  let dayEl = document.getElementById("day");
  dayEl.innerHTML = `${day}`;

  let dateEl = document.getElementById("date");
  dateEl.innerHTML = `${dates}`;

  let monthEl = document.getElementById("month");
  monthEl.innerHTML = `${month}`;

  let yearEl = document.getElementById("year");
  yearEl.innerHTML = `${year}`;
}

function getLastDate(year, month) {
  let last = new Date(year, month + 1, 0).getDate();
  return [last, month];
}

function makeCalendar(first, last, month) {
  tdArr.forEach((index) => (index.innerHTML = ""));
  date.setDate(first);

  let nowDate = new Date().getDate();
  let nowMonth = new Date().getMonth();
  console.log(nowDate, nowMonth, month);

  for (let i = date.getDay(); i < last + date.getDay(); i++) {
    tdArr[i].innerHTML = `${first++}`;
    if (tdArr[i].innerHTML === String(nowDate) && month === nowMonth) {
      tdArr[i].style.color = "red";
    }
  }
}
