class Api::ProjectsController < ApplicationController
  # (devise authentication?) before_action :require_login, only: [:create, :update, :destroy]

  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
  end

  def create
    debugger
    puts ENV['INFURA_API_KEY']
    @project = Project.new(project_params)
    if @project.save
      render json: @project
    else
      puts @project.errors.full_messages
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
    @accuCashflows = Project.all.map do |project|
      JSON.parse(project.cashflow)["Actual"].values.reduce(:+) if project.cashflow
    end
    render json: @accuCashflows.compact.reduce(:+)
    # nadir of cashflows
    # @cashProject = Project.where(status: "deployed")[0]
    # render json: JSON.parse(@cashProject.cashflow)["ExpectedAccumulatedGainorLoss"].values.min
  end

  def discount_factor
    capital_deployed = JSON.parse(Project.first.cashflow).values.reduce(:+)
    discount_factor = 50 - ((capital_deployed / 190000.0) + (Project.where('close_date < ?', Time.current).count) * 6)
    render json: discount_factor > 10 ? discount_factor : 10
  end

  def failed_projects_count
    render json: Project.where('close_date < ?', Time.current).count
  end


  private
  def project_params
    params.require(:project).permit(
      :id, :address, :title, :cashflow, :revenue, :valuation, :model_id,
      :file, :icon, :description, :creator_id, :created_at,
      :city, :country, :continent, :status, :latitude, :longitude, :summary,
      :actual_cashflow, :accum_projected_cashflow, :accum_actual_cashflow,
      :projected_cashflow, :planFilePDFDataURL, :capital_required,
      :pdf_file
    )
  end
end
