class Api::ProjectsController < ApplicationController
  # (devise authentication?) before_action :require_login, only: [:create, :update, :destroy]

  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def deployed_project_revenue
    # @deployed_projects = Project.where('current_capital >= capital_required')
    # @deployed_projects_cashflow = @deployed_projects.map{|project| p JSON.parse(project.cashflow)["ExpectedNet"].values.reduce(:+)}.reduce(:+)
    #
    # @deployed_project_revenue = @deployed_projects.sum(:current_capital)
    # if @deployed_project_revenue
    #   render json: @deployed_project_revenue + @deployed_projects_cashflow
    # else
    #   nil
    # end
    @accuCashflows = Project.all.map do |project|
      JSON.parse(project.cashflow)["Actual"].values.reduce(:+) if project.cashflow
    end

    @cashProject = Project.where(title: "HamInn")[0]
    render json: JSON.parse(@cashProject.cashflow)["ExpectedAccumulatedGainorLoss"].values.min
    # render json: @accuCashflows.compact.reduce(:+)
  end

# AccuCashflows = {}
# for (i in range()):
#   quaterlyCashflow = Project.Table.cashflow[i]
#   quaterlyCashflowAccumulated = AccuCashflows[i-1] + quaterlyCashflow
#   AccuCashflows.push(quaterlyCashflowAccumulated)



  private
  def project_params
    params.require(:project).permit(
      :id, :title, :cashflow, :revenue, :valuation, :model_id,
      :file, :icon, :description, :creator_id, :created_at,
      :city, :country, :continent, :status, :latitude, :longitude, :summary
    )
  end
end
