# https://school.programmers.co.kr/learn/courses/30/lessons/250137#

def solution(bandage, health, attacks):
    prev_time = 0 # 이전 공격 시간
    cur_health = health # 현재 체력
    for time, damage in attacks:
        if cur_health < health: # 피해를 입었다면
            bandage_time = time - prev_time - 1 # 붕대 감기 기술의 시전 시간
            if bandage_time >= bandage[0]:
                cur_health += bandage_time * bandage[1] + (bandage_time // bandage[0]) * bandage[2]
            else:
                cur_health += bandage_time * bandage[1]
            
            cur_health = min(health, cur_health)
                
        cur_health -= damage
        if cur_health <= 0:
            return -1
        
        prev_time = time
        
    return cur_health