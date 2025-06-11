# https://school.programmers.co.kr/learn/courses/30/lessons/150370?language=python3
# 파기해야 할 개인정보 번호(오름차순)
def date_num(date):
    year, month, day = list(map(int, date.split('.')))
    num = year * 12 * 28 + month * 28 + day
    return num
    
def solution(today, terms, privacies):
    answer = []
    today_num = date_num(today)
    type_num = {}
    for term in terms:
        term_type, month = term.split()
        type_num[term_type] = int(month) * 28
    
    
    for i in range(len(privacies)):
        privacy = privacies[i]
        date, term_type = privacy.split()
        term_num = date_num(date)
        if today_num - term_num >= type_num[term_type]:
            answer.append(i+1)
            
    return answer