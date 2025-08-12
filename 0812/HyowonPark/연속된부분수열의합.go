func solution(sequence []int, k int) []int {
	start, end := 0, 0
	currentSum := sequence[0]
	available := make([][2]int, 0) // 가능한 경우 (이 중에 가장 길이가 짧고, 시작 인덱스가 작은 걸 택)

	// 애벌레 알고리즘.. (k보다 크면 애벌레 길이짧게, k보다 작으면 애벌레 길이 늘려)
	for end <= len(sequence)-1 {
		if currentSum == k {
			available = append(available, [2]int{start, end})
		}

		if currentSum > k && start < len(sequence) {
			if start <= end {
				currentSum -= sequence[start]
				start++
			} else {
				break
			}
		} else {
			// 목표값보다 작으면 애벌레 길게
			end++
			if end >= len(sequence) {
				break
			} else {
				currentSum += sequence[end]
			}
		}
	}

	//가장 길이가 짧고, 시작 인덱스가 작은 걸 택)
	minLength := len(sequence)
	minStartIdx := len(sequence) - 1
	endIdx := -1
	for _, v := range available {
		if v[1]-v[0] < minLength {
			minLength = v[1] - v[0]
			minStartIdx, endIdx = v[0], v[1]
		} else if v[1]-v[0] == minLength && minStartIdx > v[0] {
			minLength = v[1] - v[0]
			minStartIdx, endIdx = v[0], v[1]
		}
	}

	return []int{minStartIdx, endIdx}
}