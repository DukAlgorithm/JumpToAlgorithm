func solution(players []string, callings []string) []string {
	nameRank := make(map[string]int)
	rankName := make(map[int]string)
	for rank, name := range players {
		nameRank[name], rankName[rank] = rank, name
	}

	for _, winnerName := range callings {
		currentRank := nameRank[winnerName]
		loserName := rankName[currentRank-1]

		nameRank[winnerName]--
		nameRank[loserName] = currentRank

		rankName[currentRank] = loserName
		rankName[currentRank-1] = winnerName
	}

	result := make([]string, len(players))
	for i := 0; i < len(players); i++ {
		result[i] = rankName[i]
	}

	return result
}