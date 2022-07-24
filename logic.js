const citiesCount = 5;
const citiesCoordinateX = 400;
const citiesCoordinatey = 400;
const citiesRadius = 350;

const cities = generateCitiesInCircle(citiesCoordinateX, citiesCoordinatey, citiesRadius, citiesCount);
var path = shuffle(cities);
drowCitiesAndPath(path);


function getNextPath() {
    path = shuffle(cities);
    drowCitiesAndPath(path);
}

function shuffle(array) {
    return array.sort(() => (Math.random() > .5) ? 1 : -1);
}

function drowCitiesAndPath(path) {
    clearCanvas();
    drowCities(path);
    drowPath(path);
}

function drowPath(path) {
    for (let i = 0; i < path.length - 1; i++) {
        const cityA = path[i];
        const cityB = path[i + 1];
        drowLine(cityA.x, cityA.y, cityB.x, cityB.y);
    }
}

function drowCities(cities) {
    cities.forEach(city => {
        drowCity(city.name, city.x, city.y);
    });
}

function generateCitiesInCircle(x, y, r, count) {
    const cities = [];
    const angle = 2 * Math.PI/ count;
    for (let i = 0; i < count; i++) {
        cities.push({
            name: i + 1,
            x: x + Math.cos(angle * i) * r,
            y: y + Math.sin(angle * i) * r
        })
    }

    return cities;
};