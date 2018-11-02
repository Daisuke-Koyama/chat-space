$(function() {

var user_list = $('#user-search-result');

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${ user.name }</p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${ user.id } data-user-name= ${ user.name }>追加</a>
             </div>`
  user_list.append(html);
}

function buildInputHTML(id, name) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${ id }'>
                <p class='chat-group-user__name'>${ name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  return html;
}

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0 ) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name');
    var html = buildInputHTML(userId, userName);
    $('#chat-group-users').append(html)
    $(this).parent().remove()
  });

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove()
  });
});
