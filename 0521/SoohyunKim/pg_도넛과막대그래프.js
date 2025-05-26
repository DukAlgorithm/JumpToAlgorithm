// https://school.programmers.co.kr/learn/courses/30/lessons/258711

function solution(edges) {    
    const graphInfo = {}

    edges.forEach(([send, receive]) => {
        graphInfo[send] ||= { sendCnt:0, receiveCnt:0 }
        graphInfo[receive] ||= { sendCnt:0, receiveCnt:0 }

        graphInfo[send].sendCnt++
        graphInfo[receive].receiveCnt++
    })

    let newNode = 0;
    let allNodesCnt = 0
    let g0 = 0 
    let g1 = 0 
    let g8 = 0

    for (let n in graphInfo){
        const { sendCnt, receiveCnt } = graphInfo[n]
        if(sendCnt >= 2 && receiveCnt === 0){
            newNode = +n
            allNodesCnt = sendCnt
        }
        if(sendCnt == 0) g1++
        if(sendCnt >= 2 && receiveCnt >= 2) g8++
    }

    g0 = allNodesCnt - g8 - g1

    return [newNode, g0, g1, g8];
}
