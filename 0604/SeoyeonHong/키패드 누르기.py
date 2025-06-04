# https://school.programmers.co.kr/learn/courses/30/lessons/67256

def solution(numbers, hand):
    answer = ''
    locations = [(3, 1), (0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
    left, right = [3, 0], [3, 2]
    for num in numbers:
        if locations[num][1] == 0: # 1, 4, 7일 경우
            answer += 'L'
            left = [locations[num][0], locations[num][1]]
        elif locations[num][1] == 2: # 3, 6, 9일 경우
            answer += 'R'
            right = [locations[num][0], locations[num][1]]
        else: # 2, 5, 8, 0일 경우우
            r, c = locations[num][0], locations[num][1]
            left_move = abs(left[0] - r) + abs(left[1] - c) # 오른쪽 엄지손가락까지 거리
            right_move = abs(right[0] - r) + abs(right[1] - c) # 왼쪽 엄지손가락까지 거리
            if right_move < left_move: # 오른쪽 엄지손가락이 더 가까우면
                answer += 'R'
                right = [locations[num][0], locations[num][1]]
            elif right_move > left_move: # 왼쪽 엄지손가락이 더 가까우면
                answer += 'L'
                left = [locations[num][0], locations[num][1]]
            else: # 거리가 같다면
                if hand == 'right': # 오른손잡이일 경우
                    answer += 'R'
                    right = [locations[num][0], locations[num][1]]
                else: # 왼손잡이일 경우
                    answer += 'L'
                    left = [locations[num][0], locations[num][1]]
    
    return answer