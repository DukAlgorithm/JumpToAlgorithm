/**
 *
 * @param {행} n
 * @param {시작 행} k
 * @param {명령어 문자열 배열} cmd
 * @returns {삭제된 행은 X, 그대로면 O 문자열}
 */

function solution(n, k, cmd) {
  let head = null;
  let tail = null;
  let selected = null;
  let deletedStack = [];

  for (let i = 0; i < n; i++) {
    const newNode = {
      i,
      originalIdx: i,
      next: null,
      prev: null,
    };

    if (!head) {
      head = newNode;
      tail = newNode;
    } else {
      tail.next = newNode;
      newNode.prev = tail;
      tail = newNode;
    }

    if (i === k) {
      selected = newNode;
    }
  }

  for (let i = 0; i < cmd.length; i++) {
    let [action, amount] = cmd[i].split(" ");
    amount = +amount;

    switch (action) {
      case "D":
        for (let j = 0; j < amount; j++) {
          if (selected.next) {
            selected = selected.next;
          }
        }
        break;

      case "U":
        for (let j = 0; j < amount; j++) {
          if (selected.prev) {
            selected = selected.prev;
          }
        }
        break;
      case "C":
        deletedStack.push(selected);

        if (selected.prev) {
          selected.prev.next = selected.next;
        } else {
          head = selected.next;
        }

        if (selected.next) {
          selected.next.prev = selected.prev;
        } else {
          tail = selected.prev;
        }

        if (selected.next) {
          selected = selected.next;
        } else {
          selected = selected.prev;
        }
        break;
      case "Z":
        const restored = deletedStack.pop();

        if (restored.prev) {
          restored.prev.next = restored;
        } else {
          head = restored;
        }

        if (restored.next) {
          restored.next.prev = restored;
        } else {
          tail = restored;
        }
        break;
    }
  }

  let result = new Array(n).fill("X");
  let current = head;
  while (current) {
    result[current.originalIdx] = "O";
    current = current.next;
  }

  return result.join("");
}

const r1 = solution(8, 2, [
  "D 2",
  "C",
  "U 3",
  "C",
  "D 4",
  "C",
  "U 2",
  "Z",
  "Z",
  "U 1",
  "C",
]);
console.log(r1);
