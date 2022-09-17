const citiesCount = 100;
const citiesCoordinateX = 400;
const citiesCoordinatey = 400;
const citiesRadius = 350;
const generationSize = 600;
const mutationChance = 0.02;

const cities = generateCitiesInCircle(citiesCoordinateX, citiesCoordinatey, citiesRadius, citiesCount);
let generation = getGeneration();

// var intervalId = window.setInterval(function () {
//     getNextGeneration();
// }, 200);



const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

const genes = [];
for (let i = 0; i < 50; i++) {
    genes.push(i);      
}
const result = permutator(genes);
console.log(result);

function getNextGeneration() {
    let oldGeneration = generation;
    let filterGeneration = [];
    oldGeneration.forEach(individ => {
        let distance = getPathDistance(individ);
        filterGeneration.push({ individ: individ, fitness: distance });
    });
    filterGeneration.sort((a, b) => a.fitness - b.fitness);
    const firstHalf = filterGeneration.slice(0, filterGeneration.length / 2);
    const best = firstHalf[0];
    console.log('Best result: ', best);
    drowCitiesAndPath(cities, firstHalf[0]);
    const newGeneration = [];
    for (let i = 0; i < firstHalf.length - 1; i = i + 2) {
        const parentA = firstHalf[i];
        const parentB = firstHalf[i + 1];
        const newChildren = crossGenes(parentA.individ, parentB.individ);
        newGeneration.push(...newChildren);
    }

    generation = newGeneration;
}

function crossGenes(parentA, parentB) {
    const children = [];
    for (let i = 0; i < 4; i++) {
        const newChild = [];
        const startIndex = Math.floor(Math.random() * parentA.length / 2);
        parentAGenes = parentA.slice(startIndex, startIndex + parentA.length / 2);
        newChild.push(...parentAGenes);
        parentB.forEach(gene => {
            if (newChild.indexOf(gene) < 0) {
                newChild.push(gene);
            }
        });

        if (Math.random() <= mutationChance) {
            const geneAindex = Math.floor(Math.random() * parentA.length);
            const geneBindex = Math.floor(Math.random() * parentA.length);
            const geneA = newChild[geneAindex];
            newChild[geneAindex] = newChild[geneBindex];
            newChild[geneBindex] = geneA;
        }
        children.push(newChild);
    }

    return children;
}

function getGeneration() {
    let individ = [];
    let newGeneration = [];
    for (let i = 1; i <= citiesCount; i++) {
        individ.push(i);
    }

    for (let n = 1; n <= generationSize; n++) {
        newGeneration.push(shuffle(individ));

    }
    return newGeneration;
}

function getPathDistance(path) {
    let fullDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        let fromCity = cities.filter(c => c.name == path[i])[0]; //{name: 1, x:5, y:0 }   1
        let toCity = cities.filter(c => c.name == path[i + 1])[0];
        fullDistance += getDistance(fromCity.x, fromCity.y, toCity.x, toCity.y);
    }

    return fullDistance;
}

function getDistance(x1, y1, x2, y2) {
    let c = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))

    return c;
}

function getNextPath() {
    console.log('cities');
    console.log(cities);
    path = shuffle(cities);
    drowCitiesAndPath(cities, path);
    // const pathDistance = getPathDistance(path.map(v => v.name));
    // document.getElementById('distance').innerText = `Distance: ${Math.round(pathDistance)} `;
}

function shuffle(array) {
    return [...array].sort(() => (Math.random() > .5) ? 1 : -1);
}

function drowCitiesAndPath(cities, path) {
    clearCanvas();
    drowCities(cities);
    drowPath(path);
}

function drowPath(path) {
    const individ = path.individ; //[1,2,4..n]
    for (let i = 0; i < individ.length - 1; i++) {
        let cityA = cities.filter(c => c.name == individ[i])[0];
        let cityB = cities.filter(c => c.name == individ[i + 1])[0];
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
    const angle = 2 * Math.PI / count;
    for (let i = 0; i < count; i++) {
        cities.push({
            name: i + 1,
            x: x + Math.cos(angle * i) * r,
            y: y + Math.sin(angle * i) * r
        })
    }

    return cities;
};