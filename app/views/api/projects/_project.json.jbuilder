json.extract! project,  :id,
                        :title,
                        :cashflow, 
                        :city,
                        :country,
                        :continent,
                        :icon,
                        :description,
                        :creator_id,
                        :created_at,
                        :sketch_link,
                        :bus_plan_link,
                        :start_date,
                        :summary,
                        :actual_cashflow,
                        :accum_actual_cashflow,
                        :projected_cashflow,
                        :accum_projected_cashflow
if project.pdf_file.attached?
    json.pdfUrl url_for(project.pdf_file)
end
# json.file asset_path(project.file.url)
