from itertools import combinations

N, K = map(int, input().split())

words = []
alphabets = set([])
selected = {'a', 't', 'n', 'i', 'c'}
max_readable = 0

for _ in range(N):
    word = set(list(input().rstrip()[4:-4])) - selected
    words.append(word)
    alphabets.update(word)

if K < len(selected): # 'anta'와 'tica'에 속하는 글자를 다 가르칠 수 없을 때
    print(0)
else:
    if K-len(selected) >= len(alphabets):
        max_readable = N
    else:
        for combination in combinations(alphabets, K-len(selected)):
            readable = 0
            combination = set(combination)
            for word in words:
                if len(word - combination) == 0:
                    readable += 1
            max_readable = max(max_readable, readable)

    print(max_readable)
        
    


