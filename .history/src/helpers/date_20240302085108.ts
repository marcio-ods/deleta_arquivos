export const addDays = (v: number, dt = new Date(Date.now())): number => {
    if (v < 31)
        dt.setDate(v)
    else
        addDays(v - 30, dt)
    return dt.getTime()
}

export const daysElapsed = (v: number) => {

    return 0

    // let vl = 62
    // addDays(60)
    // do {
    //     if (vl < 32)
    //         break
    //     const t = vl / 12
    //     if (vl < 32)


    // } while (vl < 31);




    // const d = Date.now()
    // const dt = new Date(Date.now())
    // console.log(dt.getDate());

    // dt.setDate(2)
    // console.log(dt.getUTCDate());
    // let startdate = "20.03.2014";
    // // var new_date = moment(startdate, "DD-MM-YYYY").add('days', 5);
    // var new_date = moment(startdate, "DD-MM-YYYY").add(moment.duration(""))

    // const a = moment(Date.now()).add("days", "30")
    // console.log(a.date);

    // let dt = new Date();
    // dt.
    // return (BigInt(v) * BigInt(DAY)) + BigInt(Date.now());
}