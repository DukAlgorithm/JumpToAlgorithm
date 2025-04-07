function sol20003() {
  const input = require("fs").readFileSync("/dev/stdin").toString();

  const [[N], ...items] = input
    .trim()
    .split("\n")
    .map((e) => e.split(" ").map(Number));

  // 최대공약수
  const getGCD = (a, b) => {
    while (b > 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  // 최소공배수
  const getLCM = (a, b) => (a * b) / getGCD(a, b);

  // 약분
  items.forEach((item) => {
    const gcd = getGCD(item[0], item[1]);
    item[0] /= gcd;
    item[1] /= gcd;
  });

  // 분모 최소공배수
  const lcm = items.reduce((lcm, [_, den]) => getLCM(lcm, den), 1);

  // 분자(x) 최대공약수
  const gcd = items.reduce((gcd, [num, den]) => {
    const x = num * (lcm / den);
    return gcd === 0 ? x : getGCD(gcd, x);
  }, 0);

  const finalGCD = getGCD(gcd, lcm);
  console.log(`${gcd / finalGCD} ${lcm / finalGCD}`);
}

sol20003();
