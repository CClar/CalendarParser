
window.onload = () => { document.querySelector('#parse_button').onclick = handleParseClick; }

function handleParseClick() {
    // This parses the raw text from the print friendly seneca schedule given on the student center.
    // Currently relies on the order, though with more regex, it'll be slower but more flexible and 
    // work out of order.

    // Get and split raw text into lines
    const calendar = document.querySelector('#calendarRaw');
    const rawLines = calendar.innerHTML.split('\n');

    // Search for start and end of course
    let tempArr = [];
    for (let i = 0; i < rawLines.length; i++) {
        let word = rawLines[i].match(/^(Enrolled|Dropped)$/);
        if (word != null)
            tempArr.push([word[0], i]);
    }

    // Split into registered courses
    let courses = [];
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i][0] == "Enrolled") {
            if (i + 1 < tempArr.length)
                courses.push(rawLines.slice(tempArr[i][1] - 2, tempArr[i + 1][1] - 2));
            else
                courses.push(rawLines.slice(tempArr[i][1] - 2));
        }
    }

    // Split into classes
    let classes = [];

    courses.forEach((ele, i) => {
        classes.push({
            name: ele[0].slice(0, 7),
            dates: classDate(ele)
        });
    });
    handleCalendarUpdate(classes);
}

function classDate(ele) {
    // returns an array with the time information of the classes
    let classTimes = [];

    ele.forEach((e, i) => {
        if (/^[A-Z][a-z] [0-9][0-9:]/.test(e)) {
            classTimes.push({
                day: e.slice(0, 2),
                time: calTime(e.slice(3)),
                location: ele[i + 1].slice(),
                startDate: calStartDay(e.slice(0, 2), ele[i + 3].slice(0, 10)),
                endDate: calEndDay(ele, i)
            })
        }
    });

    return classTimes;
}
function calStartDay(day, start) {
    // returns a date obj with the correct start date according the day of the week
    const dayWeekKey = {
        "Su": 0,
        "Mo": 1,
        "Tu": 2,
        "We": 3,
        "Th": 4,
        "Fr": 5,
        "Sa": 6,
    }
    start = new Date(start);
    start.setTime(start.getTime() + (7 + dayWeekKey[day] - start.getDay()) % 7 * 86400000);
    start = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
    return start;
}
function calTime(time) {
    // API dateTime Format
    // 2018-09-18T09:00:00
    let startTime, endTime;
    time = time.match(/\d?\d:\d?\d[AP]M/g);

    time = time.map((ele) => {
        return AMPM(ele);
    });
    return time;
}
function AMPM(time) {
    let twentyfourTime;

    if (time.slice(-2) == "PM") {
        // Add 12hours to make it 24hr format
        twentyfourTime = (time.slice(0, 1) * 1 + 12) + time.slice(1, -2)
    } else {
        twentyfourTime = time.slice(0, -2)
    }

    return 'T' + twentyfourTime + ":00";
}
function calEndDay(ele, i) {
    return ele[i + 3].slice(19) + ele[i + 3].slice(13, 15) + ele[i + 3].slice(16, 18);
}