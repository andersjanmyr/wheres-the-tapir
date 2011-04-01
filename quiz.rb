class Quiz
  @quiz_id = 0 # This is a class instance variable
  @quizzes = {}
  attr_reader :quiz_id


  def initialize
    @quiz_id = self.class.new_id
    @correct_door = rand(3) + 1
    self.class.quizzes[@quiz_id] = self
  end

  def remove_door answer
    @answer_one = answer.to_i
    doors = [1,2,3]
    doors.delete(@answer_one)
    doors.delete(@correct_door)
    @removed_door = doors[rand(doors.length + 1) - 1]
    @removed_door
  end

  def choose choice
    @choice = choice
    Stats.update(@choice, correct?)
  end

  def correct?
    (@choice == 'stick') == (@answer_one == @correct_door)
  end

  def status
    p self
    {
      :correct_door => @correct_door,
      :is_correct => correct?,
      :choice => @choice
    }
  end

  def self.quizzes
    @quizzes
  end

  def self.new_id
    @quiz_id += 1
  end

  def self.to_s
    quizzes.to_s
  end
end

class Stats
  @stick_count = 0
  @stick_correct_count = 0
  @switch_count = 0
  @switch_correct_count = 0

  def self.update(choice, correct)
    if choice  == 'stick'
      @stick_count += 1
      @stick_correct_count += 1 if correct
    else
      @switch_count += 1
      @switch_correct_count += 1 if correct
    end
  end

  def self.get(hash={})
    hash[:stick] = [@stick_correct_count, @stick_count]
    hash[:switch] = [@switch_correct_count, @switch_count]
    hash
  end

end
