# https://school.programmers.co.kr/learn/courses/30/lessons/17680
import heapq

def solution(cacheSize, cities):
    answer = 0
    cacheCity = dict([])
    cacheTime = dict([])
    cities = [city.lower() for city in cities]
    
    if cacheSize == 0:
        answer = len(cities) * 5
    else:
        for i in range(len(cities)):
            city = cities[i]
            if city in cacheCity: # cache hit일 경우
                answer += 1
                
                # 캐시 갱신
                del cacheTime[cacheCity[city]]
                cacheTime[i] = city
                cacheCity.update({city: i})

            else: # cache miss일 경우
                if len(cacheTime) == cacheSize:
                    # 가장 오래된 도시 캐시 삭제
                    leastRecentTime = min(cacheTime.keys())
                    leastRecentCity = cacheTime[leastRecentTime]
                    del cacheTime[leastRecentTime]
                    del cacheCity[leastRecentCity]

                # 캐시 추가
                cacheCity[city] = i
                cacheTime[i] = city
                answer += 5
    return answer