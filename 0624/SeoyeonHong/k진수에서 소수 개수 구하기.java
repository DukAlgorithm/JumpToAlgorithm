class Solution {
    public boolean isPrimeNumber(Double num){
        if(num == 1) return false;
        for(int i = 2; i < (int)Math.sqrt(num) + 1; i++){
            if(num % i == 0) return false;
        }
        return true;
    }

    public int solution(int n, int k) {
        int answer = 0;
        String converted = "";
        
        while(n > 0){
            converted = Integer.toString(n % k) + converted;
            n = (int)(n / k);
        }
        
        String[] numbers = converted.split("0");

        for(String number: numbers){
            if(number.length() > 0 && isPrimeNumber((Double.parseDouble(number)))) answer += 1;
        }

        return answer;
    }
}