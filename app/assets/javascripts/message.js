$(function(){

  function buildHTML(message){
    message_html = ""
    if (message.text) {
      message_html = message_html + message.text
    }
    if (message.image.url) {
      message_html = message_html + "<br><img src=" + message.image.url + ">"
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
                    <p class="lower-message__data">
                      ${message_html}
                    </p>
                  </div>
                </div>`
    return html;
  }

  $('.message-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: './messages',
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
      $('.message-form__button').prop('disabled', false)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1500,'swing');
    })
    .fail(function(){
      alert('error');
      $('.message-form__button').prop('disabled', false)
    })
  })
});
