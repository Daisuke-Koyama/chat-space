# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|nickname|string|null: false|
|email|text|null: false, unique: true|

### Association
- has_many :groups

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: ture|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false
|image|text|
|user_id|integer|null: false|
|group_id|integer|null: false|

### Associationテーブル
- has_many :users
