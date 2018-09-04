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

  private
  def project_params
    params.require(:project).permit(
      :id, :title, :revenue, :valuation, :video,
      :file, :icon, :description, :creator_id, :created_at,
      :city, :country, :continent
    )
  end
end
