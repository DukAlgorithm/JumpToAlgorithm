import java.util.*;

class Solution {
    // 총 n회 t분 간격, 최대 수용 m명
    public String solution(int n, int t, int m, String[] timetable) {
        // 우선 timetable 오름차순 정렬(먼저 온 사람부터 태워야함)
        List<Integer> crewTimes = new ArrayList<>();
        for (String time : timetable) {
            // "09:00" -> 540분
            String[] split = time.split(":");
            int minutes = Integer.parseInt(split[0]) * 60 + Integer.parseInt(split[1]);
            crewTimes.add(minutes);
        }
        Collections.sort(crewTimes);
        
        // 첫 셔틀: 9:00(540분), 마지막 셔틀 9:00 + (n-1) * t
        int lastBus = 540 + (n - 1) * t;
        
        int crewIdx = 0;
        
        for (int busNum = 0; busNum < n; busNum++) {
            int busTime = 540 + busNum * t;  // 현재 셔틀 도착 시간
            int onBus = 0;  // 이번 셔틀에 탄 사람 수
            
            // busTime 이하에 도착한 크루 중에서 m명까지 태워
            int lastCrewIdx = -1;  // 마지막에 탄 크루 인덱스
            
            while (crewIdx < crewTimes.size() && 
                   crewTimes.get(crewIdx) <= busTime && 
                   onBus < m) {
                lastCrewIdx = crewIdx;
                crewIdx++;
                onBus++;
            }
            
            // 마지막 셔틀
            if (busNum == n - 1) {
                if (onBus < m) {
                    // 자리 남으면 셔틀 시간 리턴
                    return minutesToTime(busTime);
                } else {
                    // 자리 부족하면 마지막 크루보다 1분 빠른시각
                    return minutesToTime(crewTimes.get(lastCrewIdx) - 1);
                }
            }
        }
        
        return "";
    }
    
    // 분 -> "HH:MM"
    private String minutesToTime(int minutes) {
        return String.format("%02d:%02d", minutes / 60, minutes % 60);
    }
}