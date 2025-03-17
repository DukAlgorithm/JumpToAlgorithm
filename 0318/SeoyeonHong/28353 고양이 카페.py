N, K = map(int, input().split())

weights = list(map(int, input().split()))
weights.sort() # 오름차순 정렬
light = 0 # 가벼운 고양이 인덱스
heavy = N-1 # 무거운 고양이 인덱스
happy = 0 # 행복한 사람 수
while light < heavy:
    if weights[light] + weights[heavy] <= K: # 두 고양이의 무게의 합이 K 이하라면
        happy += 1
        light += 1
        heavy -= 1
    else:
        heavy -= 1
    
print(happy)