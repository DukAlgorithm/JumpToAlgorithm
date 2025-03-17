import sys

input = sys.stdin.readline
T = int(input())

for _ in range(T):
    signal = input().rstrip()
    pattern = True
    cur = 0
    while signal:
        if signal.startswith('01'):
            signal = signal[2:]

        elif signal.startswith('100'):
            signal = signal[3:]

            while signal and signal[0] == '0':
                signal = signal[1:]

            if not signal:
                pattern = False
                break

            signal = signal[1:]

            while signal and signal[0] == '1':
                if signal.startswith('100'):
                    break
                else:
                    signal = signal[1:]
        else:
            pattern = False
            break

    print('YES'if pattern else 'NO')


# 정규식을 이용한 풀이
# import re

# pattern = re.compile(r'^(100+1+|01)+$')

# def is_signal(s):
#     return "YES" if pattern.fullmatch(s) else "NO"