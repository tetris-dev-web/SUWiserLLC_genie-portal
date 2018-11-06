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
    @deployed_project_revenue = Project.where('current_capital >= capital_required').sum(:current_capital)
    if @deployed_project_revenue
      render json: @deployed_project_revenue
    else
      nil
    end
  end

  private
  def project_params
    params.require(:project).permit(
      :id, :title, :cashflow, :revenue, :valuation, :model_id,
      :file, :icon, :description, :creator_id, :created_at,
      :city, :country, :continent, :status, :latitude, :longitude, :summary
    )
  end
end
