var TimeSlider =  chroniton()
      //.domain([new Date(+new Date() - 60 * 1000), new Date()])
      .keybindings(true)
      .width(500)
      .playButton(true);

export { TimeSlider }

/*d3.select(document.body).append('h3').text('Custom Label Format');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .labelFormat(d3.time.format('%b %e'))
        .width(500));

d3.select(document.body).append('h3').text('Specifying the date Domain');
d3.select(document.body)
    .append('div')
    .call(
      chroniton()
        .domain([new Date(+new Date() - 60 * 1000), new Date()])
        .labelFormat(d3.time.format('%X'))
        .width(500));
        */