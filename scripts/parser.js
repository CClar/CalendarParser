
window.onload = () => { document.querySelector('#parse_button').onclick = handleParseClick; }

function handleParseClick() {
    console.log('parsecalled')

    // get and split raw text into lines
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

    // TODO: split into courses
    let courses = [];
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i][1] == "Enrolled") {

            courses.push(
                rawLines.slice(
                    tempArr[i][1] - 2, tempArr[i+1][1] - 3
                )
            );
        }
    }
    //TODO: Split into classes

    //TODO: Send to google calendar
}

