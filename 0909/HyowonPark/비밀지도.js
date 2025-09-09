
// 1 0 / 0 1 / 1 1 은 1
// 0 0 만 0 

function solution(n, arr1, arr2) {
    result = [];
    for (i = 0; i < n; i++) {
        row = [];
        a = arr1[i].toString(2).padStart(n, '0').split('');
        b = arr2[i].toString(2).padStart(n, '0').split('');
        
        for (j = 0; j < n; j++) {
            if (a[j] == '0'&& b[j] == '0') {
                row.push(" ");
            } else {
                row.push("#")
            }
        }

        result.push(row.join(''));
    }
    
    
    return result;
}