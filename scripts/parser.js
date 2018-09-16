
window.onload = () => { document.querySelector('#parse_button').onclick = handleParseClick; }

function handleParseClick() {
    // This parses the raw text from the print friendly seneca schedule given on the student center.
    // Currently relies on the order, though with more regex, it'll be slower but more flexible and 
    // work out of order.

    console.log('parsecalled')

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
    console.log(tempArr);

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
    console.log(courses)

    //TODO: Split into classes
    let classes = [];


    
    //TODO: Send to google calendar
}

