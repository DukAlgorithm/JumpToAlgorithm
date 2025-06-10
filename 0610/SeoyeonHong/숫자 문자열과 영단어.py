# https://school.programmers.co.kr/learn/courses/30/lessons/81301
def solution(string):
    number = {"zero": "0", "one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"}
    result = ""
    word = ""
    for s in string:            
        if s.isdigit():
            result += s
        else:
            word += s
            if word in number.keys():
                result += number[word]
                word = ""
            
    return int(result)