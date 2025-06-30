// https://school.programmers.co.kr/learn/courses/30/lessons/72410?language=java

class Solution {
    public String solution(String new_id) {
        String answer = "";
        new_id = new_id.toLowerCase();
        for(int i = 0; i < new_id.length(); i++){
            char c = new_id.charAt(i);
            if(Character.isAlphabetic(c) || Character.isDigit(c) || c == '-' || c == '_'){         
                answer += c; 
            } 
            else if(c == '.'){
                if(!answer.isEmpty() && answer.charAt(answer.length()-1) != '.' ){
                    answer += c;
                }
            }
        }

        if(answer.length() > 0 && answer.endsWith(".")){
            answer = answer.substring(0, answer.length()-1);
        }
        
        if(answer.isEmpty()){
            answer = "a";
        }
        if(answer.length() >= 16){
            answer = answer.substring(0, 15);
            if(answer.endsWith(".")){
                answer = answer.substring(0, answer.length()-1);
            }
        }
        if(answer.length() <= 2){
            while(answer.length() < 3){
                answer += answer.charAt(answer.length()-1);
            }
        }
        return answer;
    }
}