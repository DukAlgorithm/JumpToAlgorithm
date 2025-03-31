from itertools import permutations

N = int(input())
answer = 0
o = []
x = []
candidates = list(permutations(['1', '2', '3', '4', '5', '6', '7', '8', '9'], 3))
for _ in range(N):
    num, strike, ball = map(int, input().split())
    elements = list(str(num))
    new_candidates = []
    for i in range(len(candidates)):
        candidate = candidates[i]
        s, b = 0, 0
        for j in range(3):
            if elements[j] == candidate[j]:
                s += 1
            elif candidate[j] in elements:
                b += 1
        if strike == s and ball == b:
            new_candidates.append(candidate)
    candidates = new_candidates
    
print(len(candidates))
    

                

    