
function solution(n, k) {
    const primes = new Map();
    primes.set(2, true);

    const isPrime = (n) => {
        if (primes.has(n)) {
            return primes.get(n);
        }
    
        let divide = 3;
        while (divide <= Math.sqrt(n)) {
            if (n % divide === 0) {
                primes.set(n, false)
                return false;
            }
            divide += 2;
        }
        primes.set(n, true);

        return true;
    }

    const nums = n.toString(k).split('0');
    let p = 0;
    for (const n of nums) {
        if (n === '') {
            continue;
        }

        if (n > 1 && isPrime(parseInt(n))) {
            p++;
        }
    }

    return p;
}

