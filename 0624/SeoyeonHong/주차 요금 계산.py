from collections import defaultdict
import math

def string_to_minutes(string):
    total_minutes = 0
    hour, minute = string.split(":")
    total_minutes = int(hour) * 60 + int(minute)
    return total_minutes

# 자동차별 주차 요금 계산 
def solution(fees, records):
    answer = []
    base_time = fees[0]
    base_fee = fees[1]
    overage_time = fees[2]
    overage_fee = fees[3]
    
    enter_times = defaultdict(list)
    total_time = defaultdict(int)
    toatal_fees = defaultdict(int)
    
    for record in records:
        time, car, enter = record.split(" ")
        if enter == 'IN': # 입차
            enter_times[car].append(string_to_minutes(time))
            
        else: # 출차
            enter_times[car].append(string_to_minutes(time))
            
            
    for car in enter_times.keys():
        times = enter_times[car]
        if len(times) % 2 == 1: # 출차 기록이 없다면
            times.append(string_to_minutes("23:59"))
        for i in range(0, len(times), 2):
            total_time[car] += times[i+1] - times[i]

        if total_time[car] <= base_time: # 기본 시간 이하일 경우
            toatal_fees[car] = base_fee
        else: # 기본 시간 초과 시
            toatal_fees[car] = base_fee + overage_fee * math.ceil((total_time[car] - base_time) / overage_time)

    sorted_items = toatal_fees.items()
    sorted_items = sorted(sorted_items)
    answer = []

    for _, value in sorted_items:
        answer.append(value)

    return answer