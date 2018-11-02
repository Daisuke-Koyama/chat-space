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
    var html = `<div class="message">
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
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.message-form__message-content').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function() {
      $('.message-form__button').prop('disabled', false)
    })
  })
});
