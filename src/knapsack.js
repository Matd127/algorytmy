function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array.from(Array(n + 1), () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const currentValue = items[i - 1].value;
    const currentWeight = items[i - 1].weight;
    for (let w = 1; w <= capacity; w++) {
      if (currentWeight > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - currentWeight] + currentValue
        );
      }
    }
  }

  let selectedItems = [];
  let totalValue = dp[n][capacity];
  let remainingCapacity = capacity;

  for (let i = n; i > 0 && totalValue > 0; i--) {
    if (totalValue !== dp[i - 1][remainingCapacity]) {
      selectedItems.push(items[i - 1]);
      totalValue -= items[i - 1].value;
      remainingCapacity -= items[i - 1].weight;
    }
  }

  return {
    maxValue: dp[n][capacity],
    selectedItems: selectedItems,
  };
}

const items = [
  { value: 60, weight: 10 },
  { value: 100, weight: 20 },
  { value: 120, weight: 30 },
];
const capacity = 50;

const result = knapsack(items, capacity);
console.log("Maksymalna wartość plecaka:", result.maxValue);
console.log("Wybrane przedmioty:", result.selectedItems);
