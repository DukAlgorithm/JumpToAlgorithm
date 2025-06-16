# 1. 이모티콘 플러스 서비스 가입자를 최대한 늘리는 것.
# 2. 이모티콘 판매액을 최대한 늘리는 것.
def solution(users, emoticons):
    records = []
    N = len(emoticons)

    def calculate_result(discount_rates):
        service_user, total_sales = 0, 0
        costs = [emoticons[i] * (100 - discount_rates[i]) // 100 for i in range(N)] # 할인된 이모티콘의 가격들
        for standard_rate, standard_cost in users: # 각 사용자에 대해
            buy = [] # 구입 목록
            for i in range(N):
                if discount_rates[i] >= standard_rate: # 할인을 기준 비율보다 많이 할 경우
                        buy.append(costs[i]) # 구매
            
            if sum(buy) >= standard_cost: # 기준 금액 이상이면 
                    service_user += 1 # 서비스 가입
            else: # 기준 금액 미만이면
                    total_sales += sum(buy) # 총 판매 금액 증가

        return [service_user, total_sales]
        
    
    def set_discount_rates(discount_rates):
        if len(discount_rates) == N:
            records.append(calculate_result(discount_rates))
        else:
            for rate in [10, 20, 30, 40]:
                set_discount_rates(discount_rates + [rate])
                     
    set_discount_rates([])

    records.sort(key=lambda x: (-x[0], -x[1])) # 서비스 가입자, 판매액 기준으로 정렬

    return records[0]