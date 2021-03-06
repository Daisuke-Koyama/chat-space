$(function() {
  function buildHTML(message){
    var message_html = ""
    var message_imageUrl = ""
    if (message.text) {
      message_html += message.text
    }
    if (message.image) {
      message_imageUrl += "<br><img src=" + message.image + ">"
    }
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__data">
                      ${message.time}
                    </p>
                  </div>
                  <div class="lower-message">
                  </div>
                    <p class="lower-message__data">
                      ${message_html}
                    </p>
                    ${message_imageUrl}
                </div>`
    return html;
  }

 $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: $('#message_body').attr('action'),
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false

    })
    .done(function(data){
      if (data.text != null || data.image != null) {

        var html = buildHTML(data);
        $('.messages').append(html)
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});

      }

    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $('.message-form__button').prop('disabled', false)
    })
  })

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var id = $('.message').last().data('messageId');
      $.ajax({
        url: $('#message_body').attr('action'),
        type: "get",
        dataType: 'json',
        data: {id: id}
      })
      .done(function(data){
        var html = '';
        data.messages.forEach(function(message) {
          if (message.id > id) {
            html += buildHTML(message)
          }
        })
        $('.messages').append(html)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('error');
      })
      .always(function() {
        $('.message-form__button').prop('disabled', false)
      })
    } else {
      clearInterval(interval);
    }
  } ,5000 )
});
