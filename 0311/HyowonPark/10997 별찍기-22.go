package main

import (
	"fmt"
)

// n 은 1~100 (중심 기준 별이 안찍히는 별의 상대적 위치 구하기)
// 여기서 절대적 위치 중심점(아까 구한 centerX, centerY) == 상대적 위치의 최고행/열
func emptyPoints(n, centerX, centerY int) [][]int {

	if n == 2 {
		// 중심점 기준 상대적인 위치 구하기
		// 2일땐 (-3, -1) ~ (3, 1) 까지 있음
		// 별이 안 찍힌 곳 리턴
		return [][]int{{0, 1}, {0, -1}, {-1, 1}, {-1, -1}, {-2, -1}, {-2, 0}, {-2, 1}, {1, -1}, {2, -1}, {2, 0}, {2, 1}, {2, 2}}

	} else {
		// n-1의 빈 위치
		prev := emptyPoints(n-1, centerX-2, centerY-2)

		var results [][]int
		// 안 찍힌 곳이 추가되는 방식:
		// - 기존에 젤 윗 행의 위행에서 맨 왼쪽 열 빼고 다 안찍힘
		// 기존에서 최고 행은 +3 최고 열은 +2
		for i := -centerY + 1; i < centerY; i++ {
			results = append(results, []int{-centerX + 1, i})
		}

		// - 기존 젤 왼쪽열의 바로 왼쪽 열에서 맨 윗행 아랫행 빼고 다 안찍힘
		for i := -centerX + 1; i < centerX; i++ {
			results = append(results, []int{i, centerY - 1})
		}

		// - 기존 맨 밑행의 아래 행에서 한칸 내려간 행과 양쪽에 열 하나씩 더한만큼 안 찍힘
		for i := -centerY - 1; i < centerY+1; i++ {
			results = append(results, []int{centerX - 1, i})
		}

		// - 기존 젤 오른쪽열의 바로 오른쪽 열에서 맨 윗행 아랫행 빼고 다 안찍힘
		for i := -centerX; i <= centerX; i++ {
			results = append(results, []int{i, centerY + 1})
		}

		results = append(results, prev...)

		return results
	}

}

func main() {
	var n int
	fmt.Scanf("%d", &n)

	if n == 1 {
		fmt.Printf("*")
		return
	} else {

		height := 7 + 4*(n-2)
		width := height - 2

		// 2차원 배열 생성
		arr := make([][]byte, height)
		for i := range arr {
			arr[i] = make([]byte, width)
			for j := range arr[i] {
				arr[i][j] = '*'
			}
		}

		centerX := n*2 - 1
		centerY := n*2 - 2

		// 별이 안 찍히는 위치 계산
		noStars := emptyPoints(n, centerX, centerY)

		emptyMap := make(map[string]bool)
		for _, point := range noStars {
			key := fmt.Sprintf("%d,%d", point[0], point[1])
			emptyMap[key] = true
		}
		// 별 패턴 채우기
		for i := 0; i < height; i++ {
			for j := 0; j < width; j++ {
				relX := i - centerX
				relY := j - centerY

				key := fmt.Sprintf("%d,%d", relX, relY)
				if emptyMap[key] {
					arr[i][j] = ' '
				}
			}
		}

		// 출력
		for i := 0; i < height; i++ {
			if n > 1 && i == 1 {
				// 두 번째 줄은 첫 번째 열만 출력
				fmt.Printf("*\n")
			} else {
				fmt.Println(string(arr[i]))
			}
		}

	}

}

/*
1은 그냥 * 찍고

2의 별 의 위치를 ? 상대적 위치?? 센터를 중심으로.. 구하고 !
3은 거기다가 추가
4도 3에다가 추가


일단 2는 7X5 행렬   중심점 (3,2)
3은 11 X 9 행렬 (7+4   5+4) 중ㅇ심점 (5, 4)
4는 중심점 7,6
다 홀수고 중심이 있음!
행렬 수랑 중심점을 N을 보고 구해 일단!
그리고 그거ㅏㄹ로 2채원 배열을 만들어놔


일단 수도 코드로 작성해보쟈

func 어떤 함수() {

입력받은 n
2차원 행렬은
  행: 7 + 4 x (n-2)
  열: 행 - 2
  [7 + 4 x (n-2)][5 + 4 x (n-2)]int

  중심점은 n X 2 - 1 , n X 2 - 2
}

*/
