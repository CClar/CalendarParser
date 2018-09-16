
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

    //Split into classes
    let classes = [];

    courses.forEach((ele, i)=>{
        classes.push({
            name: ele[0].slice(0,7),
            dates: classDate(ele)
        });
    });
    console.log(classes)
    
    //TODO: Send to google calendar
}

function classDate(ele){
    // returns an array with the time information of the classes
    let classTimes = [];

    ele.forEach((e, i)=>{
        if (/^[A-Z][a-z] [0-9][0-9:]/.test(e)){
            classTimes.push({
                day: e.slice(0,2),
                time: e.slice(3),
                location: ele[i+1].slice(),
                startDate: ele[i+3].slice(0, 10),
                endDate: ele[i+3].slice(13)
            })
        }
    });

    return classTimes;
}