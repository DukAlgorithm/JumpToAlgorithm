function solution(places) {
  const results = [];

  for (const place of places) {
    const people = []; // 사람 좌표
    for (const [i, row] of place) {
      const cols = [];
      row.split("").forEach((e, c) => {
        if (e === "P") cols.push(c);
      });
      cols.forEach((e) => people.push([i, e]));
    }

    // 파티션 고려 + 맨해튼 거리 한명도 안지키면 results.push(0)   하고 break;
    let isValid = true;

    for (let i = 0; i < people.length; i++) {
      for (let j = i + 1; j < people.length; j++) {
        const [r1, c1] = people[i];
        const [r2, c2] = people[j];
        const distance = Math.abs(r1 - r2) + Math.abs(c1 - c2);
        if (distance === 1) {
          isValid = false;
          break;
        }

        // 거리 2 이하면 파티션 확인
        if (distance <= 2) {
          if (r1 === r2) {
            const midC = (c1 + c2) / 2;
            if (place[r1][midC] !== "X") {
              isValid = 0;
              break;
            } else if (c1 === c2) {
              const midR = (r1 + r2) / 2;
              if (place[midR][c1] !== "X") {
                isValid = 0;
                break;
              }
            } else {
              if (place[r1][c2] !== "X" || place[r2][c1] !== "X") {
                isValid = 0;
                break;
              }
            }
          }
        }
        if (!isValid) break;
      }
    }

    results.push(isValid ? 1 : 0);
  }

  return results;
}
