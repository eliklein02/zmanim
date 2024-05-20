import { findLocation, jDate, ZmanimUtils, Utils } from 'jcal-zmanim';

let city
let zmanim

const getLocation = async () => {
    const url = 'https://ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com/backend/ipinfo/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b606db579msh19b9241eefeafdcp17209fjsn27355d6cc125',
            'X-RapidAPI-Host': 'ip-geolocation-find-ip-location-and-ip-info.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(await result.loc);
        const [lat, lon] = result.loc.split(','); // No need to use 'await' here
        console.log(lat, lon);
        city = findLocation({ latitude: lat, longitude: lon });
        const today = jDate.now()
        const allZmanim = ZmanimUtils.getAllZmanim(today, city);

        for (let zman of allZmanim) {
            zmanim = `${zman.zmanType.eng}: ${Utils.getTimeString(zman.time)}`
        }
    } catch (error) {
        console.error(error);
    }

}
getLocation();


const docBody = document.body;
const newDiv = document.createElement('div');
newDiv.innerText = zmanim;
docBody.appendChild(newDiv);
