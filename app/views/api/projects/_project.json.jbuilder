json.extract! project,  :id,
                        :title,
                        :revenue,
                        :valuation,
                        :cashflow,
                        :model_link,
                        :city,
                        :country,
                        :continent,
                        :icon,
                        :description,
                        :creator_id,
                        :creator,
                        :created_at,
                        :status,
                        :sketch_link,
                        :bus_plan_link,
                        :start_date,
                        :latitude,
                        :longitude,
                        :summary,
                        :capital_required,
                        :current_capital

json.file asset_path(project.file.url)
