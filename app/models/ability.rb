class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:

    # TODO Once we add the Projects table to DB, uncomment everything
    # below from line 24 to 30.  Then add to the top of ProjectsController:
    # load_and_authorize_resource

    # The above line loads the resource into an instance var, and
    # authorize it before an action

    # In our Projects controller we must set on Create method:
    # @project.user_id = current_user.id

    # This will ensure proper authorization such that users who did
    # not make a project cannot alter/edit it

    # These changes must also be reflected on the frontend, so that
    # an unauthorized user doesn't have access to an edit project button,
    # for example.

      # user ||= User.new # guest user (not logged in)
      # if user.admin?
      #   can :manage, :all
      # else
      #   can :manage, Project, user_id: user.id
      #   can :read, :all
      # end

    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
