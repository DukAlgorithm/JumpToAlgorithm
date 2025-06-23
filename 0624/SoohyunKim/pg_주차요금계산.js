// https://school.programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
    let iMap = new Map();
    let tMap = new Map();
    
    for(let record of records) {
        const [time, car, type] = record.split(" ");
        
        if(type === "IN") {
            iMap.set(car, time);
        } else {
            const inTime = iMap.get(car);
            const used = calcTime(inTime, time);
            const prev = tMap.get(car) || 0;
            tMap.set(car, prev + used);
            iMap.delete(car);
        }
    }
    
    for (const [car, inTime] of iMap) {
        const used = calcTime(inTime, "23:59");
        const prev = tMap.get(car) || 0;
        tMap.set(car, prev + used);
    }
    
    const answer = [...tMap.keys()]
            .sort().map(car => calcFee(tMap.get(car), fees));
    
    return answer;
}

function calcTime(inT, outT) {
    const [ih, im] = inT.split(":").map(Number);
    const [oh, om] = outT.split(":").map(Number);
    
    return (oh * 60 + om) - (ih * 60 + im);
}

function calcFee(time, fees) {
    const [bt, bf, et, ef] = fees;

    if (time <= bt) return bf;

    const extra = time - bt;
    return bf + Math.ceil(extra / et) * ef;
}
