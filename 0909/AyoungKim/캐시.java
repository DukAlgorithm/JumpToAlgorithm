import java.util.*;

class Solution {
    public int solution(int cacheSize, String[] cities) {
        int answer = 0;
        LinkedList<String> order = new LinkedList<>();
        Map<String, Boolean> cache = new HashMap<>();

        if (cacheSize == 0) {
            return cities.length * 5;
        }

        // 캐시에 도시이름과 일치하는 게 있는지 확인
        for (String city : cities) {ㅑ
                city = city.toLowerCase();
            //      있다면 answer++
            if (cache.containsKey(city)) {
                answer++;
                order.remove(city);
                order.addFirst(city);
            }
            //      없다면
            else {
                //          cacheSize를 넘지않았으면 넣음
                if (cache.size() < cacheSize) {
                    answer += 5;
                    order.addFirst(city);
                    cache.put(city, true);
                }
                //          넘었으면 가장 오래 사용 안 된 도시를 빼고 넣음
                else {
                    answer += 5;
                    String name = order.removeLast();
                    order.addFirst(city);
                    cache.remove(name);
                    cache.put(city, true);
                }
            }
        }

        return answer;
    }
}