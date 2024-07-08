function allocateTasks(N, tasks) {
  let processors = [[], [], []];
  let times = [0, 0, 0];

  for (let i = 0; i < N; i++) {
    let shortestTimeIndex = times.indexOf(Math.min(...times));
    processors[shortestTimeIndex].push(tasks[i]);
    times[shortestTimeIndex] += tasks[i];
  }

  return processors;
}

let N = 100;
let tasks = Array.from(
  { length: N },
  () => Math.floor(Math.random() * 81) + 10
);
let result = allocateTasks(N, tasks);

console.log(result);
