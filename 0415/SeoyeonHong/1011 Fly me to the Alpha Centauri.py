import sys

input = sys.stdin.readline
T = int(input())

for _ in range(T):
    x, y = map(int, input().split())
    dist = y - x
    dp = [0]
    num = 1
    
    while dist >= dp[-1]:
        dp.extend([dp[-1] + num, dp[-1] + num * 2])
        num += 1
    
    for i in range(len(dp)-1, -1, -1):
        if dp[i] < dist:
            print(i+1)
            break
        
            
            
            
            
    



    