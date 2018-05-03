json.extract! project,  :id,
                        :title,
                        :cost,
                        :valuation,
                        :video,
                        :icon,
                        :description,
                        :creator_id,
                        :creator,
                        :created_at

json.file asset_path(project.file.url)
