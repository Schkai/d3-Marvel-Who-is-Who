var TimeSlider =  chroniton()
        .domain([new Date('1/1/1975'), new Date('1/1/2015')])
        .width(500)
        .labelFormat(d3.time.format('%Y'))
        .on('change', function(d) {
          var yearNameFormat = d3.time.format("%Y"); 
          //yearOutput.text(yearNameFormat(d));
        })

export { TimeSlider }
