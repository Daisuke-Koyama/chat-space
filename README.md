# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, index: true|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users through: :members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|text|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
