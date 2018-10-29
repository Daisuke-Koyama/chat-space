json.text       @message.body
json.image      @message.image
json.user_name  @message.user.name
json.time       @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
json.group_id   @message.group_id
