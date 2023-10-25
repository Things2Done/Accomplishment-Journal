window.addEventListener('load', () => {
    //get accomplishment crom text entry field when button clicked
    document.getElementById('button-acc').addEventListener('click', () => {
        //hold data in variable
        let accToday = document.getElementById('acc-text').value;
        console.log(accToday);
        //create object to hold variable's data
        let obj = { "accomplishment": accToday };
        //stringify object for transfer
        let jsonData = JSON.stringify(obj);

        //send data to server, via post, with header data types, and body information
        fetch('/accToday', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => { console.log(data) })
        document.getElementById('acc-text').value = '';
    })

    const accInfo = document.getElementById('acc-info');
    const getTrackerButton = document.getElementById('get-tracker');

    getTrackerButton.addEventListener('click', () => {
        if (accInfo.style.display === 'none' || accInfo.style.display === '') {
            //get all Accomplishments Saved
            fetch('/getAccomplishments')
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById('acc-info').innerHTML = '';
                    console.log(data.data);
                    for (let i = 0; i < data.data.length; i++) {
                        let string = data.data[i].date + ":" + data.data[i].accomplishment
                        let elt = document.createElement('p');
                        elt.innerHTML = string;
                        accInfo.appendChild(elt);
                    }
                });
            accInfo.style.display = 'block'; // Show #acc-info
        } else {
            // If #acc-info is visible, hide it
            accInfo.style.display = 'none';
        }
    })
});
