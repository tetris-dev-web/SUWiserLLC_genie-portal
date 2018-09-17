json.extract! project,  :id,
                        :title,
                        :revenue,
                        :valuation,
                        :video,
                        :city,
                        :country,
                        :continent,
                        :icon,
                        :description,
                        :creator_id,
                        :creator,
                        :created_at,
                        :status

json.file asset_path(project.file.url)
