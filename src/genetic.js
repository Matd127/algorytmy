function fitnessFunction(x) {
    return Math.sin(x) * Math.cos(x);
}

function initializePopulation(populationSize, minRange, maxRange) {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
        let chromosome = {
            x: Math.random() * (maxRange - minRange) + minRange,
            fitness: 0
        };
        population.push(chromosome);
    }
    return population;
}

function selectParents(population, tournamentSize) {
    let parents = [];
    for (let i = 0; i < population.length; i++) {
        let candidates = [];
        for (let j = 0; j < tournamentSize; j++) {
            let index = Math.floor(Math.random() * population.length);
            candidates.push(population[index]);
        }
        let bestCandidate = candidates.reduce((prev, current) => prev.fitness > current.fitness ? prev : current);
        parents.push(bestCandidate);
    }
    return parents;
}

function crossover(parent1, parent2, crossoverRate) {
    if (Math.random() < crossoverRate) {
        let child1 = {
            x: (parent1.x + parent2.x) / 2,
            fitness: 0
        };
        let child2 = {
            x: (parent1.x + parent2.x) / 2,
            fitness: 0
        };
        return [child1, child2];
    } else {
        return [parent1, parent2];
    }
}

function mutate(chromosome, mutationRate, minRange, maxRange) {
    if (Math.random() < mutationRate) {
        chromosome.x = Math.random() * (maxRange - minRange) + minRange;
    }
    return chromosome;
}

function evolvePopulation(population, tournamentSize, crossoverRate, mutationRate, minRange, maxRange) {
    let parents = selectParents(population, tournamentSize);
    
    let newPopulation = [];
    for (let i = 0; i < parents.length - 1; i += 2) {
        let [child1, child2] = crossover(parents[i], parents[i + 1], crossoverRate);
        child1 = mutate(child1, mutationRate, minRange, maxRange);
        child2 = mutate(child2, mutationRate, minRange, maxRange);
        newPopulation.push(child1, child2);
    }
    
    return newPopulation;
}

function geneticAlgorithm(populationSize, maxGenerations, tournamentSize, crossoverRate, mutationRate, minRange, maxRange) {
    let population = initializePopulation(populationSize, minRange, maxRange);

    for (let generation = 0; generation < maxGenerations; generation++) {
        population.forEach(chromosome => {
            chromosome.fitness = fitnessFunction(chromosome.x);
        });

        population.sort((a, b) => b.fitness - a.fitness);

        console.log(`Generation ${generation}: Best fitness = ${population[0].fitness}`);

        population = evolvePopulation(population, tournamentSize, crossoverRate, mutationRate, minRange, maxRange);
    }

    population.sort((a, b) => b.fitness - a.fitness);
    return population[0];
}

const populationSize = 100;
const maxGenerations = 50;
const tournamentSize = 5;
const crossoverRate = 0.8;
const mutationRate = 0.01;
const minRange = -10;
const maxRange = 10;

const bestChromosome = geneticAlgorithm(populationSize, maxGenerations, tournamentSize, crossoverRate, mutationRate, minRange, maxRange);

console.log("Best fitness found:", bestChromosome);
