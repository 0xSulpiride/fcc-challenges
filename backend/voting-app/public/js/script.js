$('.vote').click(() => {
  var option = ($('.active').children()[0].id === 'option1' ? '0' : '1');
  console.log("check");
  $.post(window.location.pathname, {'vote': option}).done((data) => {
    console.log("Data", data);
    var body = '<h1>It\'s Done!</h1>' +
                '<h4>Want to see the results?</h4>' +
                '<a href="' + window.location.pathname + '/results" class="btn btn-primary" style="width: 250px;">Yes!</a>';
    $('.col-md-4')[1].innerHTML = body;
  });
});