var TimeSlider = chroniton()
    .domain([new Date('1/1/1975'), new Date('1/1/2015')])
    .width(500)
    .labelFormat(d3.time.format('%Y'))
    .on('change', function (d) {
        var yearNameFormat = d3.time.format("%Y");
        //yearOutput.text(yearNameFormat(d));

        console.log("date: " + yearNameFormat(d));
        d3.json("/data/heroes.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].year == yearNameFormat(d)) {
                    console.log(data[i]);
                }
            }
            console.log(data);
            //console.log(data[0]);
        });

    })

export {
    TimeSlider
}
