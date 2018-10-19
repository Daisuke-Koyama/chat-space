class Group < ApplicationRecord
  has_many :messages
  has_many :members
  hasmany :users, through: :members
  validate :name, presence: true
end
