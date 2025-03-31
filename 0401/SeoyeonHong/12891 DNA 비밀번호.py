from collections import Counter

S, P = map(int, input().split())

dna_string = input().rstrip()
a, c, g, t = map(int, input().split())
answer = 0

count = {'A': 0, 'G': 0, 'C': 0, 'T': 0}
for s in dna_string[:P]:
    count[s] += 1

if count['A'] >= a and count['C'] >= c and count['G'] >= g and count['T'] >= t:
    answer += 1

for i in range(1, S-P+1):
    count[dna_string[i+P-1]] += 1
    count[dna_string[i-1]] -= 1
    if count['A'] >= a and count['C'] >= c and count['G'] >= g and count['T'] >= t:
        answer += 1

print(answer)