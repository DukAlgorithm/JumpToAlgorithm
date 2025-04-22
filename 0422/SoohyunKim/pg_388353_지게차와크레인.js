function solution(storage, requests) {
  const row = storage.length;
  const col = storage[0].length;
  let containerCnt = row * col;
  let storageMap = storage.map((string) => string.split(""));

  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  // 범위 체크
  const isInside = (x, y) => x >= 0 && x < row && y >= 0 && y < col;

  // 외부와 연결되어 있는가
  const isOutside = (x, y) => {
      for (let i = 0; i < 4; ++i) {
          const nx = x + dx[i], ny = y + dy[i];
          if (!isInside(nx, ny)) return true; // 범위 밖
          if (storageMap[nx][ny] === 0) return true;
      }
      return false;
  };

  const resetOutside = () => {
      for (let x = 0; x < row; x++) {
          for (let y = 0; y < col; y++) {
              if (isOutside(x, y) && storageMap[x][y] === 1) {
                  const queue = [[x, y]];

                  while (queue.length) {
                      const [cx, cy] = queue.shift();
                      storageMap[cx][cy] = 0;

                      for (let i = 0; i < 4; ++i) {
                          const nx = cx + dx[i], ny = cy + dy[i];
                          if (isInside(nx, ny) && isOutside(nx, ny) && storageMap[nx][ny] === 1) {
                              queue.push([nx, ny]);
                          }
                      }
                  }
              }
          }
      }
  };

  requests.forEach((request) => {
      const alphabet = request[0];
      resetOutside();

      if (request.length === 1) {
          const remove = [];
          for (let x = 0; x < row; x++) {
              for (let y = 0; y < col; y++) {
                  if (storageMap[x][y] === alphabet && isOutside(x, y)) {
                      remove.push([x, y]);
                  }
              }
          }

          remove.forEach(([x, y]) => {
              storageMap[x][y] = 0;
              containerCnt--;
          });
      } else {
          for (let x = 0; x < row; x++) {
              for (let y = 0; y < col; y++) {
                  if (storageMap[x][y] === alphabet) {
                      storageMap[x][y] = 1;
                      containerCnt--;
                  }
              }
          }
      }
  });

  return containerCnt;
}