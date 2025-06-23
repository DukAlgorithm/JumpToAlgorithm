function solution(fees, records) {
    const carTotalTimes = new Map();
    const carIn = new Map();
    const BASE_DATE = new Date();
    for (const [time, car, inOut] of records.map(e => e.split(' '))) {
        if (inOut === 'IN') {
            carIn.set(car, time);
        } else {
            if (carIn.has(car)) {
                const IN = new Date(BASE_DATE);
                IN.setHours(...carIn.get(car).split(':'));
                const OUT = new Date(BASE_DATE);
                OUT.setHours(...time.split(':'));
                const minutes = (OUT.getTime() - IN.getTime()) / 60000;
                if (carTotalTimes.has(car)) {
                    carTotalTimes.set(car, carTotalTimes.get(car) + minutes);
                } else {
                    carTotalTimes.set(car, minutes);
                }
                
                carIn.delete(car); // 출차한 차량 삭제!
            }
        }
    }

    // 출차 안 찍힌 차들 23:59로 처리
    for (const [car, time] of carIn.entries()) {
        const IN =  new Date(BASE_DATE);
        IN.setHours(...time.split(':'));
        const OUT = new Date(BASE_DATE);
        OUT.setHours(23, 59);
        const minutes = (OUT.getTime() - IN.getTime()) / 60000;
        if (carTotalTimes.has(car)) {
            carTotalTimes.set(car, carTotalTimes.get(car) + minutes);
        } else {
            carTotalTimes.set(car, minutes);
        }
    }


    return [...carTotalTimes.keys()].sort().map(e => carTotalTimes.get(e) <= fees[0] ? fees[1] : fees[1] 
    + Math.ceil((carTotalTimes.get(e) - fees[0]) / fees[2]) * fees[3]
    );
}


const r = solution([180, 5000, 10, 600]	, ["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]);
console.log(r);