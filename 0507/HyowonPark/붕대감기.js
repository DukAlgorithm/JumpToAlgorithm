/**
 *
 * @param {[시전 시간, 초당 회복량, 추가 회복량][]} bandage
 * @param {최대 체력, 1 ~ 1000} health
 * @param {[몬스터의 공격시간, 피해량][]} attacks
 * @returns {모든 공격이 끝난 직후 남은 체력, 죽는다면 -1}
 */
function solution(bandage, health, attacks) {
  const lastAttackTime = attacks.at(-1)[0];
  const maxHealth = health;
  attacks.reverse();
  let combo = 0;
  for (let i = 1; i <= lastAttackTime; i++) {
    // 몬스터 공격
    if (attacks.at(-1)[0] === i) {
      health -= attacks.at(-1)[1];
      attacks.pop();
      combo = 0;
    } else {
      combo++;
      if (combo >= 1) {
        health = Math.min(maxHealth, health + bandage[1]);
      }
      if (combo === bandage[0]) {
        health = Math.min(maxHealth, health + bandage[2]);
        combo = 0;
      }
    }

    // console.log(`${i}\t${health}\t${combo}\t`);

    if (health <= 0) {
      break;
    }
  }

  return health <= 0 ? -1 : health;
}

const cases = [
  [
    [5, 1, 5],
    30,
    [
      [2, 10],
      [9, 15],
      [10, 5],
      [11, 5],
    ],
    5,
  ],
  [
    [3, 2, 7],
    20,
    [
      [1, 15],
      [5, 16],
      [8, 6],
    ],
    -1,
  ],
  [
    [4, 2, 7],
    20,
    [
      [1, 15],
      [5, 16],
      [8, 6],
    ],
    -1,
  ],
  [
    [1, 1, 1],
    5,
    [
      [1, 2],
      [3, 2],
    ],
    3,
  ],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1], e[2]);
  console.log(`${r} (${r === e[3] ? "정답" : "오답"})`);
});
