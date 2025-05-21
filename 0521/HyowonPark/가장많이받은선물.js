/**
 *
 * @param {이름 1차원 배열} friends
 * @param {이번 달까지 주고받은 선물 기록 [sender, receiver]} gifts
 * @returns {다음 달에 가장 많은 선물을 받는 친구가 받을 선물의 수}
 *
 * 다음 달에 선물을 받을 사람(A, B)
 * (1) 서로 주고 받은 기록이 있을 때 -> 더 많이 준 사람
 * (2)      ""          없을 때 -> 선물 지수가 큰 사람(선물지수 = 지금까지 보낸 선물 수 - 받은 선물 수)
 * (3)  1은 해당 안되고 2에서 선물 지수가 같으면 다음달에 선물 주고받지 않음.
 */

function solution(friends, gifts) {
  const sendCounts = new Map(); // 친구별 보낸 선물 수
  const receiveCounts = new Map(); // 친구별 받은 선물 수
  const giftPoints = new Map();
  const senderReceiverLog = new Map(); //  { `{A},{B}`: [A가 보낸 수, B가 보낸 수] } A, B는 오름차순

  for (let g of gifts) {
    const [sender, receiver] = g.split(" ");
    if (sendCounts.has(sender)) {
      sendCounts.set(sender, sendCounts.get(sender) + 1);
    } else {
      sendCounts.set(sender, 1);
    }
    if (receiveCounts.has(receiver)) {
      receiveCounts.set(receiver, receiveCounts.get(receiver) + 1);
    } else {
      receiveCounts.set(receiver, 1);
    }

    // 서로 주고 받은 이력 업데이트
    const isSenderFirst = sender < receiver;
    const key = [sender, receiver].sort().join(",");

    if (senderReceiverLog.has(key)) {
      const [A, B] = senderReceiverLog.get(key);

      senderReceiverLog.set(key, isSenderFirst ? [A + 1, B] : [A,  B + 1]);
    } else {
      senderReceiverLog.set(key, isSenderFirst ? [1, 0] : [0, 1]);
    }
  }

  for (let f of friends) {
    giftPoints.set(f, (sendCounts.get(f) || 0) - (receiveCounts.get(f) || 0));
  }

  let max = 0; // A가 다음달에 받는 선물 수 최댓값
  for (let A of friends) {
    // A가 다음 달에 받은 선물 수
    let giftsCnt = 0;
    for (let B of friends.filter((e) => e !== A)) {
      const isAFirst = A < B;
      const key = [A, B].sort().join(",");
      const log = senderReceiverLog.get(key);
      if (log) {
        const [first, second] = log;
        const aGave = isAFirst ? first : second;
        const bGave = isAFirst ? second : first;

        if (aGave !== bGave) {
          if (aGave > bGave) {
            giftsCnt++;
          }
        } else {
          if (giftPoints.get(A) > giftPoints.get(B)) {
            giftsCnt++;
          }
        }
      } else {
        if (giftPoints.get(A) > giftPoints.get(B)) {
          giftsCnt++;
        }
      }
    }

    max = Math.max(max, giftsCnt);
  }

  return max;
}

const cases = [
  [
    ["muzi", "ryan", "frodo", "neo"],
    [
      "muzi frodo",
      "muzi frodo",
      "ryan muzi",
      "ryan muzi",
      "ryan muzi",
      "frodo muzi",
      "frodo ryan",
      "neo muzi",
    ],
    2,
  ],
  [
    ["joy", "brad", "alessandro", "conan", "david"],
    [
      "alessandro brad",
      "alessandro joy",
      "alessandro conan",
      "david alessandro",
      "alessandro david",
    ],
    4,
  ],
  [["a", "b", "c"], ["a b", "b a", "c a", "a c", "a c", "c a"], 0],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1]);
  console.log(`${r} 답: ${e[2]}\t${r === e[2] ? "정답" : "오답"}`);
});
