X, Y = map(int, input().split())

Z = Y * 100 // X
if Z >= 99:
    print(-1)
else:
    left = 1
    right = 1000000000
    answer = -1
    while left <= right:
        mid = (left + right) // 2
        if (Y + mid) * 100 // (X + mid) > Z:
            answer = mid
            right = mid - 1
        else:
            left = mid + 1
    print(answer)
